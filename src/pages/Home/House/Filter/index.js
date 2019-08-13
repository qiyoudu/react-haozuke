import React from 'react'
import styles from './index.module.scss'
import FilterTitle from '../FilterTitle'
import FilterPicker from '../FilterPicker'
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
    }
  }
  componentDidMount() {
    this.getFiltersData()
  }
  changeStatus = type => {
    //     获取到每个key对应的value值， SelectedValues[key]

    // 思路：1. 如果key是点击的标题  type,,直接高亮

    //      2. 如果key是area,  只要不是默认值就高亮   值的长度为3 或者这 值的第一项是 subway

    //      3. key 是  mode    值的第一项不是 'null'

    //      4. key 是price    值的第一项只要不是 'null'

    //      5. 其余情况，都是false
    // 循环break 和 函数return的区别
    //
    // console.log(type)

    const { titleSelectedStatus, selectedValues } = this.state
    const newTitleSelectedStatus = { ...titleSelectedStatus }
    // 循环的结果 点击mode时 样式=> {area:false,mode:true,price:false,more:false}
    Object.keys(newTitleSelectedStatus).forEach(key => {
      // console.log(key)
      // 默认的值
      let a = selectedValues[key]
      // console.log(a)
      //例如点击mode type=mode  第一个用来显示点击高亮 后面用来循环判断是否是默认值 这里是循环  key===type时 直接高亮 接下来的遍历判断是否其他需要高亮 返回的样式 {area:false,mode:true,price:false,more:false} 替换数据
      if (key === type) {
        newTitleSelectedStatus[key] = true
        // 执行一次
        // console.log('我是租金')
      } else if ((key === 'area' && a.length === 3) || a[0] === 'subway') {
        newTitleSelectedStatus[key] = true
      } else if (key === 'mode' && a[0] !== 'null') {
        newTitleSelectedStatus[key] = true
      } else if (key === 'price' && a[0] !== 'null') {
        newTitleSelectedStatus[key] = true
      } else if (key === 'more') {
        // newTitleSelectedStatus[key] = true
        // 占位置
      } else {
        // 不亮
        newTitleSelectedStatus[key] = false
      }
    })
    // console.log(flag)

    this.setState({
      titleSelectedStatus: newTitleSelectedStatus,
      openType: type
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
    const { selectedValues, openType } = this.state
    // const newTitleSelectedStatus = { ...titleSelectedStatus }
    let val = selectedValues[openType] + ''
    // console.log(val)

    // console.log(selectedValues)
    // console.log(openType)
    // 判断这一项的值是否和默认值是否相同  true为亮 思路一致适合封装
    // if (openType === 'area' && val !== 'area,null') {
    //   newTitleSelectedStatus[openType] = true
    // } else if (openType === 'mode' && val !== 'null') {
    //   newTitleSelectedStatus[openType] = true
    // } else if (openType === 'price' && val !== 'null') {
    //   newTitleSelectedStatus[openType] = true
    // } else if (openType === 'more' && val !== '') {
    //   newTitleSelectedStatus[openType] = true
    // } else {
    //   newTitleSelectedStatus[openType] = false
    // }
    const res = this.isLight(val)
    this.setState({
      titleSelectedStatus: res,
      openType: ''
    })
  }
  isLight = val => {
    const { titleSelectedStatus, openType } = this.state
    let newTitleSelectedStatus = { ...titleSelectedStatus }
    // 为什么这里的  newTitleSelectedStatus[openType] 不能提取出来?
    if (openType === 'area' && val !== 'area,null') {
      newTitleSelectedStatus[openType] = true
    } else if (openType === 'mode' && val !== 'null') {
      newTitleSelectedStatus[openType] = true
    } else if (openType === 'price' && val !== 'null') {
      newTitleSelectedStatus[openType] = true
    } else if (openType === 'more' && val !== '') {
      newTitleSelectedStatus[openType] = true
    } else {
      newTitleSelectedStatus[openType] = false
    }
    return newTitleSelectedStatus
  }
  onSave = v => {
    // 数组加上''会转化为字符串
    console.log(v)
    // console.log(['dd', 'bb', 'cc'])
    const res = this.isLight(v + '')
    const { openType } = this.state
    this.setState({
      openType: '',
      selectedValues: {
        ...this.state.selectedValues,
        [openType]: v
      },
      titleSelectedStatus: res
    })
  }

  render() {
    const { titleSelectedStatus, openType } = this.state
    return (
      // 蒙层的显示和隐藏
      <div className={styles.filter}>
        {openType === 'area' || openType === 'mode' || openType === 'price' ? (
          <div className="mask" onClick={this.onCancel} />
        ) : null}

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
          {/* <FilterMore /> */}
        </div>
      </div>
    )
  }
}
export default Filter
