import styles from './Spinner.module.scss'

const Spinner = () => {
  return (
    <div className={styles[`lds-spinner`]}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  )
}

export default Spinner
