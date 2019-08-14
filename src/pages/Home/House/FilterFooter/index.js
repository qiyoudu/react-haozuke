import React from 'react'
import { Flex } from 'antd-mobile'
import styles from './index.module.scss'
import classnames from 'classnames'
import PropsType from 'prop-types'
class FilteFooter extends React.Component {
  static propTypes = {
    className: PropsType.string
  }
  render() {
    // console.log(this.props.className)

    return (
      <Flex
        className={classnames(styles['filter-footer'], this.props.className)}
      >
        {/* 取消按钮 */}
        <span onClick={this.props.onCancel} className={'btn cancel'}>
          取消
        </span>
        {/* 确定按钮 点击的时候window调用这个函数*/}
        <span onClick={this.props.onSave} className="btn ok">
          确定
        </span>
      </Flex>
    )
  }
}
export default FilteFooter
