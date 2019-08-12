import React from 'react'
import styles from './index.module.scss'
import FilterTitle from '../FilterTitle'
import FilterPicker from '../FilterPicker'
// 按钮
import FilterFooter from '../FilterFooter'
// 侧边栏
import FilterMore from '../FilterMore'
class Filter extends React.Component {
  render() {
    return (
      <div className={styles.filter}>
        <div className="mask" />
        <div className="content">
          {/* filter组件的内容 */}
          <FilterTitle />
          <FilterPicker />
          <FilterFooter />
          {/* <FilterMore /> */}
        </div>
      </div>
    )
  }
}

export default Filter
