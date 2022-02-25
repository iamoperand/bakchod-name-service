const hre = require('hardhat')

const main = async () => {
  const [owner, randomPerson] = await hre.ethers.getSigners();
  const domainContractFactory = await hre.ethers.getContractFactory('Domains');
  
  const domainContract = await domainContractFactory.deploy("bakchod");
  await domainContract.deployed();

  console.log("contract deployed to:", domainContract.address);
  console.log("contract deployed by: ", owner.address)

  let txn = await domainContract.register("nik", { value: hre.ethers.utils.parseEther("0.5") });
  await txn.wait();

  const domainOwner =await domainContract.getAddress("nik");
  console.log("owner of domain: ", domainOwner);

  const balance = await hre.ethers.provider.getBalance(domainContract.address);
  console.log("contract balance: ", hre.ethers.utils.formatEther(balance));

  // // try to set a record that does belong to me
  // txn = await domainContract.setRecord("nik", "what the hell is going on?");
  // await txn.wait();

  // // try to set a record that does not belong to me
  // txn = await domainContract.setRecord("damn", "what the hell is going on?");
  // await txn.wait();
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