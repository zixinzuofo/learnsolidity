// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Counter {
    uint counter;

    constructor() {
        counter = 0;
    }

    function mult() public {
        counter = counter * 2;
    }

    function get() public view returns (uint) {
        return counter;
    }
}