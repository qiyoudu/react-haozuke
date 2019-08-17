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
import {
  List,
  AutoSizer,
  WindowScroller,
  InfiniteLoader
} from 'react-virtualized'
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

  async getHouseList(start = 1, end = 30) {
    const res = await API.get(`/houses`, {
      params: { ...this.state.filters, id: this.state.cityid, start, end }
    })
    let { body, status } = res
    // console.log(res)
    if (status === 200) {
      this.setState({
        list: body.list,
        count: body.count
      })
    }
    // console.log(this.state.list)
  }
  rowRenderer = ({ key, index, style }) => {
    // console.log(style)
    // style.left = '15px'
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
  isRowLoaded({ index }) {
    // 判断list中index是否有对应的数据  返回一一个布尔值
    return !!this.state.list[index]
  }

  // 发送ajax请求，获取更多的数据
  loadMoreRows({ startIndex, stopIndex }) {
    // console.log('没有数据了，该发送请求了', startIndex, stopIndex)
    return new Promise(async resolve => {
      await this.getHouseList(startIndex + 1, stopIndex + 1)
      resolve()
    })
  }
  render() {
    const { count } = this.state
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
        {/* InfiniteLoader组件内部调用该方法 isRowLoaded*/}
        <InfiniteLoader
          isRowLoaded={this.isRowLoaded.bind(this)}
          loadMoreRows={this.loadMoreRows.bind(this)}
          rowCount={count}
          minimumBatchSize={20}
        >
          {/* 
            onRowsRendered: 给List组件提供的函数， onRowsRendered当List组件滚动的时候，会调onRowsRendered
              保证InfiniteLoader会在List滚动的时候，去判断是否需要加载数据
            registerChild: 保证在InfiniteLoader组件中可以获取List组件， 数据加载完成后，需要更新List组件
          */}
          {({ onRowsRendered, registerChild }) => (
            <WindowScroller>
              {({ height, isScrolling, scrollTop }) => (
                <AutoSizer>
                  {({ width }) => (
                    // autoHeight:只有在windowScroller高阶中组件中使用才有意义
                    <List
                      onRowsRendered={onRowsRendered}
                      ref={registerChild}
                      autoHeight
                      width={width}
                      height={height}
                      rowCount={count}
                      rowHeight={120}
                      rowRenderer={this.rowRenderer.bind(this)}
                      isScrolling={isScrolling}
                      scrollTop={scrollTop}
                    />
                  )}
                </AutoSizer>
              )}
            </WindowScroller>
          )}
        </InfiniteLoader>
      </div>
    )
  }
}
// 暴露组件
export default House
