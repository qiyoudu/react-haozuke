import React, { Component } from 'react'
import { Route } from 'react-router-dom'

// 导入 Home City  组件 index.js文件自动识别
import Home from './pages/Home'
import City from './pages/City/index'
// 如何解决 警告
import 'antd-mobile/dist/antd-mobile.css'
import './index.scss'
class App extends Component {
  render() {
    return (
      <>
        <Route path="/home" component={Home} />
        <Route path="/city" component={City} />
      </>
    )
  }
}

export default App
