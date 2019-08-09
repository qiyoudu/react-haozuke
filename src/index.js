import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import 'antd-mobile/dist/antd-mobile.css'
// 引入全局字体样式
import './assets/fonts/iconfont.css'
// 引入scss
import './index.scss'
// 引入 ant 组件

// 引入App
import App from './App'
ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.getElementById('root')
)
