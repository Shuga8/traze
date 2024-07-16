// SPDX-License-Identifier: MIT License
pragma solidity ^0.8.24;

contract Traze {

    address payable owner;

    constructor(address _addr){
        owner = payable(_addr);
    }

    function fundAccount (address _user_addr) public pure  returns (bool) {
        
    }

}