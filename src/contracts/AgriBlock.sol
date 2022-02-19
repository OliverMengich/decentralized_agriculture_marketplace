//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import './ERC721.sol';

contract AgriBlock is ERC721{
    
    address private contract_owner;
    address private buyer;
    constructor(){
        contract_owner = msg.sender;
    }
    
    
}