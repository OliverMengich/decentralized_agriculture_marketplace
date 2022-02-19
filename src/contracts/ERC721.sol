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
    }
    enum State {NO_PURCHASE, NEW_ORDER, AWAITING_PAYMENT, AWAITING_DELIVERY, COMPLETE }

    struct OrdersStruct{
        Products agricultureProducts;
        address buyer;
        State _orderstate;
    }
    OrdersStruct[] private orders;
    mapping (address=>OrdersStruct[]) private _customerorders;
    //mapping(address => mapping (address=>OrdersStruct[])) public _buyerorders;

    event Transfer(address indexed _from, address indexed _to, Products product_Transferred);
    Products[] public product;
    mapping (address=>Products[]) internal ownerProducts;
    mapping(address => bool) public isMember;

    
    
    



    function transferFrom(address _from, address payable _to, uint256 _index) public payable returns(string memory) {
        //require(_from.balance > price,'You have insufficient balance to transact');
        require(_from != address(0),'Invalid address');
        require(_to != address(0),' Invalid address');
        require(isMember[_from] == true,'not a member');
        
        string memory issuccessfull = _transferFrom(_from, _to, _index);
        return issuccessfull;
    }
    function _transferFrom(address _from, address payable _to, uint256 _index) private returns(string memory){
        Products memory specificProduct = ownerProducts[_from][_index];
        //require if the _from has the product if not revert
        require(specificProduct.price != 0,'no product found');
        require(specificProduct.product_quantity != 0,'product quantity not specified');
        // delete that product from the person who owns it
        deleteFromUser(_from, _index);
        // change ownership from current owner to latest owner
        specificProduct._owner = _to;
        //change from records 
        product[_index]._owner = _to;
        ownerProducts[_to].push(specificProduct);
        return 'Transfer successfull';
    }
    
    function BuyCommodity(address payable _to, uint value) public payable returns(bool, bytes memory){
        (bool success, bytes memory data) = _to.call{value: value}("");
        return (success, data);
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
    
    function deleteFromUser(address _from, uint256 _index) private {
        Products[] storage owninguser = ownerProducts[_from];
        for(uint i = _index; i< owninguser.length-1; i++){
            owninguser[i] = owninguser[i+1]; 
        }
        owninguser.pop();
    }
    function testArrayProduct(uint256 _index) public returns(Products memory){
        Products storage myprod = product[_index];
        myprod._owner = 0x1c9264Bd829884899dc15397BeC23113bCeC3982;
        return myprod;
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
            _owner: _owner
        });
        product.push(prod);
        //call the mint function  
        addProduct(_owner, prod);   
    }
    function addProduct(address _owner, Products memory prod) private{
        ownerProducts[_owner].push(prod);
        isMember[_owner] = true;
    }
    function AddOrder(address _buyer, uint256 _index, address _owner) public {
       Products memory prod = ownerProducts[_owner][_index];
        OrdersStruct memory neworder = OrdersStruct({
            agricultureProducts: prod,
            _orderstate: State.NEW_ORDER,
            buyer: _buyer
        });
        orders.push(neworder);
        //_buyerorders[_buyer] = _customerorders[_owner].push(neworder);
    }
    function AcceptOrder( address _seller, uint _index) public view{
        OrdersStruct memory order = _customerorders[_seller][_index];
        require(order._orderstate == State.NEW_ORDER);
        order._orderstate = State.AWAITING_PAYMENT;

        // notify user in the frontend that order is accepted
    }
    function check_orders(address _buyer) public view returns(OrdersStruct[] memory) {
        return _customerorders[_buyer];
    }
    function ProceedCheckOut( uint _index, address payable _seller, address _buyer) public {
        OrdersStruct memory order = _customerorders[_seller][_index];
        require(order._orderstate == State.AWAITING_PAYMENT);
        BuyCommodity(_seller,order.agricultureProducts.price);

        //delete from ownerProducts array
        transferFrom(_buyer, _seller, _index);
        order._orderstate = State.AWAITING_DELIVERY;
        //delete in products array
        deleteFromProductsArray(_index);
    }
    function deleteFromProductsArray(uint index) private{
        for(uint i = index; i< product.length-1; i++){
            product[i] = product[i+1]; 
        }
        product.pop();
    }
    
}