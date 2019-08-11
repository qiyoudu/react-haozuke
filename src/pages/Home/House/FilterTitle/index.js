import React from 'react'
import styles from './index.module.scss'
import { Flex } from 'antd-mobile'
// 固定数据(提取出来) 方便维护
const titleList = [
  { title: '区域', type: 'area' },
  { title: '方式', type: 'mode' },
  { title: '租金', type: 'price' },
  { title: '筛选', type: 'more' }
]
class FilterTitle extends React.Component {
  render() {
    return (
      <Flex align="center" className={styles['filter-title']}>
        {titleList.map(e => (
          <Flex.Item key={e.title}>
            {/* 选中类名： selected 高亮*/}
            <span className="dropdown ">
              <span>{e.title}</span>
              <i className="iconfont icon-arrow" />
            </span>
          </Flex.Item>
        ))}
      </Flex>
    )
  }
}

export default FilterTitle
