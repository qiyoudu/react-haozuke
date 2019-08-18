import React from 'react' //支持jsx
import styles from './index.module.scss'
// 使用函数组件 没有自己的数据
import { BASE_URL } from '../../utils/index'
import { withRouter } from 'react-router-dom'
function HouseItem({ e, style = {}, history }) {
  // console.log(e)
  // console.log(this)
  // console.log(history)

  // handleClick = () => {
  //   console.log(1)
  // }
  // 注意函数组件和类组件 的区别 不用this指向内部函数!
  return (
    <div
      onClick={() => history.push(`/detail/${e.houseCode}`)}
      className={styles.house}
      style={{ ...style }}
    >
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
// 被withRouter处理过后 有了路由信息
export default withRouter(HouseItem)
