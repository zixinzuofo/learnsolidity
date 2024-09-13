const Web3 = require('web3');
const web3 = new Web3(new Web3.providers.HttpProvider('https://sepolia.infura.io/v3/3ac7ca3f67264178a99bce8673d58809'));

const contractABI = [
	{
		"inputs": [],
		"stateMutability": "payable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"indexed": false,                               
                               /**
                                * @description Withdraw a specified amount of Ether from the contract.
                                * @param amount The amount of Ether to withdraw.
                                * @return None
                                * @notice The withdrawal will be executed on the Ethereum network.
                                * @dev The `withdraw` function is a non-payable function, meaning it does not consume any gas.
                                */
				"internalType": "uint256",
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "Deposit",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "address",
				"name": "sender",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "Received",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "address",
				"name": "sender",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "Withdrawn",
		"type": "event"
	},
	{
		"inputs": [],
		"name": "deposit",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "deposits",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "withdraw",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"stateMutability": "payable",
		"type": "receive"
	}
]; // 合约ABI
const userCount = '0x09A1b38382fc2aB8F45660BfB90A67dA6E957036';
const contractAddress = '0x881b80503e7F03E928d432A1d6E380e5640E55A0';
const contract = new web3.eth.Contract(contractABI, contractAddress);
const amountToDeposit = web3.utils.toWei('0.01', 'ether'); // 存款0.1 ETH

contract.methods.deposit().send({
    from: userCount,
    value: amountToDeposit,
    gas: 21000, // 标准转账的Gas Limit
    gasPrice: '20000000000', // Gas Price，根据实际情况调整
}).then(function(receipt) {
    console.log("Transaction receipt:", receipt);
}).catch(function(error) {
    console.error("Error:", error);
});