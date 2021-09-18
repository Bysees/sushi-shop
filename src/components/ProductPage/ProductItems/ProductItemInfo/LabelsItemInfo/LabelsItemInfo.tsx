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
          className={cn(styles.label, styles[`label__${label}`])}></span>
      ))}
    </div>
  )
}

export default LabelsItemInfo
