import { useMediaQuery } from '@material-ui/core'
import { NavLink } from 'react-router-dom'
import ButtonOrder from '../../common/ButtonOrder'
import styles from './BasketBlank.module.scss'

const BasketBlank = () => {
  const isWidth768 = useMediaQuery('(min-width: 769px)')

  return (
    <div className={styles.blank}>
      <div className={styles.blank__title}>Ваша корзина пока пуста</div>
      <NavLink to='/' className={styles.blank__btn}>
        <ButtonOrder big={isWidth768}>Перейти к меню</ButtonOrder>
      </NavLink>
    </div>
  )
}

export default BasketBlank
