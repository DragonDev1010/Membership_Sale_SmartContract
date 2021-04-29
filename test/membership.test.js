require('chai')
    .use(require('chai-as-promised'))
    .should()

const {assert} = require('chai')

const Membership = artifacts.require('./Membership.sol')

contract('Membership', (accounts) => {
    let membership
    before(async() => {
        membership = await Membership.deployed()
    })
    // describe deployment
    describe('deployment', async() => {
        it('deploys successfully', async() => {
            const address = await membership.address
            assert.notEqual(address, 0x0)
            assert.notEqual(address, '')
            assert.notEqual(address, null)
            assert.notEqual(address, undefined)
        })
    })
    // describe gold card
    describe('gold card', async() => {
        let result
        // purchase gold card
        before(async() => {
            result = await membership.purchase_gold(
                {from: accounts[0], value: web3.utils.toWei('10', 'Ether')}
            )
        })
        it('gold owner increase one', async() => {
            let gold_owners_amount = await membership.get_gold_owner_amount()
            assert.equal(gold_owners_amount, 1, 'gold purchase is correct')
        })
        it('smart contract balance increase as gold card price', async() => {
            let balance = await membership.balanceOf()
            assert.equal(balance, 10000000000000000000, 'total balance')
        })
        it('buy gold card from other gold card owner', async() => {
            
            result = await membership.buy_gold(
                accounts[0],
                {from:accounts[1], value: web3.utils.toWei('10', 'Ether')}
            )
            let new_owner_address = await membership.gold_owners(0)
            assert.equal(new_owner_address, accounts[1], 'account_1 successfully buy gold card from account_0')
        })
    })
    // describe silver card
    describe('silver card', async() => {
        let result
        // purchase silver card
        before(async() => {
            result = await membership.purchase_silver(
                {from: accounts[0], value: web3.utils.toWei('1', 'Ether')}
            )
        })
        it('silver owner increase one', async() => {
            let silver_owners_amount = await membership.get_silver_owner_amount()
            assert.equal(silver_owners_amount, 1, 'silver purchase is correct')
        })
        it('smart contract balance increase as silver card price', async() => {
            let balance = await membership.balanceOf()
            assert.equal(balance, 11000000000000000000, 'total balance')
        })
        it('buy silver card from other silver card owner', async() => {
            
            result = await membership.buy_silver(
                accounts[0],
                {from:accounts[1], value: web3.utils.toWei('1', 'Ether')}
            )
            let new_owner_address = await membership.silver_owners(0)
            assert.equal(new_owner_address, accounts[1], 'account_1 successfully buy silver card from account_0')
        })
    })
    //describe bronze card
    describe('bronze card', async() => {
        let result
        // purchase bronze card
        before(async() => {
            result = await membership.purchase_bronze(
                {from: accounts[0], value: web3.utils.toWei('0.25', 'Ether')}
            )
        })
        it('bronze owner increase one', async() => {
            let bronze_owners_amount = await membership.get_bronze_owner_amount()
            assert.equal(bronze_owners_amount, 1, 'bronze purchase is correct')
        })
        it('smart contract balance increase as bronze card price', async() => {
            let balance = await membership.balanceOf()
            assert.equal(balance, 11250000000000000000, 'total balance')
        })
        it('buy bronze card from other bronze card owner', async() => {
            
            result = await membership.buy_bronze(
                accounts[0],
                {from:accounts[1], value: web3.utils.toWei('0.25', 'Ether')}
            )
            let new_owner_address = await membership.bronze_owners(0)
            assert.equal(new_owner_address, accounts[1], 'account_1 successfully buy bronze card from account_0')
        })
    })
})