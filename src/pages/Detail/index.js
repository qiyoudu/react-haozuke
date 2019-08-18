import React, { Component } from 'react'
import { API, BASE_URL } from '../../utils'
import styles from './index.module.scss'
import classnames from 'classnames'
// 导入头部组件
import NavHeader from '../../common/NavHeader'
import { Carousel, Flex } from 'antd-mobile'
// community: "绿谷康都"
// coord: {latitude: "20.002958", longitude: "110.30967"}
// description: ""
// floor: "高楼层"
// houseCode: "5cc44ed41439630e5b3d5f20"
// houseImg: (8) ["/newImg/7bi0g5b11.jpg", "/newImg/7bl0kfheh.jpg", "/newImg/7bjpn9l2p.jpg", "/newImg/7bid08njc.jpg", "/newImg/7bj1j8m18.jpg", "/newImg/7bi51df13.jpg", "/newImg/7bkh2dm60.jpg", "/newImg/7bl2i6ni0.jpg"]
// oriented: ["西南"]
// price: 2800
// roomType: "二室"
// size: 77
// supporting: []
// tags: ["随时看房"]
// title: "绿谷康都 2室2厅 2800元"
// __proto__: Object
// description: "请求成功"
// status: 200

export default class index extends Component {
  state = {
    houseInfo: '',
    isLoaded: false
  }
  async componentDidMount() {
    const id = this.props.match.params.id
    const res = await API.get(`houses/${id}`)
    if (res.status === 200) {
      this.setState({
        houseInfo: res.body,
        // 设置加载状态 解决轮播图报错
        isLoaded: true
      })
    }
  }
  renderTags = tags => {
    return tags.map((item, index) => {
      let tagClass = ''
      if (index > 2) {
        tagClass = 'tag3'
      } else {
        tagClass = 'tag' + (index + 1)
      }

      return (
        <div className={classnames('tag', tagClass)} key={item}>
          {item}
        </div>
      )
    })
  }
  render() {
    // 设置默认值 解决报错问题
    const {
      community = '',
      houseImg = [],
      title,
      tags = [],
      price,
      roomType,
      size,
      floor
    } = this.state.houseInfo
    return (
      <div className={classnames(styles.detail)}>
        <NavHeader
          rightContent={[<i key="share" className="iconfont icon-share" />]}
        >
          {community}
        </NavHeader>
        {/* 使用轮播图 */}
        <div className="slides">
          {this.state.isLoaded && (
            <Carousel autoplay infinite>
              {houseImg.map(item => (
                <a href="http://www.alipay.com" key={item}>
                  <img src={`${BASE_URL}${item}`} alt="" />
                </a>
              ))}
            </Carousel>
          )}
        </div>
        {/* 房屋基础信息 Flex组件上支持className*/}
        <div className="info">
          <h3 className="infoTitle">{title}</h3>
          <Flex className="tags">
            <Flex.Item>{this.renderTags(tags)}</Flex.Item>
          </Flex>
        </div>
      </div>
    )
  }
}
