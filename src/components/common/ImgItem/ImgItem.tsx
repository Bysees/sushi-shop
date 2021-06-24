import React, { FC } from 'react'
import styles from './ImgItem.module.scss'
import cn from 'classnames'

interface IImgItem {
  img: string
  className?: string
  orderedItemCount: number
  info?: boolean
}

const ImgItem: FC<IImgItem> = ({
  className,
  img,
  orderedItemCount,
  info = false,
}) => {
  const isShowHintInfo = !orderedItemCount && !info

  return (
    <div className={cn(className, styles.item)}>
      {isShowHintInfo && (
        <span className={cn(styles.item__hint, styles.item__hint_info)}></span>
      )}
      {orderedItemCount > 0 && (
        <span className={cn(styles.item__hint, styles.item__hint_added)}>
          <span
            className={cn(
              styles['item__hint-title'],
              info && styles['item__hint-title_big']
            )}>
            Добавлено {orderedItemCount} в корзину
          </span>
        </span>
      )}
      <img className={styles.item__img} src={img} alt='sushi' />
    </div>
  )
}

export default ImgItem
