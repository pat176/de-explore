import { useEffect, useState } from "react";
import { ethers } from "ethers"

const User = (props) => {
  const [bal, setBalance] = useState(0)
  const [isAddFunds, setIsAddFunds] = useState(false)
  const [isWithdrawFunds, setIsWithdrawFunds] = useState(false)
  const [isTransferFunds, setIsTransferFunds] = useState(false)
  const [isAddBeneficiary, setIsAddBeneficiary] = useState(false)
  const [fundsForm, setFundsForm] = useState(0)
  const [withdrawForm, setWithdrawForm] = useState(0)
  const [transferForm, setTransferForm] = useState(0)
  const [transferAddress, setTransferAddress] = useState("")
  const [userName, setUserName] = useState("")
  const [pin, setPin] = useState("")
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
  const addBeneficiary = async (e) => {
    e.preventDefault()
    //string memory face, uint256 benType, string memory userName, string memory pin
    await props.contract.addBeneficiary("face", 2, userName, pin, { from: props.address }).then(txInit => {
      txInit.wait().then(res => {
        setIsAddBeneficiary(false)
        setPin("")
        setUserName("")
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
      {bal}
      
      <button onClick={() => setIsAddFunds(true)}>Deposit</button>
      <button onClick={() => setIsWithdrawFunds(true)}>Withdraw</button>
      <button onClick={() => setIsTransferFunds(true)}>Transfer</button>
      <button onClick={() => setIsAddBeneficiary(true)}>Add Beneficiary</button>
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
      {isAddBeneficiary && (
        <form onSubmit={addBeneficiary}>
          <input placeholder="Set username" value={userName} onChange={(e) => setUserName(e.target.value)} />
          <input type="number" placeholder="Set a pin" value={pin} onChange={(e) => setPin(e.target.value)} />
          <button type="submit">Confirm</button>
          <button onClick={() => setIsAddBeneficiary(false)}>Cancel</button>
        </form>
      )}
    </>
  )
}
export default User
