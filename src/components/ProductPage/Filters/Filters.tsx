import { FC, memo, useState } from 'react'
import List from '../../common/List'
import styles from './Filters.module.scss'
import cn from 'classnames'

interface IFilters {
  className?: string
  getFiltredItems: (label: string) => void
  filtredLabels: string[]
}

// const labels = ['new', 'hit', 'hot', 'vegan'] //? from server
// const labels = ['ВСЕ', 'ОСТРОЕ', 'НОВИНКА', 'ВЕГЕТАРИАНСКОЕ', 'ХИТ'] //? to UI

function getLabels(filtredLabels: string[]): string[] {
  const labels: string[] = ['ВСЕ']
  filtredLabels.forEach((label) => {
    if (label === 'new') labels.push('НОВИНКА')
    if (label === 'hot') labels.push('ОСТРОЕ')
    if (label === 'vegan') labels.push('ВЕГЕТАРИАНСКОЕ')
    if (label === 'hit') labels.push('ХИТ')
  })
  return labels
}

const Filters: FC<IFilters> = ({
  className,
  getFiltredItems,
  filtredLabels,
}) => {
  const [activeBtn, setActiveBtn] = useState<string | null>(null)
  const labels = getLabels(filtredLabels)

  const onFilterHandler = (label: string) => {
    getFiltredItems(label)
    setActiveBtn(label)
  }

  return (
    <nav className={className}>
      <List
        className={styles.list}
        items={labels}
        renderItem={(label) => (
          <li key={label} className={styles.list__item + ' ' + styles.filter}>
            <button
              onClick={() => onFilterHandler(label)}
              className={styles.filter__btn}
              disabled={label === activeBtn}>
              <span
                className={cn(
                  styles.filter__label,
                  label === 'ВСЕ' && styles.filter__label_all,
                  label === 'ОСТРОЕ' && styles.filter__label_hot,
                  label === 'НОВИНКА' && styles.filter__label_new,
                  label === 'ХИТ' && styles.filter__label_hit,
                  label === 'ВЕГЕТАРИАНСКОЕ' && styles.filter__label_vegan
                )}></span>
              <span
                className={cn(
                  styles.filter__description,
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
