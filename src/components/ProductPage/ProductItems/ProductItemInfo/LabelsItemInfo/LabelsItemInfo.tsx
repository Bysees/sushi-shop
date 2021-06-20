import { FC } from 'react'
import styles from './LabelsItemInfo.module.scss'
import cn from 'classnames'

interface ILabelsItemInfo {
  labels: string[]
  className?: string
}

const LabelsItemInfo: FC<ILabelsItemInfo> = ({ labels, className }) => {
  return (
    <div className={className}>
      {labels.map((label) => (
        <span
          key={label}
          className={cn(
            styles.label,
            label === 'vegan' && styles.label__vegan,
            label === 'hot' && styles.label__hot,
            label === 'hit' && styles.label__hit,
            label === 'new' && styles.label__new
          )}></span>
      ))}
    </div>
  )
}

export default LabelsItemInfo
