// App.js
import 'boxicons'
import styles from '../styles/Home.module.css'
import React, { useEffect } from 'react'
// import { ethers } from "ethers"
import { render } from 'react-dom'


function Home() {
  // useEffect(() => {
  //   const Connect = async () => {
  //     const provider = new ethers.providers.Web3Provider(window.ethereum)
  //     const accounts = await provider.send("eth_requestAccounts", []);
  //     const contract = new ethers.Contract()
  //     console.log(accounts[0])
  //   }
  //   Connect()

  // }, [])
  return (
    <>

<div className={styles.wrapper}>
<div><video autoPlay muted src='Cinematic_Titles.mp4' className= {styles.vid_logo}></video></div>
<button className={styles.connect_btn}><box-icon type='solid' name='wallet-alt' className={styles.icon} color ='#DEF2FF'></box-icon>Connect To Wallet</button>
</div>

    </>
  )
}

// Wrap everything in <UseWalletProvider />
export default Home