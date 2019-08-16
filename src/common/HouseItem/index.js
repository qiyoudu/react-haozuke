import React from 'react' //支持jsx
import styles from './index.module.scss'
// 使用函数组件 没有自己的数据
import { BASE_URL } from '../../utils/index'
export default function HouseItem({ e, style = {} }) {
  // console.log(e)

  return (
    <div className={styles.house} style={{ ...style }}>
      <div className="imgWrap">
        <img className="img" src={`${BASE_URL}${e.houseImg}`} alt="" />
      </div>
      <div className="content">
        <h3 className="title">{e.title}</h3>
        <div className="desc">{e.desc}</div>
        <div>
          {e.tags.map((e, index) => {
            return (
              <span key={e} className={`tag tag${index + 1}`}>
                {e}
              </span>
            )
          })}
        </div>
        <div className="price">
          <span className="priceNum">{e.price}</span> 元/月
        </div>
      </div>
    </div>
  )
}
