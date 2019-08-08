import React from 'react'
// import './index.scss'
import NavHeader from '../../common/NavHeader'
import styles from './index.module.scss'
// console.log(styles)
import { getCurrentCity } from '../../utils'
import Axios from 'axios'
const BMap = window.BMap
// 在react中，如果想要直接访问全局变量，需要通过window
class Map extends React.Component {
  state = {
    citys: [],
    map: ''
  }
  async componentDidMount() {
    // 获取当前的城市
    const res = await getCurrentCity()
    const { label, value } = res
    // 地址解析器获取经纬度
    const map = new BMap.Map('container')
    const myGeo = new BMap.Geocoder()
    // 将地址解析结果显示到地图上 调整视野
    myGeo.getPoint(
      label,
      point => {
        if (point) {
          map.centerAndZoom(point, 11)
          // 这是添加标注的  添加文字标签
          var opts = {
            position: point, // 指定文本标注所在的地理位置
            offset: new BMap.Size(30, -30) //设置文本偏移量
          }
          // 导入对应的样式
          var label = new BMap.Label(
            `<div class=${styles.bubble}>
            <p class=${styles.name}>普通新区</p>
            <p>388套</p>
          </div>`,
            opts
          )
          // 给文本覆盖物注册事件
          label.addEventListener('click', function(params) {
            console.log(1)
          })

          // 创建文本标注对象
          // 修改样式
          label.setStyle({
            fontSize: '12px',
            height: '20px',
            lineHeight: '20px',
            fontFamily: '微软雅黑',
            border: '0px solid transparent',
            backgroundColor: 'transparent'
          })
          map.addOverlay(label)
          // console.log(this.state.citys)
          this.renderRooms()

          // 添加控件  里面参数是未定义?
          map.addControl(
            new BMap.NavigationControl({
              // type: BMAP_NAVIGATION_CONTROL_SMALL
            })
          )
          map.addControl(new BMap.ScaleControl())
          // map.addControl( new BMap.NavigationControl())
        }
      },
      label
    )
    // 发送ajax 获取所有的数据 进行渲染
    const resRoom = await Axios.get('http://localhost:8080/area/map', {
      params: {
        id: value
      }
    })
    const citys = resRoom.data.body
    console.log(citys)
    // 设置state中的数据
    this.setState({
      citys
    })
  }
  renderRooms = () => {
    console.log(this.state.citys)
  }
  //class NavHeader_navBar__3VUdG am-navbar am-navbar-light
  render() {
    return (
      <div className={styles.map}>
        <NavHeader backgroundColor="red">地图找房</NavHeader>
        {/* 保证这个div是全屏 */}
        <div id="container" className={styles.container} />
      </div>
    )
  }
}

export default Map
