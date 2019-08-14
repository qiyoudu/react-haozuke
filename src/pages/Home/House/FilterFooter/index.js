import React from 'react'
import { Flex } from 'antd-mobile'
import styles from './index.module.scss'
import classnames from 'classnames'
import PropsType from 'prop-types'
class FilteFooter extends React.Component {
  // state = {
  //   buttonName: this.props.name
  // }
  static defaultProps = {
    buttonName1: '取消',
    onCancel: () => {}
  }
  static propTypes = {
    className: PropsType.string,
    buttonName: PropsType.string,
    onCancel: PropsType.func,
    onSave: PropsType.func
  }

  render() {
    // console.log(this.props.className)
    // console.log(this.props.onClear)

    return (
      <Flex
        className={classnames(styles['filter-footer'], this.props.className)}
      >
        {/* 取消按钮 */}
        <span onClick={this.props.onCancel} className={'btn cancel'}>
          {this.props.buttonName1}
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
