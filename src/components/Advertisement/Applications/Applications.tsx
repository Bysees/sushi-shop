import { FC } from 'react'
import styles from './Applications.module.scss'
import appStore from '../../../img/app/app_store.png'
import googlePlay from '../../../img/app/google_play.png'
import appGallery from '../../../img/app/app_gallery.png'

interface IApplications {
  className?: string
}

const Applications: FC<IApplications> = ({ className }) => {
  return (
    <ul className={className}>
      <div className={styles.item__title}>
        Мобильное <br /> приложение
      </div>
      <a href='/#' className={styles.item__label}>
        <img src={appStore} alt='App store' />
      </a>
      <a href='/#' className={styles.item__label}>
        <img src={googlePlay} alt='Google play' />
      </a>
      <a href='/#' className={styles.item__label}>
        <img src={appGallery} alt='App gallery' />
      </a>
    </ul>
  )
}

export default Applications
