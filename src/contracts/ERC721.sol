//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract ERC721{

    struct Products{
        string product_name;
        uint256 product_quantity;
        uint256 price;
        string _dateOfPlant;
        string _harvestDate;
    }
    event Transfer(address indexed _from, address indexed _to, Products product_Transferred);
    Products[] product;
    mapping (address=>Products[]) internal ownerProducts;
    mapping(address => bool) public isMember;
    
    function _transferFrom(address _from, address _to, uint256 _index, Products memory prod) private {
        require(_from != address(0));
        require(_to != address(0));
        require(exists(_from) == true);
        deleteFromUser(_from, _index);
        ownerProducts[_to].push(prod);
    }
    function deleteFromUser(address _from, uint256 _index) private {
        Products[] storage owninguser = ownerProducts[_from];
        require(owninguser != null);
        for(uint i = _index; i< owninguser.length-1; i++){
            owninguser[i] = owninguser[i+1]; 
        }
        owninguser.pop();
        deleteFromArr(_index);
    }
    function deleteFromArr(uint256 index) private{
        for(uint i = index; i< product.length-1; i++){
            product[i] = product[i+1]; 
        }
        product.pop();
    }
    function exists(address _owner) private view returns(bool){
        bool isthere = isMember[_owner];
        return isthere;
    }
    function transferFrom(address _from, address payable _to, uint256 _index, string memory product_name,uint256 product_quantity, uint256 price, string calldata _dateOfPlant, string calldata _harvestDate) public payable returns(uint256) {
        require(_from.balance > price,'You have insufficient balance to transact');
        Products memory prod = Products({
            product_name: product_name,
            product_quantity: product_quantity,
            price: price,
            _dateOfPlant: _dateOfPlant,
            _harvestDate: _harvestDate
        });
        _transferFrom(_from, _to, _index, prod);
        _to.transfer(price*10^18);
        emit Transfer(_from, _to, prod);
        return _to.balance;
    }
    //returns balance of an owner
    function balanceOf(address _owner) public view returns(Products[] memory) {
        require(_owner != address(0));
        Products[] memory products = ownerProducts[_owner];
        return products;
    }
    function mint(address _owner, string memory product_name,uint256 product_quantity, uint256 price, string calldata _dateOfPlant, string calldata _harvestDate) public {
        Products memory prod = Products({
            product_name: product_name,
            product_quantity: product_quantity,
            price: price,
            _dateOfPlant: _dateOfPlant,
            _harvestDate: _harvestDate
        });
        product.push(prod);
        //call the mint function  
        addProduct(_owner, prod);   
    }
    function addProduct(address _owner, Products memory prod) private{
        ownerProducts[_owner].push(prod);
        isMember[_owner] = true;
    }
}