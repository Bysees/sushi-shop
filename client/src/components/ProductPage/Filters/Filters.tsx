import { FC, memo, useState } from 'react'
import List from '../../common/List'
import styles from './Filters.module.scss'
import cn from 'classnames'
import { useWrapObserv } from '../../../hooks/useWrapObserv'
import { useRefObject } from '../../../hooks/useRefObject'
import { labelsType } from '../../../store/types/productItems'

interface IFilters {
  className?: string
  getFiltredItems: (label: string) => void
  filtredLabels: labelsType[]
}

// const labels = ['new', 'hit', 'hot', 'vegan'] //? from server
// const labels = ['ВСЕ', 'ОСТРОЕ', 'НОВИНКА', 'ВЕГЕТАРИАНСКОЕ', 'ХИТ'] //? to UI

function getLabels(labels: labelsType[]) {
  interface Ilabel {
    ru: string
    eng: string
  }

  const labelsNames: Ilabel[] = [
    { ru: 'ВСЕ', eng: 'all' },
    { ru: 'ОСТРОЕ', eng: 'hot' },
    { ru: 'ХИТ', eng: 'hit' },
    { ru: 'НОВИНКА', eng: 'new' },
    { ru: 'ВЕГЕТАРИАНСКОЕ', eng: 'vegan' },
  ]

  const labelsOutput: Ilabel[] = [labelsNames[0]]

  labels.forEach((label) => {
    labelsNames.forEach((mocklabel) => {
      label === mocklabel.eng && labelsOutput.push(mocklabel)
    })
  })

  return labelsOutput
}

const Filters: FC<IFilters> = ({
  className,
  getFiltredItems,
  filtredLabels,
}) => {
  const [activeBtn, setActiveBtn] = useState<string | null>(null)
  const btnRef = useRefObject<HTMLButtonElement>()
  const isDescripWrapped = useWrapObserv(btnRef.current, 768)
  const labels = getLabels(filtredLabels)

  const onFilterHandler = (label: string) => {
    getFiltredItems(label)
    setActiveBtn(label)
  }

  return (
    <nav className={className}>
      <List
        className={cn(styles.list, isDescripWrapped && styles.list_wrap)}
        items={labels}
        renderItem={(label) => {
          let labelNameRu = label.ru
          if (labelNameRu === 'ВЕГЕТАРИАНСКОЕ' && isDescripWrapped) {
            labelNameRu = 'ВЕГАН'
          }
          return (
            <li
              key={label.eng}
              className={cn(
                styles.list__item,
                styles.filter,
                isDescripWrapped && styles.filter_wrap
              )}>
              <button
                ref={btnRef}
                onClick={() => onFilterHandler(label.eng)}
                className={cn(
                  styles.filter__btn,
                  isDescripWrapped && styles.filter__btn_wrap
                )}
                disabled={label.eng === activeBtn}>
                <span
                  className={cn(
                    styles.filter__label,
                    isDescripWrapped && styles.filter__label_wrap,
                    styles[`filter__label_${label.eng}`]
                  )}></span>
                <span
                  className={cn(
                    styles.filter__description,
                    isDescripWrapped && styles.filter__description_wrap,
                    label.eng === activeBtn && styles.filter__description_active
                  )}>
                  {labelNameRu}
                </span>
              </button>
            </li>
          )
        }}
      />
    </nav>
  )
}

export default memo(Filters)
