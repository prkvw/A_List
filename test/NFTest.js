const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Mint", function () {
  it("Should return new minted Asset", async function () {
    const Greeter = await ethers.getContractFactory("Mint");
    const greeter = await Greeter.deploy("Hello, world!");
    await greeter.deployed();

    expect(await greeter.greet()).to.equal("Hello, world!");

    const setGreetingTx = await greeter.setGreeting("Hola, mundo!");

    // wait until the transaction is mined
    await setGreetingTx.wait();

    expect(await greeter.greet()).to.equal("Hola, mundo!");
  });
});
