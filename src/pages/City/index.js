import React from 'react'
// 导入样式
import 'react-virtualized/styles.css'
// // 导入 list组件  AutiSizer组件
import { List, AutoSizer } from 'react-virtualized'
// import要写在最上面
import axios from 'axios'
import './index.scss'
import { getCurrentCity } from '../../utils'
// 导入头部组件
import NavHeader from '../../common/NavHeader'

class City extends React.Component {
  state = {
    shortList: [],
    cityObj: {},
    currentIndex: 0,
    goIndex: 1
  }
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

  rowRenderer({
    key, // 唯一的key值
    index, // 每一行的索引号
    style // 样式对象
  }) {
    // 箭头函数 或者 bind解决this指向问题    如果需要传参不能使用{fn(x)} 因为这里面是函数返回的结果
    // console.log(this)
    // 通过下标可以获取首字母
    const letter = this.state.shortList[index]
    // 根据首字母获取到需要渲染的城市列表
    const list = this.state.cityObj[letter] //整个list是一行 一共是21行
    // 执行了 21 次
    // console.log(list)

    return (
      <div key={key} style={style} className="city-item">
        <div className="title">{this.getName(letter)}</div>
        {list.map(item => (
          <div
            onClick={() => this.changeCity(item)}
            key={item.value}
            className="name"
          >
            {item.label}
          </div>
        ))}
      </div>
    )
  }
  changeCity = ({ label }) => {
    console.log(label)
  }
  getName(letter) {
    if (letter === '#') {
      return '当前定位'
    } else if (letter === 'hot') {
      return '热门城市'
    } else {
      return letter.toUpperCase()
    }
  }
  handelClick = v => {
    this.setState({
      goIndex: v
    })
  }
  rightMeau = () => {
    return (
      <ul className="city-index">
        {this.state.shortList.map((item, index) => (
          <li
            onClick={() => this.handelClick(index)}
            key={item}
            className="city-index-item"
          >
            <span
              className={
                index === this.state.currentIndex ? 'index-active' : ''
              }
            >
              {index === 1 ? '热' : item.toUpperCase()}
            </span>
          </li>
        ))}
      </ul>
    )
  }
  computerHeight({ index }) {
    // console.log(index)

    const letter = this.state.shortList[index]
    // 根据首字母获取到需要渲染的城市列表
    const list = this.state.cityObj[letter] //整个list是一行 一共是21行
    // 执行了 21 次
    // console.log(list)
    const rowHe = list.length * 50 + 36
    return rowHe
  }
  findLetter({ startIndex }) {
    // console.log(startIndex)
    if (this.state.currentIndex !== startIndex) {
      this.setState({
        currentIndex: startIndex
      })
    }
  }
  componentDidMount() {
    // 获取城市列表数据
    this.getCityList()
  }
  render() {
    return (
      <div className="city">
        {this.rightMeau()}
        {/* 导航组件 */}
        <NavHeader>这是第一个封装</NavHeader>
        <AutoSizer>
          {({ height, width }) => (
            <List
              width={width}
              height={height}
              rowCount={this.state.shortList.length}
              // 动态计算每行的高度 36+ list.length*50 index从哪里来  bind绑定this 返回并执行? 访问的是函数为什么会执行这个函数?  回去试一下render props的demo 找到bind(this)的Demo 谁帮我们执行了这个函数?
              rowHeight={this.computerHeight.bind(this)}
              rowRenderer={this.rowRenderer.bind(this)}
              // List上的属性
              onRowsRendered={this.findLetter.bind(this)}
              // 点击对应的下标去对应的地方
              scrollToIndex={this.state.goIndex}
              // 配置滚动之后的显示选项
              scrollToAlignment={'start'}
            />
          )}
        </AutoSizer>
      </div>
    )
  }
}
// 暴露组件
export default City
