import { FC, useState } from 'react'
import List from '../../List'
import styles from './Filters.module.scss'
import cn from 'classnames'

interface IFilters {
  className: string
}

const labels = ['ВСЕ', 'ОСТРОЕ', 'НОВИНКА', 'ВЕГЕТАРИАНСКОЕ', 'ХИТ']

const Filters: FC<IFilters> = ({ className }) => {
  const [activeBtn, setActiveBtn] = useState<string>()

  return (
    <nav className={className}>
      <List
        className={styles.list}
        items={labels}
        renderItem={(label) => (
          <li key={label} className={styles.list__item + ' ' + styles.filter}>
            <button
              onClick={() => setActiveBtn(label)}
              className={styles.filter__btn}>
              <span
                className={cn(
                  [styles.filter__label],
                  label === 'ВСЕ' && [styles.filter__label_all],
                  label === 'ОСТРОЕ' && [styles.filter__label_hot],
                  label === 'НОВИНКА' && [styles.filter__label_new],
                  label === 'ХИТ' && [styles.filter__label_hit],
                  label === 'ВЕГЕТАРИАНСКОЕ' && [styles.filter__label_vegan]
                )}></span>
              <span
                className={cn(
                  [styles.filter__description],
                  activeBtn === label && [styles.filter__description_active]
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

export default Filters
