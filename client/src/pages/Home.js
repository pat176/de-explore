// App.js

import React, { useEffect } from 'react'
import { ethers } from "ethers"
import { render } from 'react-dom'

function App() {
  useEffect(() => {
    const Connect = async () => {
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const accounts = await provider.send("eth_requestAccounts", []);
      const contract = new ethers.Contract()
      console.log(accounts[0])
    }
    Connect()

  }, [])
  return (
    <>
    </>
  )
}

// Wrap everything in <UseWalletProvider />
export default App