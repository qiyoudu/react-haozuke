import React from 'react'
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
    isShow: false,
    houses: []
  }
  async componentDidMount() {
    // 获取当前的城市 地图的创建
    this.initMap()
  }
  async initMap() {
    const res = await getCurrentCity()
    // console.log(res)

    const { label, value } = res
    // 将地址解析结果显示到地图上 调整视野
    // 地址解析器获取经纬度
    const map = new BMap.Map('container')
    // 把map挂载在this上
    this.map = map
    // 创建地址解析器实例
    const myGeo = new BMap.Geocoder()
    myGeo.getPoint(
      label,
      point => {
        if (!point) return
        console.log(point)

        map.centerAndZoom(point, 11)
        // 这是添加标注的  添加文字标签
        map.addControl(new BMap.NavigationControl())
        map.addControl(new BMap.ScaleControl())
        // 设置文本  渲染标识
        this.renderOverlays(value)
      },
      label
    )
  }
  async renderOverlays(id) {
    // 获取到城市id
    console.log(id)
    // 发送ajax 获取到该城市下的所有房源
    const res = await Axios.get(`http://localhost:8080/area/map?id=${id}`)
    // console.log(res)
    // 获取下一级渲染的方式 和 放大级别
    const { nextZoom, type } = this.getTypeAndZoom()
    const citys = res.data.body
    citys.forEach(e => {
      this.createOverlays(e, type, nextZoom)
    })
  }
  createOverlays(e, type, nextZoom) {
    // 需要判断渲染类型和 本次放大的级别
    if (type === 'circle') {
      this.createCircle(e, nextZoom)
    } else {
      this.createRect(e, nextZoom)
    }
  }
  // 创建圆形的覆盖物
  createCircle(e, nextZoom) {
    const point = new BMap.Point(e.coord.longitude, e.coord.latitude)
    var opts = {
      position: point,

      offset: new BMap.Size(-35, -35)
    }
    var label = new BMap.Label(
      `<div class="bubble">
        <p class="name">${e.label}</p>
        <p>${e.count}套</p>
      </div>`,
      opts
    )
    label.setStyle({
      cursor: 'pointer',
      border: '0px solid rgb(255, 0, 0)',
      padding: '0px',
      whiteSpace: 'nowrap',
      fontSize: '12px',
      color: 'rgb(255, 255, 255)',
      textAlign: 'center'
    })
    this.map.addOverlay(label)
    // 注册点击事件
    label.addEventListener('click', () => {
      console.log(e.value, nextZoom)
      // 继续渲染下级的内容
      this.renderOverlays(e.value)
      // 清空覆盖物  有报错bug  在延时器中清除 不影响功能 具体百度查询
      setTimeout(() => {
        this.map.clearOverlays()
      }, 0)
      // 把地图放到最中间 并且放大
      this.map.centerAndZoom(point, nextZoom)
    })
  }
  // 创建 方形覆盖物
  createRect(e, nextZoom) {
    const point = new BMap.Point(e.coord.longitude, e.coord.latitude)
    var opts = {
      position: point,

      offset: new BMap.Size(-35, -35)
    }
    var label = new BMap.Label(
      `<div class="rect">
      <span class="housename">${e.label}</span>
    <span class="housenum">${e.count}套</span>
    <i class="arrow"></i>
  </div>`,
      opts
    )
    label.setStyle({
      cursor: 'pointer',
      border: '0px solid rgb(255, 0, 0)',
      padding: '0px',
      whiteSpace: 'nowrap',
      fontSize: '12px',
      color: 'rgb(255, 255, 255)',
      textAlign: 'center'
    })
    this.map.addOverlay(label)
    // 注册点击事件
    label.addEventListener('click', () => {
      // 把地图放到最中间
      this.map.centerAndZoom(point, nextZoom)
      // 获取 房源列表 百度地图监听事件没有支持 async 把函数调出去
      this.getHouseList(e)
      // 显示对应的结构
    })
  }
  async getHouseList(e) {
    const res = await Axios.get(
      `http://localhost:8080/houses?cityId=${e.value}`
    )
    this.setState({
      isShow: true
      // houses: res.data.body.list
    })
  }
  // 该方法调用返回一个 对象 类型和放大级别
  getTypeAndZoom() {
    // baidu 获取当前放大的级别
    const zoom = this.map.getZoom()

    let nextZoom, type
    if (zoom === 11) {
      nextZoom = 13
      type = 'circle'
    } else if (zoom === 13) {
      nextZoom = 15
      type = 'circle'
    } else {
      nextZoom = 15
      type = 'rect'
    }
    return {
      nextZoom,
      type
    }
  }
  render() {
    return (
      <div className={styles.map}>
        <NavHeader backgroundColor="red">地图找房</NavHeader>
        {/* 保证这个div是全屏 */}
        <div id="container" />
        <div className={`houseList ${this.state.isShow ? 'show' : ''}`}>
          <div className="titleWrap">
            <h1 className="listTitle">sd</h1>
            <a className="titleMore" href="/house/list">
              更多房源
            </a>
          </div>
          <div className="houseItems">
            <div className="house">
              <div className="imgWrap">
                <img
                  className="img"
                  src="http://localhost:8080/newImg/7bi0l6e09.jpg"
                  alt=""
                />
              </div>
              <div className="content">
                <h3 className="title">
                  三期精装修两房，南北户型，房东诚意出租出门燎原双语
                </h3>
                <div className="desc">2室2厅1卫/82/南/阳光美景城</div>
                <div>
                  <span className="tag tag1">近地铁</span>
                </div>
                <div className="price">
                  <span className="priceNum">8500</span> 元/月
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Map
