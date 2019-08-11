import React from 'react'
import { Flex } from 'antd-mobile'
import styles from './index.module.scss'

class FilteFooter extends React.Component {
  render() {
    return (
      <Flex className={styles['filter-footer']}>
        {/* 取消按钮 */}
        <span className="btn cancel">取消</span>
        {/* 确定按钮 */}
        <span className="btn ok">确定</span>
      </Flex>
    )
  }
}
export default FilteFooter
