import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
// 由于大小写路径问题 需要写准确 引入路径报错写全就可以
import Index from './Index/index.js'
import House from './House'
import News from './News'
import My from './My'

import './index.scss'
// 按需加载
import TabBar from 'antd-mobile/es/tab-bar'
import 'antd-mobile/es/tab-bar/style'
// 搜索框
const item_list = [
  { title: '首页', icon: 'icon-ind', path: '/home' },
  { title: '找房', icon: 'icon-findHouse', path: '/home/house' },
  { title: '资讯', icon: 'icon-infom', path: '/home/news' },
  { title: '我的', icon: 'icon-my', path: '/home/my' }
]
const NotFount = () => {
  return <div>啊哦!页面不见了</div>
}
class Home extends React.Component {
  renderItem = () => {
    return item_list.map(e => (
      <TabBar.Item
        title={e.title}
        key={e.title}
        icon={<i className={`iconfont ${e.icon}`} />}
        selectedIcon={<i className={`iconfont ${e.icon}`} />}
        selected={this.state.selectedTab === e.path}
        onPress={() => {
          this.props.history.push(e.path)
          this.setState({
            selectedTab: e.path
          })
        }}
        data-seed="logId"
      />
    ))
  }
  constructor(props) {
    super(props)
    // this.props 和 props是一样的
    // console.log(this.props === props)

    this.state = {
      // 一进入页面选中的按钮  对应了四个选中的名字 red blue yellow ...
      selectedTab: this.props.location.pathname,
      hidden: false,
      fullScreen: true
    }
  }

  render() {
    return (
      // 配置路由
      <div className="home">
        <Switch>
          {/* 嵌套路由 先匹配到父元素 */}
          <Redirect exact from="/" to="/home" />
          <Route exact path="/home" component={Index} />
          <Route path="/home/house" component={House} />
          <Route path="/home/news" component={News} />
          <Route path="/home/my" component={My} />
          <Route component={NotFount} />
        </Switch>

        {/* 导航栏 */}
        <div
          style={
            this.state.fullScreen
              ? { position: 'fixed', height: '50px', width: '100%', bottom: 0 }
              : { height: 400 }
          }
        >
          <TabBar
            // 不渲染内容部分

            unselectedTintColor="#888"
            tintColor=" #21b97a"
            barTintColor="white"
            hidden={this.state.hidden}
          >
            {/* 这里可以遍历的 */}
            {this.renderItem()}
          </TabBar>
        </div>
      </div>
    )
  }
}
// 暴露组件
export default Home
