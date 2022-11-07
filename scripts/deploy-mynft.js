const main = async () => {
    const nftContractFactory = await ethers.getContractFactory("MyNFT");

    const nftContract = await nftContractFactory.deploy();
    await nftContract.deployed();
    console.log('Contract deployed to:', nftContract.address);
}

main().then(() => process.exit(0))
.catch((error) =>{
    console.log(error)
     process.exit(1);
     });