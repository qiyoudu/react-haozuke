// import { NavBar } from 'antd-mobile'
import React from 'react'
// import ReactDOM from 'react-dom'
import { NavBar, Icon } from 'antd-mobile'
// 校验
import PropTypes from 'prop-types'
import './index.scss'
export default class NavHeader extends React.Component {
  // 传入的children值校验
  static propTypes = {
    children: PropTypes.string.isRequired
  }
  render() {
    return (
      <NavBar
        className="navBar"
        mode="light"
        icon={<Icon type="left" className="icon-back" />}
        onLeftClick={() => this.props.history.go(-1)}
      >
        {this.props.children}
      </NavBar>
    )
  }
}
