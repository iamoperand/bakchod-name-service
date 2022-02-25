const main = async () => {
  const domainContractFactory = await hre.ethers.getContractFactory('Domains');
  const domainContract = await domainContractFactory.deploy("bakchod");
  await domainContract.deployed();

  console.log("Contract deployed to:", domainContract.address);

  // CHANGE THIS DOMAIN TO SOMETHING ELSE! I don't want to see OpenSea full of bananas lol
	let txn = await domainContract.register("zero",  {value: hre.ethers.utils.parseEther('0.4')});
	await txn.wait();
  console.log("Minted domain zero.bakchod");

  txn = await domainContract.setRecord("zero", "first ever bakchod.");
  await txn.wait();
  console.log("Set record for zero.bakchod");

  const address = await domainContract.getAddress("zero");
  console.log("Owner of domain zero:", address);

  const balance = await hre.ethers.provider.getBalance(domainContract.address);
  console.log("Contract balance:", hre.ethers.utils.formatEther(balance));
}

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