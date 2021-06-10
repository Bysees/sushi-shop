import React, { FC } from 'react'
import styles from './ImgItem.module.scss'

interface IImgItem {
  isAdded: boolean
  img: string
  className: string
}

const ImgItem: FC<IImgItem> = ({ className, isAdded, img }) => {
  return (
    <div className={className + ' ' + styles.item}>
      {!isAdded && (
        <span
          className={styles.item__hint + ' ' + styles.item__hint_info}></span>
      )}
      {isAdded && (
        <span className={styles.item__hint + ' ' + styles.item__hint_added}>
          <span className={styles.item__hint_title}>Добавлено 1 в корзину</span>
        </span>
      )}
      <img className={styles.item__img} src={img} alt='sushi-sake' />
    </div>
  )
}

export default ImgItem
