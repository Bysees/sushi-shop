import React from 'react'
import styles from './Rouble.module.scss'

const Rouble = React.memo(() => {
  return <span className={styles.rouble}>Р</span>
})

export default Rouble
