import styles from './ItemInfo.module.scss'
import { FC } from 'react'
import LabelsItemInfo from './LabelsItemInfo/LabelsItemInfo'
import IngredientsItemsInfo from './IngredientsItemsInfo/IngredientsItemsInfo'
import StructureItemsInfo from './StructureItemsInfo/StructureItemsInfo'
import { getOrderedItemsCount } from '../../../store/reducers/basket'
import { useTypedSelector } from '../../../hooks/useTypedSelector'
import { IDataItem } from '../../../store/types/productItems'
import ImgItem from '../ImgItem/ImgItem'
import Rouble from '../Rouble'
import ButtonOrder from '../ButtonOrder'
import { addItem } from '../../../store/actions/basket'

interface IItemInfo extends IDataItem {
  className?: string
  removeItem: () => void
}

const ItemInfo: FC<IItemInfo> = ({
  id,
  img,
  labels,
  price,
  structure,
  title,
  removeItem,
}) => {
  const orderedItemCount = useTypedSelector((state) =>
    getOrderedItemsCount(state, id)
  )

  return (
    <div className={styles.item}>
      <ImgItem
        info
        className={styles.item__img}
        img={img}
        orderedItemCount={orderedItemCount}
      />
      <div className={styles.item__description}>
        <div className={styles.item__btnRemove}>
          <button onClick={removeItem}></button>
        </div>
        {!!labels.length && (
          <LabelsItemInfo className={styles.item__labels} labels={labels} />
        )}
        <div className={styles.item__title}>{title}</div>
        <IngredientsItemsInfo
          className={styles.item__ingredients}
          ingredients={structure.ingredients}
        />
        <StructureItemsInfo
          className={styles.item__structures}
          structure={structure}
        />
        <div className={styles.item__price}>
          {price} <Rouble />
        </div>
        <div
          onClick={() => addItem(id, price)}
          className={styles.item__btnOrder}>
          <ButtonOrder children={'Заказать'} big />
        </div>
      </div>
    </div>
  )
}

export default ItemInfo
