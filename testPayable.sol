// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract TestPayable {
    mapping(address => uint) public deposits;
    address private owner;
    event Received(address sender, uint amount);
    event Withdrawn(address sender, uint amount);
    event Deposit(address indexed from, uint value);

    // 构造函数，用于初始化合约
    constructor() payable {
        owner = msg.sender; // 设置合约所有者为部署者
    }

    // 特殊函数，用于接收以太币
    receive() external payable {
        deposits[msg.sender] += msg.value;
        emit Received(msg.sender, msg.value);
    }

    // 函数，允许外部账户向合约发送 ETH
    function deposit() public payable {
        deposits[msg.sender] += msg.value;
        emit Deposit(msg.sender, msg.value);
    }

    // 函数，允许合约所有者提取 ETH
    function withdraw(uint amount) external {
        require(msg.sender == owner, "Only contract owner can withdraw"); // 只有所有者可以提取
        require(address(this).balance >= amount, "Insufficient balance");

        // 将 ETH 发送到合约所有者的地址
        (bool sent, ) = owner.call{value: amount}("");
        require(sent, "Failed to send Ether");

        // 触发 Withdrawn 事件
        emit Withdrawn(owner, amount);
    }
}