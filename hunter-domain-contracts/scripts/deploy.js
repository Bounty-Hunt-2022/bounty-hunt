const main = async () => {
  const domainContractFactory = await hre.ethers.getContractFactory("Domains");
  const domainContract = await domainContractFactory.deploy("hunter");
  await domainContract.deployed();

  console.log("Contract deployed to:", domainContract.address);

  // CHANGE THIS DOMAIN TO SOMETHING ELSE! I don't want to see OpenSea full of bananas lol
  let txn = await domainContract.register(
    "ozzzzy",
    // "Apna kam karna!!",
    "ipfs://bafybeicdtvrvwstwmwaapgvmju5d7zce6iefjddjocih7mplrtknzk26jy/metadata.json",
    { value: hre.ethers.utils.parseEther("0.1") }
  );
  await txn.wait();
  console.log("Minted domain ozzzzy.hunter");

  const address = await domainContract.getAddress("ozzzzy");
  console.log("Owner of domain silent:", address);

  const balance = await hre.ethers.provider.getBalance(domainContract.address);
  console.log("Contract balance:", hre.ethers.utils.formatEther(balance));
};

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

runMain();

// mumbai deployed-- 0x40Ba40EA207f37fe8FD9A7470dE6cca6a36Bad98
