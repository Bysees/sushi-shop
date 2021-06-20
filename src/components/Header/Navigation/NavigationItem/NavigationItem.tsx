import { FC } from 'react'
import { NavLink } from 'react-router-dom'

export interface INavigationItem {
  path: string
  title: string
  className?: string
}
const NavigationItem: FC<INavigationItem> = ({ className, path, title }) => {
  return (
    <li className={className}>
      <NavLink to={path}>{title}</NavLink>
    </li>
  )
}

export default NavigationItem
