// import { NavBar } from 'antd-mobile'
import React from 'react'
// import ReactDOM from 'react-dom'
import { NavBar, Icon } from 'antd-mobile'
// 校验
import PropTypes from 'prop-types'
// import './index.scss'
import styles from './index.module.scss'
// 需要组件包装解决 解决点击去哪个组件报错问题 使用withRouter 高阶组件
import { withRouter } from 'react-router-dom'
class NavHeader extends React.Component {
  // 传入的children值校验
  static propTypes = {
    children: PropTypes.string.isRequired,
    backgroundColor: PropTypes.string
  }
  static defaultProps = {
    backgroundColor: 'white'
  }
  render() {
    return (
      <NavBar
        // this.props是NavHeader标签上的值
        style={{ backgroundColor: this.props.backgroundColor }}
        className={styles.navBar}
        mode="light"
        icon={<Icon type="left" className={styles['icon-back']} />}
        onLeftClick={() => this.props.history.go(-1)}
        rightContent={this.props.rightContent}
      >
        {this.props.children}
      </NavBar>
    )
  }
}
export default withRouter(NavHeader)
