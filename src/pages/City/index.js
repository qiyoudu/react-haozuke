import React from 'react'
// import ReactDOM from 'react-dom'
import { NavBar, Icon } from 'antd-mobile'
// 导入样式
import 'react-virtualized/styles.css'
// // 导入 list组件
import { List } from 'react-virtualized'
// import要写在最上面
import axios from 'axios'
import './index.scss'

// // 假数据
const list = Array.from(new Array(10000)).map(
  (item, index) => `${index}-假数据展示`
)
const rowRenderer = function({
  //fn(obj{return})?
  key, // 唯一的key值
  index, // 每一行的索引号
  isScrolling, // 是否在滚动中
  isVisible, // 是否可见
  style // 样式对象
}) {
  return (
    <div key={key} style={style} className="city">
      <div className="title">A</div>
      <div className="name">北京</div>
    </div>
  )
}
class City extends React.Component {
  state = {
    list: []
  }
  // rowRenderer = function({
  //   //fn(obj{return})?
  //   key, // 唯一的key值
  //   index, // 每一行的索引号
  //   isScrolling, // 是否在滚动中
  //   isVisible, // 是否可见
  //   style // 样式对象
  // }) {
  //   return (
  //     <div key={key} style={style}>
  //       {this.state.list[index]}
  //     </div>
  //   )
  // }

  async area() {
    const res = await axios.get('http://localhost:8080/area/city?level=1')
    // console.log(res)

    // 存储 城市列表
    const cityList = {}

    // 遍历list
    const { body } = res.data
    // console.log(list)
    const list = Array.from(body).map((item, index) => `${index}-假数据展示`)
    this.setState({
      list
    })
    body.forEach(e => {
      const key = e.short.slice(0, 1)
      // 不存在这个字母开头的属性名  创建一个新数组
      if (!cityList[key]) {
        cityList[key] = []
      }
      // 这个属性名的数组中 加上e
      cityList[key].push(e)
    })
    // console.log(cityList)
    // 按照 字母顺序排列
    const cityIndex = Object.keys(cityList).sort()
    console.log(cityIndex)

    // 添加热门城市的数据
    const hots = await axios.get('http://localhost:8080/area/hot')
    console.log(hots)
    // 封装 获取当前定位城市的功能
  }
  componentDidMount() {
    // 获取城市列表数据
    this.area()
  }
  render() {
    return (
      <div>
        {/* 导航组件 */}
        <NavBar
          mode="light"
          icon={<Icon type="left" />}
          onLeftClick={() => this.props.history.go(-1)}
        >
          NavBar
        </NavBar>
        <List
          width={300}
          height={300}
          rowCount={this.state.list.length}
          rowHeight={20}
          rowRenderer={rowRenderer}
        />
      </div>
    )
  }
}
// 暴露组件
export default City
