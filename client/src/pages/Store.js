import { useEffect, useState } from "react";
import { ethers } from "ethers"
import 'boxicons'
import styles from '../styles/Store.module.css'

const Store = (props) => {
  const [bal, setBalance] = useState(0)
  const [isAddFunds, setIsAddFunds] = useState(false)
  const [isWithdrawFunds, setIsWithdrawFunds] = useState(false)
  const [isTransferFunds, setIsTransferFunds] = useState(false)
  const [isAddTxn, setIsAddTxn] = useState(false)
  const [fundsForm, setFundsForm] = useState(0)
  const [withdrawForm, setWithdrawForm] = useState(0)
  const [transferForm, setTransferForm] = useState(0)
  const [txnForm, setTxnForm] = useState(0)
  const [pin, setPin] = useState(false)
  const [transferAddress, setTransferAddress] = useState("")
  const [userName, setUserName] = useState("")
  const [pinCode, setPinCode] = useState("")
  const getBalance = async () => {
    const balance = await props.contract.getBalance();
    const numBalance = await ethers.utils.formatEther(balance)
    console.log(numBalance)
    setBalance(numBalance)
  }
  const addFunds = async (e) => {
    e.preventDefault()
    await props.contract.depositEther({ from: props.address, value: ethers.utils.parseUnits(`${fundsForm}`, 18) }).then(txInit => {
      txInit.wait().then(res => {
        setBalance(parseFloat(bal) + parseFloat(fundsForm))
        setIsAddFunds(false)
        setFundsForm(0)
      })
    })
  }
  const withdrawFunds = async (e) => {
    e.preventDefault()
    await props.contract.withdrawEther(ethers.utils.parseUnits(`${withdrawForm}`, 18), { from: props.address }).then(txInit => {
      txInit.wait().then(res => {
        setBalance(parseFloat(bal) - parseFloat(withdrawForm))
        setIsWithdrawFunds(false)
        setWithdrawForm(0)
      })
    })
  }
  const transferFunds = async (e) => {
    e.preventDefault()
    await props.contract.appTransfer(transferAddress, ethers.utils.parseUnits(`${transferForm}`, 18), { from: props.address }).then(txInit => {
      txInit.wait().then(res => {
        setBalance(parseFloat(bal) - parseFloat(transferForm))
        setIsTransferFunds(false)
        setTransferForm(0)
        setTransferAddress("")
      })
    })
  }

  const addTxn = async (e) => {
    //uint256 amount, string memory face, address from, string memory userName, string memory pin, uint256 benType
    await props.contract.executeTransaction(ethers.utils.parseUnits(`${txnForm}`, 18), "face", props.address, userName, pinCode, 2, { from: props.address }).then(txInit => {
      txInit.wait().then(res => {
        setBalance(parseFloat(bal) + parseFloat(txnForm))
        setIsAddTxn(false)
        setTxnForm(0)
        setUserName("")
        setPin(false)
        setPinCode("")
      })
    })
  }


  useEffect(() => {
    if (props.contract !== null) {
      getBalance()
    }
  }, [props.contract])
  return (
    <>
       <div className={styles.top}>
          <h1>Dashboard</h1>
          <box-icon name='store-alt' color="rgba(222, 242, 255, 1)"></box-icon>
      </div>
      <div className={styles.balance}>
        <h2>Avaialable Balance</h2>
        <h1>BNB {bal}</h1>
    </div>
    <div className={styles.bttns}>
          <button className={styles.btn_trnsc} onClick={() => setIsAddTxn(true)}>ADD TRANSACTION</button>
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
    <div className={styles.bttns2}>
          <button className={styles.btn_dep} onClick={() => setIsAddFunds(true)}>DEPOSIT</button>
          <button className={styles.btn_wid} onClick={() => setIsWithdrawFunds(true)}>WITHDRAW</button>
          <button className={styles.btn_trnsf} onClick={() => setIsTransferFunds(true)}>TRANSFER</button>
        </div>
      {isAddFunds && (
        <form onSubmit={addFunds}>
          <input type="number" placeholder="enter the amount" onChange={(e) => setFundsForm(e.target.value)} value={fundsForm} />
          <button type="submit">Add</button>
        </form>
      )}
      {isWithdrawFunds && (
        <form onSubmit={withdrawFunds}>
          <input type="number" placeholder="Enter the amount that you'd like to withdraw" value={withdrawForm} onChange={(e) => setWithdrawForm(e.target.value)} />
          <button type="submit">Confirm</button>
          <button onClick={() => setIsWithdrawFunds(false)}>Cancel</button>
        </form>
      )}
      {isTransferFunds && (
        <form onSubmit={transferFunds}>
          <input type="number" placeholder="Enter the amount that you'd like to transfer" value={transferForm} onChange={(e) => setTransferForm(e.target.value)} />
          <input placeholder="Enter the receiver's address" value={transferAddress} onChange={(e) => setTransferAddress(e.target.value)} />
          <button type="submit">Confirm</button>
          <button onClick={() => setIsTransferFunds(false)}>Cancel</button>
        </form>
      )}
      {isAddTxn && (
        <form onSubmit={addTxn}>
          <input type="number" placeholder="Enter the bill amount" value={txnForm} onChange={(e) => setTxnForm(e.target.value)} />
          <button onClick={() => setPin(true)}>Confirm Using Username and Pin</button>
          {pin ? (
            <>
              <input placeholder="Username" value={userName} onChange={(e) => setUserName(e)} />
              <input placeholder="Pin" value={pinCode} onChange={(e) => setPinCode(e)} />
              <button type="submit">Submit</button>
            </>
          ): (
            <button onClick={() => setIsTransferFunds(false)}>Cancel</button>
          )}
        </form>
      )}
    </>
  )
}
export default Store
