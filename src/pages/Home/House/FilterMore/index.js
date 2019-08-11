import React from 'react'
// 引入底部按钮
import FilterFooter from '../FilterFooter'
import styles from './index.module.scss'
class FilterMore extends React.Component {
  render() {
    return (
      <div className={styles['filter-more']}>
        {/* 遮罩层 */}
        <div className="mask" />
        {/* 条件内容 */}
        <div className="tags">
          <dl className="dl">
            <dt className="dt">户型</dt>
            <dd className="dd">
              <span className="tag tag-active">东北</span>
            </dd>

            <dt className="dt">朝向</dt>
            <dd className="dd">
              <span className="tag tag-active">东北</span>
            </dd>

            <dt className="dt">楼层</dt>
            <dd className="dd">
              <span className="tag tag-active">东北</span>
            </dd>

            <dt className="dt">房屋亮点</dt>
            <dd className="dd">
              <span className="tag tag-active">东北</span>
            </dd>
          </dl>
        </div>
        <FilterFooter />
      </div>
    )
  }
}

export default FilterMore
