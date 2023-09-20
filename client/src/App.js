import './App.css';
import Home from "./pages/Home"
import { useState, useEffect } from 'react';
import Wallet from "./abi/Wallet.json"
import { ethers } from "ethers";
import User from './pages/User';
import Store from './pages/Store';

function App() {
  const [contract, setContract] = useState(null)
  const [address, setAddress] = useState(null)
  const [transactions, setTransactions] = useState(null)
  const fetch = async () => {
    if (!window.ethereum) return alert("Please install Binance Wallet.");

    const accounts = await window.ethereum.request({ method: "eth_accounts" });

    if (accounts.length) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      if ((await provider.getNetwork()).chainId === 97) {
        console.log(accounts[0])

        const signer = provider.getSigner();
        const walletContract = new ethers.Contract("0xf747eDC55FA99C4Cf3379b4C0E089EB1D410f8A1", Wallet.abi, signer)
        const transactions = await walletContract.getTransactions(accounts[0])
        console.log(transactions)
        setTransactions(transactions)
        console.log(walletContract)
        setContract(walletContract)
        setAddress(accounts[0])
      } else {
        console.log("Switch to bsc testnet with chain id 97")
      }
    } else {
      console.log("No accounts found");
    }
  }
  const connectWallet = async () => {
    try {
      if (!window.ethereum) return alert("Please install MetaMask.");

      const accounts = await window.ethereum.request({ method: "eth_requestAccounts", });
      const provider = new ethers.providers.Web3Provider(window.ethereum);

      if ((await provider.getNetwork()).chainId === 97) {
        console.log(accounts[0])

        const signer = provider.getSigner();
        const walletContract = new ethers.Contract("0xf747eDC55FA99C4Cf3379b4C0E089EB1D410f8A1", Wallet.abi, signer)
        console.log(walletContract)
        setContract(walletContract)
        setAddress(accounts[0])
        window.location.reload();
      } else {
        console.log("Switch to bsc testnet with chain id 97")
      }
    } catch (error) {
      console.log(error);

      throw new Error("No ethereum object");
    }
  };
  useEffect(() => {
    fetch()

  }, [])
  return (
    <div className="App">
      <Home connectWallet={connectWallet} />
      <User contract={contract} address={address} transactions={transactions} />
      <Store contract={contract} address={address} transactions={transactions} />
    </div>
  );
}

export default App;
