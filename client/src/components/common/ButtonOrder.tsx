import React, { FC } from 'react'
import styles from './ButtonOrder.module.scss'
import cn from 'classnames'

interface IButtonOrder {
  big?: boolean
}

const ButtonOrder: FC<IButtonOrder> = ({ children, big }) => {
  return (
    <button className={cn(styles.btn, big && styles.btn_big)}>
      {children}
    </button>
  )
}

export default ButtonOrder
