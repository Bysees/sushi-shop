import Cart from './Cart'
import Navigation from './Navigation'
import styles from './Header.module.scss'
import { FC } from 'react'

interface IHeader {
  className: string
}

const Header: FC<IHeader> = ({ className }) => {
  return (
    <header className={className + ' ' + styles.header}>
      <Navigation className={styles.header__navigation} />
      <Cart className={styles.header__basket} />
    </header>
  )
}

export default Header
