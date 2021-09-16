import React, { FC } from 'react'
import styles from './ImgItem.module.scss'
import cn from 'classnames'
import { useMediaQuery } from '@material-ui/core'

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
  const isWidth768 = useMediaQuery('(min-width:769px)')

  return (
    <div className={cn(className, styles.item)}>
      {isShowHintInfo && (
        <span className={cn(styles.item__hint, styles.item__hint_info)}></span>
      )}
      {orderedItemCount > 0 && (
        <span
          className={cn(
            styles.item__hint,
            styles.item__hint_added,
            info && styles['item__hint_added-big']
          )}>
          <span
            className={cn(
              styles['item__hint-title'],
              info && styles['item__hint-title_big']
            )}>
            Добавлено {orderedItemCount} {isWidth768 ? 'в корзину' : 'шт.'}
          </span>
        </span>
      )}
      <img className={styles.item__img} src={img} alt='sushi' />
    </div>
  )
}

export default ImgItem
