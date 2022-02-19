// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import './ERC721.sol';

contract ERC721Enumerable is ERC721{
    
    //returns all commodity in a list
    function totalSupply() public view override(ERC721) returns(uint256){
        return super.totalSupply();
    }
    function totalCommodity() public override(ERC721) view returns(ERC721.Products[] memory){
        return super.totalCommodity();
    }
    //returns all comodity by a farmer and their index
    function tokenOfOwnerByIndex(address _owner, uint256 _index) public view override(ERC721) returns(ERC721.Products memory){
        return super.tokenOfOwnerByIndex(_owner,_index);
    }
    function tokenByIndex(uint256 _index) public override(ERC721) view returns(ERC721.Products memory){
        return super.tokenByIndex(_index);
    }
}