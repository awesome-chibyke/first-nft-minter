const { assert } = require('chai');

describe('MyNFT Contract', async () => {
    let nft, nftContractAddress, tokenId;

    // Deploys the MyNFT contract and the EternalMarket contract before each test
    beforeEach('Setup Contract', async () => {
        const MyNFT = await ethers.getContractFactory('MyNFT');

        nft = await MyNFT.deploy();

        await nft.deployed();
        nftContractAddress = await nft.address;
    });

    // Tests address for the MyNFT contract
    it('Should have an address', async () => {
        assert.notEqual(nftContractAddress, 0x0);
        assert.notEqual(nftContractAddress, '');
        assert.notEqual(nftContractAddress, 0x0);
        assert.notEqual(nftContractAddress, null);
        assert.notEqual(nftContractAddress, undefined);
    });

    //tests name for the token of MyNFT contract
    it('Should have a name', async () => {
        //returns the name of the token
        const name = await nft.collectionName();
        assert.equal(name, 'MyNFT');
    });

    //test symbol for the token of MyNFT contract
    it('Should have a symbol', async () => {
        //returns the name of the token
        const symbol = await nft.collectionSymbol();
        assert.equal(symbol, 'MNFT');
    });

    it('should be able to mint NFT', async () => {
        //mints a nft
        let txn = await nft.createMyNFT();
        let tx = await txn.wait();

        //tokenid of the minted nft
        let event = tx.events[0];
        let value = event.args[2];
        tokenId = value.toNumber();

        assert.equal(tokenId, 0);

        //mints anotherr nft
        txn = await nft.createMyNFT();
        tx = await txn.wait();

        //tokenid of the minted nft
        event = tx.events[0];
        value = event.args[2];
        tokenId = value.toNumber();

        assert.equal(tokenId, 1);

    });


});