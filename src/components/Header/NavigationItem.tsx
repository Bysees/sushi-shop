import { FC } from 'react'

export interface INavigationItem {
  path: string
  title: string
  className?: string
}
const NavigationItem: FC<INavigationItem> = ({ className, path, title }) => {
  return (
    <li className={className}>
      <a href={path}>{title}</a>
    </li>
  )
}

export default NavigationItem
