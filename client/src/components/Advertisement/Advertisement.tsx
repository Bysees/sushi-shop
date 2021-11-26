import styles from './Advertisement.module.scss'
import Applications from './Applications/Applications'
import Contacts from './Contacts/Contacts'
import AdvertLinks from './AdvertLinks/AdvertLinks'
import AdvertAppImg from './AdvertAppImg/AdvertAppImg'
import { MouseEvent } from 'react'

const Advertisement = () => {
  //! Временный preventDefault, чтобы ссылки не перезагружали страницу...
  const temproraryDefault = (e: MouseEvent<HTMLDivElement>) => {
    e.preventDefault()
  }

  return (
    <div className={styles.wrapper} onClick={temproraryDefault}>
      <AdvertLinks className={styles.column} />
      <Contacts className={styles.column} />
      <Applications className={styles.column} />
      <AdvertAppImg className={styles.column} />
    </div>
  )
}

export default Advertisement
