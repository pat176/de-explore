// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "@openzeppelin/contracts/utils/Counters.sol";

contract Wallet {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenId;
    mapping(address => uint256) balances;
    address payable owner;
    struct Transaction {
        uint256 amount;
        uint256 id;
        address payable from;
        address payable to;
        string txnType;
    }
    mapping(uint256 => Transaction) transactions;
    mapping(address => mapping(string=>bool)) beneficiaries;
    mapping(address => Transaction[]) userTxns;

    function depositEther(uint256 num) external payable{
        transactions[_tokenId.current()] = Transaction(
            num,
            _tokenId.current(),
            payable(msg.sender),
            payable(msg.sender),
            "deposit"
        );
        userTxns[msg.sender].push(transactions[_tokenId.current()]);
        balances[msg.sender] += num;
        _tokenId.increment();

    }
    function withdrawEther(uint256 amount) external{
        require(amount <= balances[msg.sender], "Insufficient Balance");
        transactions[_tokenId.current()] = Transaction(
            amount,
            _tokenId.current(),
            payable(msg.sender),
            payable(msg.sender),
            "withdraw"
        );
        userTxns[msg.sender].push(transactions[_tokenId.current()]);
        balances[msg.sender] -= amount;
        payable(msg.sender).transfer(amount);
        _tokenId.increment();

    }
    function executeTransaction(uint256 amount, string memory face, address from) external {
        require(beneficiaries[from][face] == true, "No account found for the faceID");
        require(amount <= balances[from], "Amount exceeds balance");
        require(msg.sender != from, "Cannot send to yourself");
        transactions[_tokenId.current()] = Transaction(
            amount,
            _tokenId.current(),
            payable(from),
            payable(msg.sender),
            "execute"
        );
        userTxns[msg.sender].push(transactions[_tokenId.current()]);
        userTxns[from].push(transactions[_tokenId.current()]);
        balances[msg.sender] += amount;
        balances[from] -= amount;
        _tokenId.increment();
    }

    function addBeneficiary(string memory face) external  {
        beneficiaries[msg.sender][face] = true;
    }

    function appTransfer(address payable to, uint256 amount) external {
        require(amount <= balances[msg.sender], "Amount exceeds balance");
        require(msg.sender != to, "Cannot send to yourself");

        transactions[_tokenId.current()] = Transaction(
            amount,
            _tokenId.current(),
            payable(msg.sender),
            payable(to),
            "appTransfer"
        );
        userTxns[msg.sender].push(transactions[_tokenId.current()]);
        userTxns[to].push(transactions[_tokenId.current()]);
        balances[msg.sender] -= amount;
        balances[to] += amount;
        _tokenId.increment();

    }

    function transferFunds(address payable to, uint256 amount) external {
        require(amount <= balances[msg.sender], "Amount exceeds balance");
        require(msg.sender != to, "Cannot send to yourself");
        transactions[_tokenId.current()] = Transaction(
            amount,
            _tokenId.current(),
            payable(msg.sender),
            payable(to),
            "transfer"
        );
        userTxns[msg.sender].push(transactions[_tokenId.current()]);
        userTxns[to].push(transactions[_tokenId.current()]);
        balances[msg.sender] -= amount;
        to.transfer(amount);
        _tokenId.increment();
    }

    function getTransactions(address user) public view returns(Transaction[] memory) {
        return userTxns[user];
    }

    function getBalance(address user) public view returns(uint256) {
        return balances[user];
    }

    constructor() payable {
        owner = payable(msg.sender);
    }
}