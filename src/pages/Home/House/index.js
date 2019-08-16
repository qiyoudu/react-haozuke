import React from 'react'
// import ReactDOM from 'react-dom'
// 导入自己封装的组件  改变自己的样式
import SearchHeader from '../../../common/SearchHeader'
// 使用flex布局
import { Flex } from 'antd-mobile'
// 导入样式
import styles from './index.module.scss'
// 导入获取城市的方法
import { getCity, API } from '../../../utils'
// 导入筛选组件
import Filter from './Filter'
import HouseItem from '../../../common/HouseItem'
// 使用 react-virtualized 渲染这个页面 数据多的情况
import { List, AutoSizer } from 'react-virtualized'
class House extends React.Component {
  state = {
    cityName: '芜湖',
    cityId: '',
    filters: {},
    list: [],
    count: 100
  }
  // 获取当前城市
  componentDidMount() {
    const cityName = getCity()
    // console.log(cityName)
    // 发送ajax获取数据
    this.getHouseList()
    this.setState({
      cityName: cityName.label,
      cityId: cityName.value
    })
  }
  onFilter = v => {
    // 子传父 数据
    // console.log(v)
    let { area, mode, more, price } = v
    // console.log(area)
    // console.log(mode)
    // console.log(more + '')
    // console.log(price + '')

    //处理数据
    let filters = {}
    // 处理rentType 数组转成字符串
    let rentType = mode + ''
    // 处理more
    more = more + ''
    // 处理price
    price = price + ''
    // 处理area 接口需要接受的area不能是null
    // 值可能是第二项 也可能是第三项
    //如果长度为2 那么值为第二项
    //如果长度为3 最后一项不是null 就获取最后一项

    let length = area.length
    if (length === 2) {
      area = area[1]
    } else if (length === 3 && area[length - 1] === 'null') {
      area = area[length - 2]
    } else if (length === 3 && area[length - 1] !== 'null') {
      area = area[length - 1]
    }
    filters = {
      rentType,
      more,
      price,
      area
    }
    // console.log(this.state.list)
    // console.log(this)

    //  改变state数据
    this.setState({
      filters
    })
  }

  async getHouseList() {
    const res = await API.get(`/houses`, {
      params: { ...this.state.filters, id: this.state.cityid }
    })
    let { body, status } = res
    // console.log(res)
    // if (status === 200) {
    this.setState({
      list: body.list,
      count: body.count
    })
    // }
    console.log(this.state.list)
  }
  rowRenderer = ({ key, index, style }) => {
    // console.log(style)
    // console.log(key)
    // console.log(index)
    // console.log(this.state.list)
    // console.log(this.state.list)

    // 如果 item 一开始没有 没有值那么 渲染一个提示消息
    const item = this.state.list[index]
    if (!item) {
      return (
        <div key={key} style={style} className="tips">
          <p>heh</p>
        </div>
      )
    }
    return <HouseItem key={key} e={item} style={style} />
  }
  render() {
    return (
      <div className={styles.house}>
        <Flex className="house-title">
          <i
            className="iconfont icon-back"
            onClick={() => this.props.history.go(-1)}
          />
          <SearchHeader
            cityName={this.state.cityName}
            className="houseSearchHeader"
          />
        </Flex>
        <Filter onFilter={this.onFilter} />
        <AutoSizer>
          {({ height, width }) => (
            <List
              height={height}
              width={width}
              rowCount={this.state.count}
              rowHeight={130}
              rowRenderer={this.rowRenderer.bind(this)}
            />
          )}
        </AutoSizer>
      </div>
    )
  }
}
// 暴露组件
export default House
