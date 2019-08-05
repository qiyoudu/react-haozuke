import React from 'react'
// import ReactDOM from 'react-dom'
import { NavBar, Icon } from 'antd-mobile'
import axios from 'axios'
class City extends React.Component {
  async area() {
    const res = await axios.get('http://localhost:8080/area/city?level=1')
    // console.log(res)

    // 存储 城市列表
    const cityList = {}

    // 遍历list
    const { body: list } = res.data
    // console.log(list)

    list.forEach(e => {
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
      </div>
    )
  }
}
// 暴露组件
export default City
