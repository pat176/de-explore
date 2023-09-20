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

      <h1>Recent Transactions</h1>
      <div className={styles.box}>

        <div className={styles.trnsc}>
          <h1>Groceries</h1>
          <h2>17 sept '23</h2>
          <h3>$5.54</h3>
        </div>

        <div className={styles.trnsc}>
          <h1>Groceries</h1>
          <h2>17 sept '23</h2>
          <h3>$5.54</h3>
        </div>

        <div className={styles.trnsc}>
          <h1>Groceries</h1>
          <h2>17 sept '23</h2>
          <h3>$5.54</h3>
        </div>

      </div>

    </div>

    <div className={styles.bttns}>
          <button className={styles.btn_dep}>DEPOSIT</button>
          <button className={styles.btn_wid}>WITHDRAW</button>
          <button className={styles.btn_trnsf}>TRANSFER</button>
        </div>
    <button className={styles.add_benef}>ADD BENEFICIARY</button>
    </>
  )
}
export default User