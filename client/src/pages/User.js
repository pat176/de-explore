// App.js
import 'boxicons'
import styles from '../styles/User.module.css'
import React, { useEffect } from 'react'
import { render } from 'react-dom'


function User() {
  return (
    <>
    <div className={styles.top}>
        <h1>Dashboard</h1>
        <box-icon name='user' color='#DEF2FF'></box-icon>
    </div>
    <div className={styles.balance}>
        <h2>Avaialable Balance</h2>
        <h1>$99,634.65</h1>
    </div>

    <div className={styles.receipts}>
      
    </div>
    </>
  )
}
export default User