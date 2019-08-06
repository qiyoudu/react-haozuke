import React from 'react'
// import ReactDOM from 'react-dom'
import { NavBar, Icon } from 'antd-mobile'
// 导入样式
import 'react-virtualized/styles.css'
// // 导入 list组件  AutiSizer组件
import { List, AutoSizer } from 'react-virtualized'
// import要写在最上面
import axios from 'axios'
import './index.scss'
import { getCurrentCity } from '../../utils'

class City extends React.Component {
  formatData(list) {
    const cityObj = {}
    list.forEach(e => {
      const key = e.short.slice(0, 1)
      // 不存在这个字母开头的属性名  创建一个新数组
      if (!cityObj[key]) {
        cityObj[key] = []
      }
      // 这个属性名的数组中 加上e
      cityObj[key].push(e)
    })
    const shortList = Object.keys(cityObj).sort()
    return {
      cityObj,
      shortList
    }
  }
  async getCityList() {
    const res = await axios.get('http://localhost:8080/area/city?level=1')
    const { body } = res.data
    const { cityObj, shortList } = this.formatData(body)
    // 添加热门城市
    const hotRes = await axios.get('http://localhost:8080/area/hot')
    shortList.unshift('hot')
    cityObj.hot = hotRes.data.body
    // 再添加一个当前城市
    const city = await getCurrentCity()

    shortList.unshift('#')
    cityObj['#'] = [city]
    console.log(cityObj)
    console.log(shortList)

    // 替换state中的值
    this.setState({
      cityObj,
      shortList
    })
  }

  rowRenderer = ({
    key, // 唯一的key值
    index, // 每一行的索引号
    style // 样式对象
  }) => {
    // 箭头函数 或者 bind解决this指向问题
    // console.log(this)
    // 通过下标可以获取首字母
    const letter = this.state.shortList[index]
    // 根据首字母获取到需要渲染的城市列表
    const list = this.state.cityObj[letter] //整个list是一行 一共是21行
    // 执行了 21 次
    // console.log(list)

    return (
      <div key={key} style={style} className="city-item">
        <div className="title">{letter}</div>
        {list.map(item => (
          <div key={item.value} className="name">
            {item.label}
          </div>
        ))}
      </div>
    )
  }
  state = {
    shortList: [],
    cityObj: {}
  }

  componentDidMount() {
    // 获取城市列表数据
    this.getCityList()
  }
  render() {
    return (
      <>
        {/* 导航组件 */}
        <NavBar
          mode="light"
          icon={<Icon type="left" />}
          onLeftClick={() => this.props.history.go(-1)}
        >
          NavBar
        </NavBar>
        <AutoSizer>
          {({ width, height }) => (
            <List
              width={width}
              height={height}
              rowCount={this.state.shortList.length}
              rowHeight={100}
              rowRenderer={this.rowRenderer()}
            />
          )}
        </AutoSizer>
      </>
    )
  }
}
// 暴露组件
export default City
