// - 封装 Sticky 组件。
// - 在 HouseList 页面中，导入 Sticky 组件。
// - 使用 Sticky 组件包裹要实现吸顶功能的 Filter 组件。
// - 在 Sticky 组件中，创建两个 ref 对象（placeholder、content），分别指向占位元素和内容元素。
// - 组件中，监听浏览器的 scroll 事件（注意销毁事件）。
// - 在 scroll 事件中，通过 getBoundingClientRect() 方法得到筛选栏占位元素当前位置（top）。
// - 判断 top 是否小于 0（是否在可视区内）。
// - 如果小于，就添加需要吸顶样式（fixed），同时设置占位元素高度（与条件筛选栏高度相同）。
// - 否则，就移除吸顶样式，同时让占位元素高度为 0。
import React, { Component, createRef } from 'react'
import styles from './index.module.scss'
import PropTypes from 'prop-types'
export default class index extends Component {
  static propTypes = {
    size: PropTypes.number,
    children: PropTypes.element.isRequired
  }
  static defaultProps = {
    size: 40
  }
  constructor(props) {
    super(props)
    this.contentRef = createRef()
    this.placeHolderRef = createRef()
  }

  handleScroll = () => {
    // console.log('哈哈')
    const { top } = this.placeHolderRef.current.getBoundingClientRect()
    // console.log(top)
    // console.log(this.placeHolderRef.current.getBoundingClientRect())

    if (top <= 0) {
      // content就需要固定定位了
      this.contentRef.current.classList.add(styles.fixed)
      this.placeHolderRef.current.style.height = this.props.size + 'px'
    } else {
      // content不需要固定定位
      this.contentRef.current.classList.remove(styles.fixed)
      this.placeHolderRef.current.style.height = '0px'
    }
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll)
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll)
  }

  render() {
    return (
      <div className="sticky">
        {/* 占位 */}
        <div className="placeHolder" ref={this.placeHolderRef} />
        {/* 内容 */}
        <div className="content" ref={this.contentRef}>
          {this.props.children}
        </div>
      </div>
    )
  }
}
