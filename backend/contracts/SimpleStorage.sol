// SPDX-License-Identifier: MIT

pragma solidity ^0.8;

contract SimpleStorage{

    string private s_str;
    address private immutable i_owner;

    constructor(){
        i_owner = msg.sender;
    }

    modifier onlyOwner(){
        require(i_owner == msg.sender, "Only Owner can caller this function");
        _;
    }

    function setStr(string calldata _str) external  onlyOwner {
        s_str = _str;
    }

    function returnStr() external view onlyOwner returns(string memory){
        return s_str;
    }
}