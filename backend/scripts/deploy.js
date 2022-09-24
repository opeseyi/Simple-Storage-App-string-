const ethers = require("ethers");
const fs = require("fs-extra");
require("dotenv").config();

async function deploy() {
  const provider = new ethers.providers.JsonRpcProvider(process.env.PROVIDER);
  const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

  // const abi = fs.readFileSync(
  //   "/home/seyi/CODE FOLDER/30DaysOfBlockchainProcjectDevelopment/simpleStorage/backend/build/contracts_SimpleStorage_sol_SimpleStorage.abi",
  //   "utf8"
  // );

  // const bin = fs.readFileSync(
  //   "/home/seyi/CODE FOLDER/30DaysOfBlockchainProcjectDevelopment/simpleStorage/backend/build/contracts_SimpleStorage_sol_SimpleStorage.bin",
  //   "utf8"
  // );

  const abi = fs.readFileSync(process.env.ABI_PATH, "utf8");

  const bin = fs.readFileSync(process.env.BIN_PATH, "utf8");

  const contractFactory = new ethers.ContractFactory(abi, bin, wallet);
  const contract = await contractFactory.deploy();
  // Interacting with contract
  // const setString = await contract.setStr("NAH");
  // await setString.wait(1);
  // const getStr = await contract.returnStr();

  // console.log(getStr);

  await updateContractAddress(contract);
}

async function updateContractAddress(contract) {
  const content = `export const contractAddress = '${contract.address}'`;

  try {
    fs.writeFileSync(process.env.FRONT_END_PATH, content);
  } catch (e) {
    console.log(e);
  }
}
deploy()
  .then(() => process.exit(0))
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
