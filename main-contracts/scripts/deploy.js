// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require("hardhat");

async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');

  // We get the contract to deploy
  //   USDC = await ethers.getContractFactory("USDC");
  //   usdc = await USDC.deploy();
  //   await usdc.deployed();
  const usdc = "0xf940746486Da186aE584f60cF87bA1dd2880A2db";
  BountyMaker = await ethers.getContractFactory("BountyMaker");
  bountymaker = await BountyMaker.deploy(usdc);
  await bountymaker.deployed();

  //   const tokenApproval = await usdc.approve(
  //     bountymaker.address,
  //     "100000000000000000000000000"
  //   );
  // wait until the transaction is mined
  //   await tokenApproval.wait();

  console.log("USDC address: ", usdc);
  console.log("BountyMaker address: ", bountymaker.address);
  // USDC address:  0xf940746486Da186aE584f60cF87bA1dd2880A2db
  // BountyMaker address:  0xE044a02CadCC21985a51A4e847fA3C9C4dBDdEf5
  // BountyMaker address:  0x5Fb646c7FEAb613d1C81ce376ba0f17556c05C54 test-with-open-to-public

  //   const bountyId = "VVS";
  //   const uri = "ipfs://Qma9fyUqLUm3SmAdxBBS6g3qxu6xNWdrkZcuUGPNAnjv9E/";
  //   const tokenLimit = 5;
  //   const rewards = [300, 200, 100];

  //   const bounty1 = await bountymaker.createBounty(
  //     bountyId,
  //     uri,
  //     tokenLimit,
  //     rewards,
  //     "1645776468"
  //   );

  //   await bounty1.wait();

  //   const bountyId1 = "DVS";
  //   const uri1 = "ipfs://Qma9fyUqLUm3SmAdxBBS6g3qxu6xNWdrkZcuUGPNAnjv9E/";
  //   const tokenLimit1 = 5;
  //   const rewards1 = [1200, 500, 300, 200, 100];

  //   const bounty2 = await bountymaker.createBounty(
  //     bountyId1,
  //     uri1,
  //     tokenLimit1,
  //     rewards1,
  //     "1645776468"
  //   );

  //   await bounty2.wait();
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
