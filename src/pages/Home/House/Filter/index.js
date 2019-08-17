import React from 'react'
import styles from './index.module.scss'
import FilterTitle from '../FilterTitle'
import FilterPicker from '../FilterPicker'
import FilterMore from '../FilterMore'
import { API, getCurrentCity } from '../../../../utils'
// // 侧边栏 数据放在父组件中统一管理
// // import FilterMore from '../FilterMore'
class Filter extends React.Component {
  // 提供高亮状态
  state = {
    // 控制标题的选择状态
    titleSelectedStatus: {
      // area:区域  mode:方式  price:租金  more:筛选
      // true代表高亮  false:不选中
      area: false,
      mode: false,
      price: false,
      more: false
    },
    // 记录点击的标题的type值， 用于控制FilterPicker组件的显示和隐藏
    // openType: area/mode/price  FilterPicker就应该显示
    // openType: more/''  FilterPicker就应该隐藏
    openType: '',
    // 所有的筛选条件
    filtersData: {},
    // 用于存储所有已经选择过的筛选的条件 提供默认的数据
    selectedValues: {
      area: ['area', 'null'],
      mode: ['null'],
      price: ['null'],
      more: []
    },
    overflow: ''
  }
  componentDidMount() {
    this.getFiltersData()
  }
  changeStatus = type => {
    const { titleSelectedStatus, selectedValues } = this.state
    let newTitleSelectedStatus = { ...titleSelectedStatus }
    // 循环的结果 点击mode时 样式=> {area:false,mode:true,price:false,more:false}
    Object.keys(newTitleSelectedStatus).forEach(key => {
      if (key === type) {
        newTitleSelectedStatus[key] = true
      } else {
        const res = this.isLight(key, selectedValues[key])
        // 不亮

        // console.log(res)
        // 把对象合并到第一个对象中 es6assgin
        Object.assign(newTitleSelectedStatus, res)
      }
    })

    this.setState({
      titleSelectedStatus: newTitleSelectedStatus,
      openType: type,
      overflow: 'hidden'
    })
  }
  // 获取筛选的条件的数据

  async getFiltersData() {
    const { value } = await getCurrentCity()
    const res = await API.get(`houses/condition?id=${value}`)
    // console.log(res)

    this.setState({
      filtersData: res.body
    })
    // console.log(this.state.filtersData)
  }

  renderFilterPicker = () => {
    const {
      openType,
      filtersData: { area, subway, rentType, price },
      selectedValues
    } = this.state
    // console.log('打印')
    // 打印三次 前两次为空 最后一次获取到数据
    // debugger

    // console.log(this.state.filtersData)
    // 点击title的时候才会显示 filterPicker组件
    if (openType === '' || openType === 'more') return

    let data, cols
    const defaultValue = selectedValues[openType]
    if (openType === 'area') {
      data = [area, subway]
      cols = 3
    } else if (openType === 'mode') {
      data = rentType
      cols = 1
    } else if (openType === 'price') {
      data = price
      cols = 1
    }
    // 增加key属性 不要去复用这个组件 而是重新创建执行constructor
    return (
      <FilterPicker
        onCancel={this.onCancel}
        onSave={this.onSave}
        data={data}
        cols={cols}
        defaultValue={defaultValue}
        key={openType}
      />
    )
  }
  onCancel = () => {
    console.log('我要隐藏了')
    const { selectedValues, openType, titleSelectedStatus } = this.state
    // const newTitleSelectedStatus = { ...titleSelectedStatus }
    let val = selectedValues[openType]

    const res = this.isLight(openType, val)
    this.setState({
      titleSelectedStatus: { ...titleSelectedStatus, ...res },
      openType: '',
      overflow: ''
    })
  }
  /* 
    接收一个title和 title对应的值
    返回：一个对象，对象包含了这个title是否高亮  主要用来回显示高亮的效果
  */
  isLight = (title, val) => {
    const obj = {}
    const selectedVal = val.toString()
    if (title === 'area' && selectedVal !== 'area,null') {
      // 这里修改的是对象中的值
      obj[title] = true
    } else if (title === 'mode' && selectedVal !== 'null') {
      obj[title] = true
    } else if (title === 'price' && selectedVal !== 'null') {
      obj[title] = true
    } else if (title === 'more' && selectedVal !== '') {
      obj[title] = true
    } else {
      obj[title] = false
    }
    return obj
  }
  onSave = v => {
    // 数组加上''会转化为字符串
    const { openType, selectedValues, titleSelectedStatus } = this.state
    // console.log(['dd', 'bb', 'cc'])
    // console.log(selectedValues)

    const res = this.isLight(openType, v)
    // const { openType } = this.state
    this.setState(
      {
        openType: '',
        selectedValues: {
          ...selectedValues,
          [openType]: v
        },
        titleSelectedStatus: { ...titleSelectedStatus, ...res },
        overflow: ''
      },
      () => this.props.onFilter(this.state.selectedValues)
    )
    // 回到页面顶部
    window.scrollTo(0, 0)
  }
  onClickMask = () => {
    // console.log(1)
    // 执行隐藏组件
    this.setState({
      openType: ''
    })
  }

  renderFilterMore = () => {
    const {
      openType,
      filtersData: { roomType, oriented, floor, characteristic },
      selectedValues
    } = this.state
    const data = { roomType, oriented, floor, characteristic }
    // console.log(data)

    if (openType === 'more') {
      return (
        <FilterMore
          defaultValue={selectedValues['more']}
          {...data}
          onClickMask={this.onClickMask}
          onPut={this.onSave}
        />
      )
    } else {
      return null
    }
  }
  renderMask() {
    // 有mask的时候让 body overflow hidden 不能滚动
    document.body.style.overflow = this.state.overflow
    const { openType } = this.state
    return openType === 'area' ||
      openType === 'mode' ||
      openType === 'price' ? (
      <div className="mask" onClick={this.onCancel} />
    ) : null
  }
  render() {
    const { titleSelectedStatus } = this.state
    return (
      // 蒙层的显示和隐藏
      <div className={styles.filter}>
        {this.renderMask()}

        <div className="content">
          {/* filter组件的内容 */}
          {/* 标题 */}
          <FilterTitle
            titleSelectedStatus={titleSelectedStatus}
            changeStatus={this.changeStatus}
          />
          {/* picker */}
          {this.renderFilterPicker()}
          {/* more */}
          {this.renderFilterMore()}
        </div>
      </div>
    )
  }
}
export default Filter
