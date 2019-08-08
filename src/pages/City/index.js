import React from 'react'
// 导入样式
import 'react-virtualized/styles.css'
// // 导入 list组件  AutiSizer组件
import { List, AutoSizer } from 'react-virtualized'
// import要写在最上面
import axios from 'axios'
// import './index.scss'
// 使用styles 对象的形式的类名实现 作用域样式
import styles from './index.module.scss'
// 精确导出
import { getCurrentCity, setCity } from '../../utils'
// 导入头部组件
import NavHeader from '../../common/NavHeader'
// 导入轻提示组件
import { Toast } from 'antd-mobile'

const cityArr = ['北京', '上海', '广州', '深圳']
class City extends React.Component {
  constructor(props) {
    super(props)
    // 创建Ref    由于在state中存储数据会存在性能消耗问题 ref也会更新组件...
    this.listRef = React.createRef()
  }
  state = {
    shortList: [],
    cityObj: {},
    currentIndex: 0
  }
  // 没有遮幕的轻提示
  showToastNoMask() {
    Toast.info('抱歉暂无房源', 2, null, false)
  }

  formatData(list) {
    const cityObj = {}
    list.forEach(item => {
      const key = item.short.slice(0, 1)
      // 判断key在cityObj中是否存在
      if (key in cityObj) {
        cityObj[key].push(item)
      } else {
        cityObj[key] = [item]
      }
    })
    const shortList = Object.keys(cityObj).sort()
    return {
      cityObj,
      shortList
    }
  }
  async getCityList() {
    const res = await axios.get('http://localhost:8080/area/city?level=1')
    const { body } = res.data
    const { cityObj, shortList } = this.formatData(body)
    // 添加热门城市
    const hotRes = await axios.get('http://localhost:8080/area/hot')
    shortList.unshift('hot')
    cityObj.hot = hotRes.data.body
    // 再添加一个当前城市
    const city = await getCurrentCity()

    shortList.unshift('#')
    cityObj['#'] = [city]
    // console.log(cityObj)
    //console.log(shortList)

    // 替换state中的值
    this.setState({
      cityObj,
      shortList
    })
  }

  rowRenderer({
    key, // 唯一的key值
    index, // 每一行的索引号
    style // 样式对象
  }) {
    // 箭头函数 或者 bind解决this指向问题    如果需要传参不能使用{fn(x)} 因为这里面是函数返回的结果
    // console.log(this)
    // 通过下标可以获取首字母
    const letter = this.state.shortList[index]
    // 根据首字母获取到需要渲染的城市列表
    const list = this.state.cityObj[letter] //整个list是一行 一共是21行
    // 执行了 21 次
    // console.log(list)

    return (
      <div key={key} style={style} className={styles['city-item']}>
        <div className={styles.title}>{this.getName(letter)}</div>
        {list.map(item => (
          <div
            onClick={() => this.changeCity(item)}
            key={item.value}
            className={styles.name}
          >
            {item.label}
          </div>
        ))}
      </div>
    )
  }
  changeCity = v => {
    // 判断点击的城市是否在 四个城市中  有保存到本地并返回上一页  没有提示 暂无房源信息
    if (cityArr.includes(v.label)) {
      // 存入本地 复杂数据类型需要转成JSON格式的
      setCity(v)
      // 返回上一页
      this.props.history.push('/home')
    } else {
      // console.log('不存在')
      // 使用轻提示
      this.showToastNoMask()
    }
  }
  getName(letter) {
    if (letter === '#') {
      return '当前定位'
    } else if (letter === 'hot') {
      return '热门城市'
    } else {
      return letter.toUpperCase()
    }
  }

  rightMeau = () => {
    return (
      <ul className={styles['city-index']}>
        {this.state.shortList.map((item, index) => (
          <li
            onClick={() => this.handelClick(index)}
            key={item}
            className={styles['city-index-item']}
          >
            <span
              className={
                index === this.state.currentIndex ? styles['index-active'] : ''
              }
            >
              {index === 1 ? '热' : item.toUpperCase()}
            </span>
          </li>
        ))}
      </ul>
    )
  }

  handelClick = index => {
    // console.log(index)
    // console.log(this.listRef.current)
    this.listRef.current.scrollToRow(index)
  }
  computerHeight({ index }) {
    // console.log(index)

    const letter = this.state.shortList[index]
    // 根据首字母获取到需要渲染的城市列表
    const list = this.state.cityObj[letter] //整个list是一行 一共是21行
    // 执行了 21 次
    // console.log(list)-
    const rowHe = list.length * 50 + 36
    return rowHe
  }
  findLetter({ startIndex }) {
    // console.log(startIndex)
    if (this.state.currentIndex !== startIndex) {
      this.setState({
        currentIndex: startIndex
      })
    }
  }
  async componentDidMount() {
    // 获取城市列表数据  async 修饰的函数返回的是promise对象
    await this.getCityList()
    // 计算一共的高度
    this.listRef.current.measureAllRows('')
  }

  render() {
    return (
      <div className={styles.city}>
        {this.rightMeau()}
        {/* 导航组件  这里的类名加不上去*/}

        <NavHeader>这是第一个封装</NavHeader>
        <AutoSizer>
          {({ height, width }) => (
            <List
              width={width}
              height={height}
              ref={this.listRef}
              rowCount={this.state.shortList.length}
              // 动态计算每行的高度 36+ list.length*50 index从哪里来  bind绑定this 返回并执行? 访问的是函数为什么会执行这个函数?  回去试一下render props的demo 找到bind(this)的Demo 谁帮我们执行了这个函数?
              rowHeight={this.computerHeight.bind(this)}
              rowRenderer={this.rowRenderer.bind(this)}
              // List上的属性
              onRowsRendered={this.findLetter.bind(this)}
              // 点击对应的下标去对应的地方
              // scrollToIndex={()=>this.handelClick}
              // 配置滚动之后的显示选项
              scrollToAlignment={'start'}
            />
          )}
        </AutoSizer>
      </div>
    )
  }
}
// 暴露组件
export default City
