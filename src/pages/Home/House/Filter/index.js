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
    // 用于存储所有已经选择过的筛选的条件
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
    // console.log(type)
    // 父组件需要把type对应的值改成true

    const { titleSelectedStatus } = this.state
    // const temp = { ...titleSelectedStatus }
    // temp[type] = true
    this.setState({
      titleSelectedStatus: {
        ...titleSelectedStatus,
        [type]: true
      },
      openType: type
    })
  }
  // 获取筛选的条件的数据

  async getFiltersData() {
    const { value } = await getCurrentCity()
    const res = await API.get(`houses/condition?id=${value}`)
    console.log(res)

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
    return (
      <FilterPicker
        onCancel={this.onCancel}
        onSave={this.onSave}
        data={data}
        cols={cols}
        defaultValue={defaultValue}
      />
    )
  }
  onCancel = () => {
    console.log('我要隐藏了')
    this.setState({
      openType: ''
    })
  }
  onSave = v => {
    console.log('我也会隐藏但是要提交数据')
    const { openType } = this.state
    this.setState({
      openType: '',
      selectedValues: {
        ...this.state.selectedValues,
        [openType]: v
      }
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
