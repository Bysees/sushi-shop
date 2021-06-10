import { FC } from 'react'
import List from '../List'
import styles from './Navigation.module.scss'
import NavigationItem, { INavigationItem } from './NavigationItem'

const navLinks: INavigationItem[] = [
  { path: '/', title: 'Главная' },
  { path: '/', title: 'Меню' },
  { path: '/', title: 'Акции' },
]

interface INavigation {
  className: string
}

const Navigation: FC<INavigation> = ({ className }) => {
  return (
    <nav className={className}>
      <List
        className={styles.list}
        items={navLinks}
        renderItem={(link) => (
          <NavigationItem
            className={styles.list__item}
            key={link.title}
            path={link.path}
            title={link.title}
          />
        )}
      />
    </nav>
  )
}

export default Navigation
