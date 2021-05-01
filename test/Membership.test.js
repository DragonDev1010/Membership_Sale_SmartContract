require('chai')
    .use(require('chai-as-promised'))
    .should()

const {assert} = require('chai')

const Membership = artifacts.require('./Membership.sol')

contract('Membership', (accounts) => {
    let membership;
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
    // gold card test
    describe('gold card', async() => {
        let result 
        before(async() => {
            result = await membership.gold_buy(
                { from: accounts[0], value: web3.utils.toWei('10', 'Ether') }
            )
        })
        it('gold owner increase one', async() => {
            var gold_owner_count = await membership.gold_owner_count()
            assert.equal(gold_owner_count, 1, 'gold owner increase one after buing gold card')
        })
        it('add new gold card owner', async() => {
            const event = result.logs[0].args
            assert.equal(event.owner, accounts[0], 'card owner address is correct')
            assert.equal(event.price, '0', 'card price is correct')
            assert.equal(event.sell_approve, false, 'sell approve state is correct')
        })
        it('card owner place his card on the card sell list', async() => {
            result = await membership.gold_sell(
                web3.utils.toWei('1.5', 'Ether'),
                {from: accounts[0]}
            )
            const event = result.logs[0].args
            assert.equal(event.owner, accounts[0], 'card owner address is correct')
            assert.equal(event.price, '1500000000000000000', 'card price is set correctly')
            assert.equal(event.sell_approve, false, 'sell approve state is correct')
        })
        it('gold card owner approves the new owner request', async() => {
            result = await membership.gold_approve(
                {from: accounts[0]}
            )
            const event = result.logs[0].args
            assert.equal(event.owner, accounts[0], 'card owner address is correct')
            assert.equal(event.price, '1500000000000000000', 'card price is set correctly')
            assert.equal(event.sell_approve, true, 'sell approve state is correct')
        })
        it('gold card buy is success', async() => {
            result = await membership.gold_request_buy(
                0,
                {from: accounts[1], value: web3.utils.toWei('15', 'Ether')}
            )
            const event = result.logs[0].args
            assert.equal(event.owner, accounts[1], 'card owner address is correct')
            assert.equal(event.price, '1500000000000000000', 'card price is set correctly')
            assert.equal(event.sell_approve, false, 'sell approve state is correct')
        })
    })

    // silver card test
    describe('silver card', async() => {
        let result 
        before(async() => {
            result = await membership.silver_buy(
                { from: accounts[0], value: web3.utils.toWei('1', 'Ether') }
            )
        })
        it('silver owner increase one', async() => {
            var silver_owner_count = await membership.silver_owner_count()
            assert.equal(silver_owner_count, 1, 'silver owner increase one after buing silver card')
        })
        it('add new silver card owner', async() => {
            const event = result.logs[0].args
            assert.equal(event.owner, accounts[0], 'card owner address is correct')
            assert.equal(event.price, '0', 'card price is correct')
            assert.equal(event.sell_approve, false, 'sell approve state is correct')
        })
        it('card owner place his card on the card sell list', async() => {
            result = await membership.silver_sell(
                web3.utils.toWei('15', 'Ether'),
                {from: accounts[0]}
            )
            const event = result.logs[0].args
            assert.equal(event.owner, accounts[0], 'card owner address is correct')
            assert.equal(event.price, '15000000000000000000', 'card price is set correctly')
            assert.equal(event.sell_approve, false, 'sell approve state is correct')
        })
        it('silver card owner approves the new owner request', async() => {
            result = await membership.silver_approve(
                {from: accounts[0]}
            )
            const event = result.logs[0].args
            assert.equal(event.owner, accounts[0], 'card owner address is correct')
            assert.equal(event.price, '15000000000000000000', 'card price is set correctly')
            assert.equal(event.sell_approve, true, 'sell approve state is correct')
        })
        it('silver card buy is success', async() => {
            result = await membership.silver_request_buy(
                0,
                {from: accounts[1], value: web3.utils.toWei('15', 'Ether')}
            )
            const event = result.logs[0].args
            assert.equal(event.owner, accounts[1], 'card owner address is correct')
            assert.equal(event.price, '15000000000000000000', 'card price is set correctly')
            assert.equal(event.sell_approve, false, 'sell approve state is correct')
        })
    })    

    // bronze card test
    describe('bronze card', async() => {
        let result 
        before(async() => {
            result = await membership.bronze_buy(
                { from: accounts[0], value: web3.utils.toWei('1', 'Ether') }
            )
        })
        it('bronze owner increase one', async() => {
            var bronze_owner_count = await membership.bronze_owner_count()
            assert.equal(bronze_owner_count, 1, 'bronze owner increase one after buing bronze card')
        })
        it('add new bronze card owner', async() => {
            const event = result.logs[0].args
            assert.equal(event.owner, accounts[0], 'card owner address is correct')
            assert.equal(event.price, '0', 'card price is correct')
            assert.equal(event.sell_approve, false, 'sell approve state is correct')
        })
        it('card owner place his card on the card sell list', async() => {
            result = await membership.bronze_sell(
                web3.utils.toWei('15', 'Ether'),
                {from: accounts[0]}
            )
            const event = result.logs[0].args
            assert.equal(event.owner, accounts[0], 'card owner address is correct')
            assert.equal(event.price, '15000000000000000000', 'card price is set correctly')
            assert.equal(event.sell_approve, false, 'sell approve state is correct')
        })
        it('bronze card owner approves the new owner request', async() => {
            result = await membership.bronze_approve(
                {from: accounts[0]}
            )
            const event = result.logs[0].args
            assert.equal(event.owner, accounts[0], 'card owner address is correct')
            assert.equal(event.price, '15000000000000000000', 'card price is set correctly')
            assert.equal(event.sell_approve, true, 'sell approve state is correct')
        })
        it('bronze card buy is success', async() => {
            result = await membership.bronze_request_buy(
                0,
                {from: accounts[1], value: web3.utils.toWei('15', 'Ether')}
            )
            const event = result.logs[0].args
            assert.equal(event.owner, accounts[1], 'card owner address is correct')
            assert.equal(event.price, '15000000000000000000', 'card price is set correctly')
            assert.equal(event.sell_approve, false, 'sell approve state is correct')
        })
    })      
})