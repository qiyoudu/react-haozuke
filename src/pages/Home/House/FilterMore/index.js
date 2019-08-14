import React from 'react'
// 引入底部按钮
import FilterFooter from '../FilterFooter'
import styles from './index.module.scss'
// 处理类名
import classnames from 'classnames'
class FilterMore extends React.Component {
  // 封装一个方法
  renderSpan = v => {
    return v.map((e, index) => {
      const { selectedValue } = this.state
      return (
        <span
          key={e.value}
          className={classnames('tag', {
            'tag-active': selectedValue.includes(e.value)
          })}
          onClick={() => this.handelClick(e.value, index)}
        >
          {e.label}
        </span>
      )
    })
  }
  constructor(props) {
    super(props)
    this.state = {
      selectedValue: []
    }
  }
  handelClick = (v, i) => {
    // console.log(v, i)
    // 点击 存入数组 如果不存在就直接存入数组 如果存在就移除这个值
    let newSelectedValue = this.state.selectedValue
    if (!newSelectedValue.includes(v)) {
      newSelectedValue.push(v)
    } else {
      // 修改了原数组  注意区分slice的区别 slice不会改变原数组
      // newSelectedValue.splice(i) 有Bug
      // 使用filter 返回了一个新的数组
      newSelectedValue = this.state.selectedValue.filter(e => e !== v)
    }
    // console.log(newSelectedValue)

    // 替换原数据
    this.setState({
      selectedValue: [...newSelectedValue]
    })
  }
  render() {
    // console.log(this.props)
    const { roomType, oriented, floor, characteristic } = this.props
    return (
      <div className={styles['filter-more']}>
        {/* 遮罩层 */}
        <div className="mask" />
        {/* 条件内容 */}
        <div className="tags">
          <dl className="dl">
            <dt className="dt">户型</dt>
            <dd className="dd">{this.renderSpan(roomType)}</dd>

            <dt className="dt">朝向</dt>
            <dd className="dd">{this.renderSpan(oriented)}</dd>

            <dt className="dt">楼层</dt>
            <dd className="dd">{this.renderSpan(floor)}</dd>

            <dt className="dt">房屋亮点</dt>
            <dd className="dd">{this.renderSpan(characteristic)}</dd>
          </dl>
        </div>
        <FilterFooter className={'footer'} />
      </div>
    )
  }
}

export default FilterMore
