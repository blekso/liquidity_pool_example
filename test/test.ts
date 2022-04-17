import { ethers } from "hardhat";
import { expect } from "chai";
import {
  Gold__factory,
  Silver__factory,
  LiquidityPool__factory,
} from "../typechain-types";

describe("Liquidity pool test", function () {
  let owner: any;

  beforeEach(async function () {
    [owner] = await ethers.getSigners();
  });

  /* it("Should assign the total supply of Gold to the owner", async function () {
    const Gold = (await ethers.getContractFactory("Gold")) as Gold__factory;
    const gold = await Gold.deploy();
    await gold.deployed();
    console.log(`Gold token deployed at: ${await gold.address}`);

    const ownerBalance = await gold.balanceOf(owner.address);
    expect(await gold.totalSupply()).to.equal(ownerBalance);
  });

  it("Should assign the total supply of Silver to the owner", async function () {
    const Silver = (await ethers.getContractFactory(
      "Silver"
    )) as Silver__factory;
    const silver = await Silver.deploy();
    await silver.deployed();

    console.log(`Silver token deployed at: ${await silver.address}`);

    const ownerBalance = await silver.balanceOf(owner.address);
    expect(await silver.totalSupply()).to.equal(ownerBalance);
  }); */

  it("Should swap successfully", async function () {
    const Gold = (await ethers.getContractFactory("Gold")) as Gold__factory;
    const gold = await Gold.deploy();
    await gold.deployed();
    console.log(
      `Gold token deployed at: ${await gold.address} with amount ${await gold.totalSupply()}`
    );

    const Silver = (await ethers.getContractFactory(
      "Silver"
    )) as Silver__factory;
    const silver = await Silver.deploy();
    await silver.deployed();
    console.log(
      `Silver token deployed at: ${await silver.address} with amount ${await silver.totalSupply()}`
    );

    const LiquidityPool1 = (await ethers.getContractFactory(
      "LiquidityPool"
    )) as LiquidityPool__factory;
    const liquidityPool1 = await LiquidityPool1.deploy(
      gold.address,
      silver.address
    );
    await liquidityPool1.deployed();

    await gold.approve(liquidityPool1.address, 20);
    await silver.approve(liquidityPool1.address, 10);

    await liquidityPool1.addLiquidity(20, 10);

    console.log("Before first swap");
    console.log(`My Gold: ${await gold.balanceOf(owner.address)}`);
    console.log(`My Silver: ${await silver.balanceOf(owner.address)}`);
    console.log(`Pool1 Gold: ${await gold.balanceOf(liquidityPool1.address)}`);
    console.log(
      `Pool1 Silver: ${await silver.balanceOf(liquidityPool1.address)}`
    );

    //hardcoded uint256 amountBIn = (k.div(balanceA.sub(_amountAOut))).sub(balanceB);
    await silver.approve(liquidityPool1.address, 20);

    await liquidityPool1.swap(5, 0);

    console.log("AFter first swap");
    console.log(`My Gold: ${await gold.balanceOf(owner.address)}`);
    console.log(`My Silver: ${await silver.balanceOf(owner.address)}`);
    console.log(`Pool1 Gold: ${await gold.balanceOf(liquidityPool1.address)}`);
    console.log(
      `Pool1 Silver: ${await silver.balanceOf(liquidityPool1.address)}`
    );

    const LiquidityPool2 = (await ethers.getContractFactory(
      "LiquidityPool"
    )) as LiquidityPool__factory;
    const liquidityPool2 = await LiquidityPool2.deploy(
      gold.address,
      silver.address
    );
    await liquidityPool2.deployed();

    await gold.approve(liquidityPool2.address, 20);
    await silver.approve(liquidityPool2.address, 30);

    await liquidityPool2.addLiquidity(20, 30);

    console.log("Before second swap");
    console.log(`My Gold: ${await gold.balanceOf(owner.address)}`);
    console.log(`My Silver: ${await silver.balanceOf(owner.address)}`);
    console.log(`Pool2 Gold: ${await gold.balanceOf(liquidityPool2.address)}`);
    console.log(
      `Pool2 Silver: ${await silver.balanceOf(liquidityPool2.address)}`
    );

    //hardcoded uint256 amountAIn = (k.div(balanceB.sub(_amountBOut))).sub(balanceA);
    await gold.approve(liquidityPool1.address, 24);

    await liquidityPool1.swap(0, 8);

    console.log("Final results");
    console.log(`Pool1 Gold: ${await gold.balanceOf(liquidityPool1.address)}`);
    console.log(
      `Pool1 Silver: ${await silver.balanceOf(liquidityPool1.address)}`
    );
    console.log(`Pool2 Gold: ${await gold.balanceOf(liquidityPool2.address)}`);
    console.log(
      `Pool2 Silver: ${await silver.balanceOf(liquidityPool2.address)}`
    );

    console.log(`Gold left: ${await gold.balanceOf(owner.address)}`);
    console.log(`Silver left: ${await silver.balanceOf(owner.address)}`);
  });
});
