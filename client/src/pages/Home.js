// App.js

import React, { useEffect } from 'react'
import { ethers } from "ethers"
import { render } from 'react-dom'

function App() {
  useEffect(() => {
    const Connect = async () => {
      await window.ethereum.send("eth_requestAccounts");
      const provider = await new ethers.providers.Web3Provider(window.ethereum);
      const signer = await provider.getSigner();

      console.log(signer);
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