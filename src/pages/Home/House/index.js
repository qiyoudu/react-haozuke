import React from 'react'
// import ReactDOM from 'react-dom'
// 导入自己封装的组件  改变自己的样式
import SearchHeader from '../../../common/SearchHeader'
// 使用flex布局
import { Flex } from 'antd-mobile'
// 导入样式
import styles from './index.module.scss'
class House extends React.Component {
  render() {
    return (
      <div className={styles.house}>
        <Flex className="house-title">
          <i
            className="iconfont icon-back"
            onClick={() => this.props.history.go(-1)}
          />
          <SearchHeader cityName="芜湖" className="houseSearchHeader" />
        </Flex>
      </div>
    )
  }
}
// 暴露组件
export default House
