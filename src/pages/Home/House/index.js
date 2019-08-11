import React from 'react'
// import ReactDOM from 'react-dom'
// 导入自己封装的组件  改变自己的样式
import SearchHeader from '../../../common/SearchHeader'
// 使用flex布局
import { Flex } from 'antd-mobile'
// 导入样式
import styles from './index.module.scss'
// 导入获取城市的方法
import { getCity } from '../../../utils'
// 导入筛选组件
import Filter from './Filter'
class House extends React.Component {
  state = {
    cityName: '芜湖'
  }
  // 获取当前城市
  componentDidMount() {
    const cityName = getCity()
    // console.log(cityName)

    this.setState({
      cityName: cityName.label
    })
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
        <Filter />
      </div>
    )
  }
}
// 暴露组件
export default House
