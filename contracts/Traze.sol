// SPDX-License-Identifier: MIT License
pragma solidity ^0.8.24;

contract Traze {

    address public  owner;

    constructor(){
        owner = msg.sender;
    }

    function fundAccount (address _user_addr, uint256 amount) public pure returns (string memory) {
        require(_user_addr != address(0), "invalid Addess");
        require(amount < 0 ether, "amount is not valid");
        return "account funded successfully!";
    }

}