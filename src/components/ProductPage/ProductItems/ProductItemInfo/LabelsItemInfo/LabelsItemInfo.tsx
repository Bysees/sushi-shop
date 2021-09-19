import { FC } from 'react'
import styles from './LabelsItemInfo.module.scss'
import cn from 'classnames'
import { labelsType } from '../../../../../store/types/productItems'

interface ILabelsItemInfo {
  labels: labelsType[]
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
