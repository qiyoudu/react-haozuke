import React, { Component } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'

// 导入 Home City  组件 index.js文件自动识别
import Home from './pages/Home'
import City from './pages/City/index'
import Map from './pages/Map'
import Detail from './pages/Detail'
// 如何解决 警告
import 'antd-mobile/dist/antd-mobile.css'
import './index.scss'
class App extends Component {
  render() {
    return (
      <>
        <Switch>
          {/* 必须要加上 exact 才能匹配过去的原因是什么? */}
          <Redirect from="/" to="/home" exact />
          <Route path="/home" component={Home} />
          <Route path="/city" component={City} />
          <Route path="/map" component={Map} />
          <Route path="/detail/:id" component={Detail} />
        </Switch>
      </>
    )
  }
}

export default App
