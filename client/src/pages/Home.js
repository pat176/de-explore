// App.js

import React, { useEffect } from 'react'


function Home(props) {
  return (
    <>
      <button onClick={props.connectWallet}>Connect Wallet</button>
    </>
  )
}

// Wrap everything in <UseWalletProvider />
export default Home