//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract ERC721{

    struct Products{
        string product_name;
        uint256 product_quantity;
        uint price;
        string _dateOfPlant;
        string _harvestDate;
        address _owner;
        uint count;
    }

    Products[] public product;
    mapping (address=>Products[]) internal ownerProducts;
    mapping(address => bool) public isMember;

    function transferFrom(address _from, address payable _to, uint256 _index) public payable returns(bool) {
        //require(_from.balance > price,'You have insufficient balance to transact');
        require(_from != address(0),'Invalid address');
        require(_to != address(0),' Invalid address');
        require(address(_to) != address(_from) ,'you cannot send to yourself');
        require(isMember[_from] == true,'not a member');
        
        bool result = _transferFrom(_from, _to, _index);
        return result;
    }
    
    function _transferFrom(address _from, address payable _to, uint256 _index) private returns(bool){
        
        // 1. find product from products array
        Products memory specificProduct = product[_index];
        require(specificProduct.price != 0,'no product found');
        require(specificProduct.product_quantity != 0,'product quantity not specified');
        require(address(specificProduct._owner) == address(_from),' you dont own this product');
        //2. find the product count 
        uint _productCount = specificProduct.count;
        //3. delete product from ownerProducts
        deleteFromUser( _from, _productCount);
        //4. change product ownership from _from to _to
        specificProduct._owner = address(_to);
        //5. delete from overall array and update the overall array
        deleteFromOverallArray(_index);
        product.push(specificProduct);
        //5. put _to as member
        isMember[_to] = true;
        //6. update the buyers struct
        ownerProducts[_to].push(specificProduct);
        return true;
    }
    function deleteFromUser(address _from, uint _productCount) private {
        Products[] storage owninguser = ownerProducts[_from];

        for(uint i = _productCount; i< owninguser.length-1; i++){
            owninguser[i] = owninguser[i+1]; 
        }
        owninguser.pop();
    }
    function deleteFromOverallArray(uint _index) private{
        for(uint i = _index; i< product.length-1; i++){
            product[i] = product[i+1]; 
        }
        product.pop();
    }
    function totalSupply() public virtual view returns(uint256){
        return product.length;
    }
    function totalCommodity() public virtual view returns(Products[] memory){
        return product;
    }
    function tokenOfOwnerByIndex(address _owner, uint256 _index) public virtual view returns(Products memory){
        return ownerProducts[_owner][_index];
    }
    function tokenByIndex(uint256 _index) public virtual view returns(Products memory){
        
        return product[_index];
    } 
    //returns balance of an owner
    function balanceOf(address _owner) public view returns(Products[] memory) {
        require(_owner != address(0));
        Products[] storage products = ownerProducts[_owner];
        return products;
    }
    function mint(address _owner, string memory product_name,uint256 product_quantity, uint price, string calldata _dateOfPlant, string calldata _harvestDate) public {
        Products memory prod = Products({
            product_name: product_name,
            product_quantity: product_quantity,
            price: price,
            _dateOfPlant: _dateOfPlant,
            _harvestDate: _harvestDate,
            _owner: _owner,
            count: product.length + 1
        });
        product.push(prod);
        //call the mint function  
        addProduct(_owner, prod);   
    }
    function addProduct(address _owner, Products memory prod) private{
        ownerProducts[_owner].pushprod);
        isMember[_owner] = true;
    }
    
    
}