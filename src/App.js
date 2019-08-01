import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
// 如何解决 警告
import 'antd-mobile/dist/antd-mobile.css'
import { Button } from 'antd-mobile'
import './index.scss'
class App extends Component {
  render() {
    return (
      <div className="App">
        <Button type="primary">你好我的react</Button>
      </div>
    )
  }
}

export default App
