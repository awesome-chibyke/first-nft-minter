const main = async () => {
    const nftContractFactory = await ethers.getContractFactory('MyNFT2');
    const MyNFT_2Contract = await nftContractFactory.deploy();
    await MyNFT_2Contract.deployed();

    console.log("contract deployed to address: "+MyNFT_2Contract.address);
}

main().then(() => process.exit(0))
.catch((error) =>{
    console.log(error)
     process.exit(1);
     });