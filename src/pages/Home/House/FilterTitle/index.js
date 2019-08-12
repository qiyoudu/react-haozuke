import React from 'react'
import styles from './index.module.scss'
import { Flex } from 'antd-mobile'
// 固定数据(提取出来) 方便维护
import classnames from 'classnames'
const titleList = [
  { title: '区域', type: 'area' },
  { title: '方式', type: 'mode' },
  { title: '租金', type: 'price' },
  { title: '筛选', type: 'more' }
]
class FilterTitle extends React.Component {
  changeStatus = v => {
    this.props.changeStatus(v)
    console.log(v)
  }
  componentDidUpdate(prev) {
    // 如果更新组件时 默认值和上一的一致 则不需要用改变高亮
    console.log(prev)
    console.log(this.props)

    // if (prev===this.props)
  }
  render() {
    // console.log(this.props.titleSelectedStatus)
    const { titleSelectedStatus } = this.props

    return (
      <Flex align="center" className={styles['filter-title']}>
        {titleList.map(e => {
          let isSelected = titleSelectedStatus[e.type]
          return (
            <Flex.Item key={e.title}>
              {/* 选中类名： selected 高亮 点击控制高亮*/}
              <span
                onClick={() => this.changeStatus(e.type)}
                className={classnames('dropdown ', { selected: isSelected })}
              >
                <span>{e.title}</span>
                <i className="iconfont icon-arrow" />
              </span>
            </Flex.Item>
          )
        })}
      </Flex>
    )
  }
}

export default FilterTitle
