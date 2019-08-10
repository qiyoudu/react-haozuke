import React from 'react'
// import ReactDOM from 'react-dom'
// 高阶组件升级之后 可以访问路由信息
// 引入样式
import styles from './index.module.scss'
import { withRouter } from 'react-router-dom'
import { Flex } from 'antd-mobile'
// 组件的校验
import PropTypes from 'prop-types'
import classnames from 'classnames'
class SearchHeader extends React.Component {
  // 类的静态方法 校验
  static propTypes = {
    cityName: PropTypes.string.isRequired
  }
  render() {
    return (
      // 可以接受传入的类名  使用classnames第三方插件方便
      // <Flex className={`${styles['search-box']} ${this.props.className}`}>
      <Flex className={classnames(this.props.className, styles['search-box'])}>
        <Flex className="search-form">
          <div
            className="location"
            onClick={() => this.props.history.push('/city')}
          >
            {/* props接受组件上的值 */}
            <span className="name">{this.props.cityName}</span>
            <i className="iconfont icon-arrow"> </i>
          </div>
          <div
            className="search-input"
            onClick={() => this.props.history.push('/search')}
          >
            <i className="iconfont icon-seach" />
            <span className="text">请输入小区地址</span>
          </div>
        </Flex>
        {/* 地图小图标 */}
        <i
          className="iconfont icon-map"
          onClick={() => this.props.history.push('/map')}
        />
      </Flex>
    )
  }
}
export default withRouter(SearchHeader)
