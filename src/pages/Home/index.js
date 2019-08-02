import React from 'react'
import { Route, Switch } from 'react-router-dom'
// 由于大小写路径问题 需要写准确 引入路径报错写全就可以
import Index from './Index/index.js'
import House from './House'
import News from './News'
import My from './My'
// 引入样式'
// import '../../assert/fonts/iconfont.css'

import './index.scss'
import { TabBar } from 'antd-mobile'
const item_list = [
  { title: '首页', icon: 'icon-ind', path: '/home' },
  { title: '找房', icon: 'icon-findHouse', path: '/home/house' },
  { title: '资讯', icon: 'icon-infom', path: '/home/news' },
  { title: '我的', icon: 'icon-my', path: '/home/profile' }
]

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
      >
        {this.renderContent('Index')}
      </TabBar.Item>
    ))
  }
  constructor(props) {
    super(props)

    this.state = {
      // 一进入页面选中的按钮  对应了四个选中的名字 red blue yellow ...
      selectedTab: 'blueTab',
      hidden: false,
      fullScreen: true,
      // 页面一刷新就高亮
      selectedTab: this.props.location.pathname
      // item_list: [
      //   { title: '首页', icon: 'icon-ind', path: '/home/index' },
      //   { title: '找房', icon: 'icon-findHouse', path: '/home/house' },
      //   { title: '资讯', icon: 'icon-infom', path: '/home/news' },
      //   { title: '我的', icon: 'icon-my', path: '/home/profile' }
      // ]
    }
  }
  //  渲染的信息false了
  renderContent(pageText) {
    return (
      <div
        style={{
          backgroundColor: 'white',
          // height: '100%',
          textAlign: 'center'
        }}
      >
        <div style={{ paddingTop: 60 }}>
          Clicked “{pageText}” tab， show “{pageText}” information
        </div>
        <a
          style={{
            display: 'block',
            marginTop: 40,
            marginBottom: 20,
            color: '#108ee9'
          }}
          onClick={e => {
            e.preventDefault()
            this.setState({
              hidden: !this.state.hidden
            })
          }}
        >
          Click to show/hide tab-bar
        </a>
        <a
          style={{ display: 'block', marginBottom: 600, color: '#108ee9' }}
          onClick={e => {
            e.preventDefault()
            this.setState({
              fullScreen: !this.state.fullScreen
            })
          }}
        >
          Click to switch fullscreen
        </a>
      </div>
    )
  }

  render() {
    return (
      // 配置路由
      <div className="home">
        <Switch>
          {/* 嵌套路由 先匹配到父元素 */}
          <Route path="/home" component={Index} />
          <Route path="/home/house" component={House} />
          <Route path="/home/news" component={News} />
          <Route path="/home/my" component={My} />
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
            noRenderContent={true}
            unselectedTintColor="#888"
            tintColor=" #21b97a"
            barTintColor="white"
            hidden={this.state.hidden}
          >
            {/* 这里可以遍历的 */}
            {/*  */}
            {this.renderItem()}
            {/* <TabBar.Item
              title="Index"
              key="Index"
              icon={<i className="iconfont icon-ind" />}
              selectedIcon={<i className="iconfont icon-ind" />}
              selected={this.state.selectedTab === '/home/index'}
              onPress={() => {
                this.props.history.push('/home/index')
                this.setState({
                  selectedTab: '/home/index'
                })
              }}
              data-seed="logId"
            >
              {this.renderContent('Index')}
            </TabBar.Item>
            <TabBar.Item
              icon={<i className="iconfont icon-findHouse" />}
              selectedIcon={<i className="iconfont icon-findHouse" />}
              title="House"
              key="House"
              selected={this.state.selectedTab === '/home/house'}
              onPress={() => {
                this.props.history.push('/home/house')

                this.setState({
                  selectedTab: '/home/house'
                })
              }}
              data-seed="logId1"
            >
              {this.renderContent('House')}
            </TabBar.Item>
            <TabBar.Item
              icon={<i className="iconfont icon-infom" />}
              selectedIcon={<i className="iconfont icon-infom" />}
              title="News"
              key="News"
              dot
              selected={this.state.selectedTab === '/home/news'}
              onPress={() => {
                this.props.history.push('/home/news')
                this.setState({
                  selectedTab: '/home/news'
                })
              }}
            >
              {this.renderContent('News')}
            </TabBar.Item>
            <TabBar.Item
              icon={<i className="iconfont icon-my" />}
              selectedIcon={<i className="iconfont icon-my" />}
              title="My"
              key="my"
              selected={this.state.selectedTab === '/home/my'}
              onPress={() => {
                // push中的路径要写准确
                this.props.history.push('/home/my')
                this.setState({
                  selectedTab: '/home/my'
                })
              }}
            >
              {this.renderContent('my')}
            </TabBar.Item> */}
          </TabBar>
        </div>
      </div>
    )
  }
}
// 暴露组件
export default Home
