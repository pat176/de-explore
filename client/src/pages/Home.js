// App.js
import 'boxicons'
import styles from '../styles/Home.module.css'
import React, { useEffect } from 'react'


function Home(props) {
  return (
    <>
      <div className={styles.wrapper}>
<div><video autoPlay muted src='Cinematic_Titles.mp4' className= {styles.vid_logo}></video></div>
<button className={styles.connect_btn} onClick={props.connectWallet}><box-icon type='solid' name='wallet-alt' className={styles.icon} color ='#DEF2FF'></box-icon>Connect To Wallet</button>
</div>
    </>
  )
}

// Wrap everything in <UseWalletProvider />
export default Home