import Cart from './Cart/Cart'
import Navigation from './Navigation/Navigation'
import styles from './Header.module.scss'
import { FC } from 'react'

interface IHeader {
  className?: string
}

const Header: FC<IHeader> = ({ className }) => {
  return (
    <header className={className + ' ' + styles.header}>
      <div className={styles.header__wrapper}>
        <Navigation className={styles.header__navigation} />
        <Cart className={styles.header__basket} />
      </div>
    </header>
  )
}

export default Header
