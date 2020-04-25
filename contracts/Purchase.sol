pragma solidity >=0.4.22 <0.7.0;

contract Purchase{
    uint public value;
    address payable public seller;
    address payable public buyer;
    enum State { Created, Locked, Cancel }
    
    State public state;
    
    constructor() public payable{
        seller = msg.sender;
        value = msg.value / 2;
        require((2 * value) == msg.value , "Value has to be even.");
    }
    
    modifier onlySeller(){
        require(
            msg.sender == seller,
            "Only seller can execute this function"
            );
            _;
    }
    
     modifier onlyBuyer(){
        require(
            msg.sender == buyer,
            "Only buyer can execute this function"
            );
            _;
    }
    
    modifier condition(bool _condition){
        require(_condition);
        _;
    }
    
    modifier inState(State _state){
        require(
            state == _state,
            "Invalid state"
            );
            _;
    }
    
    function confirmPurchase() public condition(msg.value == (2*value)) payable{
        buyer = msg.sender;
        state = State.Locked;
    }
    
    function confirmReceived() public onlyBuyer inState(State.Locked){
        state = State.Cancel;
        buyer.transfer(value);
        seller.transfer(address(this).balance);
    }
    
    function cancel()public onlySeller inState(State.Created){
        state= State.Cancel;
        seller.transfer(address(this).balance);
    }
    
}