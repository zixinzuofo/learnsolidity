const Web3 = require('web3');
const web3 = new Web3();

const address = "0x09A1b38382fc2aB8F45660BfB90A67dA6E957035";
const checksumAddress = web3.utils.toChecksumAddress(address);

console.log(checksumAddress);