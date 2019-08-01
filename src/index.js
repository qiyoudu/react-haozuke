import React from 'react'
import ReactDOM from 'react-dom'
import { HashRouter as Router } from 'react-router-dom'
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
