import React from 'react'
import { NavLink } from 'react-router-dom'
import ButtonOrder from '../../common/ButtonOrder'
import styles from './BasketBlank.module.scss'

const BasketBlank = () => (
  <div className={styles.basket}>
    <div className={styles.basket__title}>Ваша корзина пока пуста</div>
    <NavLink to='/' className={styles.basket__btn}>
      <ButtonOrder big>Перейти к меню</ButtonOrder>
    </NavLink>
  </div>
)

export default BasketBlank
