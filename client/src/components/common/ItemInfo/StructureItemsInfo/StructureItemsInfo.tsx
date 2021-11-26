import React, { FC } from 'react'
import styles from './StructureItemsInfo.module.scss'
import StructureItemInfo from './StructureItemInfo/StructureItemInfo'
import { IDataItemStructure } from '../../../../store/types/productItems'

interface IItemStructureInfo {
  structure: IDataItemStructure
  className?: string
}

const StructureItemsInfo: FC<IItemStructureInfo> = ({
  structure,
  className,
}) => {
  return (
    <div className={className + ' ' + styles.structures}>
      <div className={styles.structures__weight}>{structure.weight} г.</div>
      <div className={styles.structures__items}>
        <StructureItemInfo
          className={styles.structures__item}
          title={'Kcal'}
          count={structure.calorie}
        />
        <StructureItemInfo
          className={styles.structures__item}
          title={'Б'}
          count={structure.protein}
        />
        <StructureItemInfo
          className={styles.structures__item}
          title={'Ж'}
          count={structure.fat}
        />
        <StructureItemInfo
          className={styles.structures__item}
          title={'У'}
          count={structure.carbohydrates}
        />
      </div>
    </div>
  )
}

export default StructureItemsInfo
