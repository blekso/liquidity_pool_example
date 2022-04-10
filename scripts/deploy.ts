import "dotenv/config";
import { ethers } from "hardhat";
import { Gold__factory, Silver__factory, TokenSwap__factory } from "../typechain-types";

async function main() {
  const Gold = await ethers.getContractFactory("Gold") as Gold__factory;
  const gold = await Gold.deploy({gasPrice: ethers.utils.parseUnits("50", "gwei"),});
  await gold.deployed();
  console.log(`Gold token deployed at: ${await gold.address}`)

  const Silver = await ethers.getContractFactory("Silver") as Silver__factory;
  const silver = await Silver.deploy({gasPrice: ethers.utils.parseUnits("50", "gwei"),});
  await silver.deployed();
  console.log(`Silver token deployed at: ${await silver.address}`)

  const TokenSwap1 = await ethers.getContractFactory("TokenSwap") as TokenSwap__factory;
  const tokenSwap1 = await TokenSwap1.deploy(gold.address, process.env.MY_ADDRESS!, silver.address, process.env.MY_ADDRESS!);
  await tokenSwap1.deployed();
  console.log(`TokenSwap1 token deployed at: ${await tokenSwap1.address}`)

  /* const TokenSwap2 = await ethers.getContractFactory("TokenSwap") as TokenSwap__factory;
  const tokenSwap2 = await TokenSwap2.deploy(gold.address, process.env.MY_ADDRESS!, silver.address, process.env.MY_ADDRESS!);
  await tokenSwap2.deployed();
  console.log(`TokenSwap2 token deployed at: ${await tokenSwap2.address}`) */

  await gold.approve(tokenSwap1.address, ethers.utils.parseEther("10"));
  await silver.approve(tokenSwap1.address, ethers.utils.parseEther("20"));
  /* await gold.approve(tokenSwap2.address, ethers.utils.parseEther("20"));
  await silver.approve(tokenSwap2.address, ethers.utils.parseEther("10")); */

  tokenSwap1.swap("10", "20");
  console.log(await gold.balanceOf(process.env.MY_ADDRESS!))
  console.log(await silver.balanceOf(process.env.MY_ADDRESS!))
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });