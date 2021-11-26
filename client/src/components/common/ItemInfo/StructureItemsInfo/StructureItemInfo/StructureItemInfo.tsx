import { FC } from 'react'
import styles from './StructureItemInfo.module.scss'

interface IProductItemStructure {
  title: string
  count: number
  className?: string
}

const StructureItemInfo: FC<IProductItemStructure> = ({
  className,
  title,
  count,
}) => {
  return (
    <div className={className + ' ' + styles.item}>
      <div className={styles.item__title}>{title}</div>
      <div className={styles.item__count}>{count}</div>
    </div>
  )
}

export default StructureItemInfo
