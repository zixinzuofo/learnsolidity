const Web3 = require('web3');
const web3 = new Web3(window.ethereum);

// 检查MetaMask是否安装和用户是否登录
if (window.ethereum) {
    console.log('MetaMask is installed!');
} else {
    console.log('Please install MetaMask!');
}

web3.eth.requestAccounts().then((accounts) => {
    console.log('Connected to MetaMask:', accounts[0]);
});

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
];
const userCount = '0x09A1b38382fc2aB8F45660BfB90A67dA6E957036';
const contractAddress = '0x881b80503e7F03E928d432A1d6E380e5640E55A0';
const contract = new web3.eth.Contract(contractABI, contractAddress);
const amountToDeposit = web3.utils.toWei('0.1', 'ether'); // 存款0.1 ETH

contract.methods.deposit().send({
    from: userCount, // 发送者的地址
    value: amountToDeposit, // 发送的金额
    gas: 200000 // 可能需要调整Gas限制
}).then((receipt) => {
    console.log('Transaction receipt:', receipt);
}).catch((error) => {
    console.error('Error:', error);
});