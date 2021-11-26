import { FC } from 'react'
import styles from './Footer.module.scss'

interface IFooter {
  className: string
}

const Footer: FC<IFooter> = ({ className }) => {
  return <div className={className + ' ' + styles.footer}>FOOTER</div>
}

export default Footer
