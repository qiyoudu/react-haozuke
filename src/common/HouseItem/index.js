import React from 'react' //支持jsx
import styles from './index.module.scss'
// 使用函数组件 没有自己的数据
import { BASE_URL } from '../../utils/index'
export default function HouseItem({ item, style }) {
  return (
    <div className={styles.houseItems} style={style}>
      <div className="imgWrap">
        <img className="img" src={`${BASE_URL}${item.houseImg}`} alt="" />
      </div>
      <div className="content">
        <h3 className="title">{item.title}</h3>
        <div className="desc">{item.desc}</div>
        <div>
          {item.tags.map((item, index) => {
            return (
              <span key={item} className={`tag tag${index + 1}`}>
                {item}
              </span>
            )
          })}
        </div>
        <div className="price">
          <span className="priceNum">{item.price}</span> 元/月
        </div>
      </div>
    </div>
  )
}
