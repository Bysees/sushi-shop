import loader from '../../img/loader.gif'
import styles from './Loader.module.scss'

const Loader = () => (
  <div className={styles.loader}>
    <img src={loader} alt='loader' />
  </div>
)

export default Loader
