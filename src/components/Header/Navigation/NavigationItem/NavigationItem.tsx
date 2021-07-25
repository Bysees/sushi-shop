import { FC } from 'react'
import { NavLink } from 'react-router-dom'
import styles from './NavigationItem.module.scss'

export interface INavigationItem {
  path: string
  title: string
  className?: string
}
const NavigationItem: FC<INavigationItem> = ({ className, path, title }) => {
  return (
    <li className={className}>
      <NavLink
        activeClassName={styles.item__link_active}
        className={styles.item__link}
        to={path}>
        {title}
      </NavLink>
    </li>
  )
}

export default NavigationItem
