// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract Membership {
    uint constant gold_max = 15;
    address[] public gold_owners;
    uint constant gold_price = 10000000000000000000;

    // define silver card
    uint constant silver_max = 150;
    address[] public silver_owners;
    uint constant silver_price = 1000000000000000000;

    // define bronze card
    uint constant bronze_max = 1500;
    address[] public bronze_owners;
    uint constant bronze_price = 250000000000000000;
    // smart contract balance
    uint public total_balance = address(this).balance;
    // function implicitly deposit Ether to this smart contract
    function invest() external payable {
        
    }
    function balanceOf() external view returns(uint) {
        return address(this).balance;
    }
    // function purchase original gold card
    function purchase_gold() public payable {
        uint sold_gold = gold_owners.length;
        uint remaining_gold = gold_max - sold_gold;
        // require gold card is available to purchase
        require(remaining_gold > 0);
        // require transaction has enough balance
        require(msg.value >= gold_price);
        // // register purchaseOwner into the gold owner list
        gold_owners.push(msg.sender);
        
    }
    // function buy gold card from other owner
    function buy_gold(address payable _seller) public payable {
        // require transaction has enough eth
        require(msg.value >= gold_price);
        // transfer ether from new owner to old owner
        _seller.transfer(msg.value);
        // replace the new owner with old owner
        for (uint i = 0 ; i < gold_owners.length ; i++) {
            if (gold_owners[i] == _seller) {
                gold_owners[i] = msg.sender;
            }
        }
    }
    // function get sold gold card amount
    function get_gold_owner_amount() public view returns(uint) {
        return gold_owners.length;
    }

    // function purchase original silver card
    function purchase_silver() public payable{
        uint sold_silver = silver_owners.length;
        uint remaining_silver = silver_max - sold_silver;
        // require silver card is available to purchase
        require(remaining_silver > 0);
        // require transaction has enough balance
        require(msg.value >= silver_price);
        // register purchaseOwner into the silver owner list
        silver_owners.push(msg.sender);
        
    }
    // function buy silver card from other owner
    function buy_silver(address payable _seller) public payable {
        // require transaction has enough eth
        require(msg.value >= silver_price);
        // transfer ether from new owner to old owner
        _seller.transfer(msg.value);
        // replace the new owner with old owner
        for (uint i = 0 ; i < silver_owners.length ; i++) {
            if (silver_owners[i] == _seller) {
                silver_owners[i] = msg.sender;
            }
        }
    }
    // function get sold silver card amount
    function get_silver_owner_amount() public view returns(uint) {
        return silver_owners.length;
    }

    // function purchase original bronze card
    function purchase_bronze() public payable{
        uint sold_bronze = bronze_owners.length;
        uint remaining_bronze = bronze_max - sold_bronze;
        // require bronze card is available to purchase
        require(remaining_bronze > 0);
        // require transaction has enough balance
        require(msg.value >= bronze_price);
        // register purchaseOwner into the bronze owner list
        bronze_owners.push(msg.sender);
        
    }
    // function buy bronze card from other owner
    function buy_bronze(address payable _seller) public payable {
        // require transaction has enough eth
        require(msg.value >= bronze_price);
        // transfer ether from new owner to old owner
        _seller.transfer(msg.value);
        // replace the new owner with old owner
        for (uint i = 0 ; i < bronze_owners.length ; i++) {
            if (bronze_owners[i] == _seller) {
                bronze_owners[i] = msg.sender;
            }
        }
    }
    // function get sold bronze card amount
    function get_bronze_owner_amount() public view returns(uint) {
        return bronze_owners.length;
    }
}
