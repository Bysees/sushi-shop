import { FC } from 'react'
import styles from './AdvertAppImg.module.scss'
import phoneImg from '../../../img/app/moqup.png'

interface IAdvertAppImg {
  className?: string
}

const AdvertAppImg: FC<IAdvertAppImg> = ({ className }) => {
  return (
    <div className={className}>
      <div className={styles['img-wrapper']}>
        <img src={phoneImg} alt='smartphone' />
      </div>
    </div>
  )
}

export default AdvertAppImg
