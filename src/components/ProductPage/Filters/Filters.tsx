import { FC, memo, useState } from 'react'
import List from '../../common/List'
import styles from './Filters.module.scss'
import cn from 'classnames'
import { useWrapObserv } from '../../../hooks/useWrapObserv'
import { useRefObject } from '../../../hooks/useRefObject'
import { labelNames } from '../ProductPage'

interface IFilters {
  className?: string
  getFiltredItems: (label: string) => void
  filtredLabels: string[]
}

// const labels = ['new', 'hit', 'hot', 'vegan'] //? from server
// const labels = ['ВСЕ', 'ОСТРОЕ', 'НОВИНКА', 'ВЕГЕТАРИАНСКОЕ', 'ХИТ'] //? to UI

function getLabels(filtredLabels: string[], isLowSize: boolean): string[] {
  const labels: string[] = ['ВСЕ']
  filtredLabels.forEach((label) => {
    if (label === 'new') labels.push(labelNames.new)
    if (label === 'hot') labels.push(labelNames.hot)
    if (label === 'hit') labels.push(labelNames.hit)
    if (label === 'vegan') {
      labels.push(isLowSize ? labelNames.veganSmall : labelNames.veganLong)
    }
  })
  return labels
}

const Filters: FC<IFilters> = ({
  className,
  getFiltredItems,
  filtredLabels,
}) => {
  const [activeBtn, setActiveBtn] = useState<string | null>(null)
  const btnRef = useRefObject<HTMLButtonElement>()
  const isDescripWrapped = useWrapObserv(btnRef.current, 768)
  const labels = getLabels(filtredLabels, isDescripWrapped)

  const onFilterHandler = (label: string) => {
    getFiltredItems(label)
    setActiveBtn(label)
  }

  return (
    <nav className={className}>
      <List
        className={cn(styles.list, isDescripWrapped && styles.list_wrap)}
        items={labels}
        renderItem={(label) => (
          <li
            key={label}
            className={cn(
              styles.list__item,
              styles.filter,
              isDescripWrapped && styles.filter_wrap
            )}>
            <button
              ref={btnRef}
              onClick={() => onFilterHandler(label)}
              className={cn(
                styles.filter__btn,
                isDescripWrapped && styles.filter__btn_wrap
              )}
              disabled={label === activeBtn}>
              <span
                className={cn(
                  styles.filter__label,
                  isDescripWrapped && styles.filter__label_wrap,
                  label === labelNames.all && styles.filter__label_all,
                  label === labelNames.hot && styles.filter__label_hot,
                  label === labelNames.new && styles.filter__label_new,
                  label === labelNames.hit && styles.filter__label_hit,
                  (label === labelNames.veganLong ||
                    label === labelNames.veganSmall) &&
                    styles.filter__label_vegan
                )}></span>
              <span
                className={cn(
                  styles.filter__description,
                  isDescripWrapped && styles.filter__description_wrap,
                  activeBtn === label && styles.filter__description_active
                )}>
                {label}
              </span>
            </button>
          </li>
        )}
      />
    </nav>
  )
}

export default memo(Filters)
