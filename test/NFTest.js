const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Mint", function () {
  it("Should return new minted Asset", async function () {
    
  });
});

// deploy the contract
const NFTMarketplace = await ethers.getContractFactory("NFTMarketplace");
const nftMarketplace = await NFTMarketplace.deploy();
await nftMarketplace.deployed();

// create a new token
const tokenURI = "https://example.com/token/1";
const price = ethers.utils.parseEther("1");
await nftMarketplace.createToken(tokenURI, price);

// check that the token was created and listed for sale
const latestToken = await nftMarketplace.getLatestIdToListedToken();
expect(latestToken.tokenId).to.equal(1);
expect(latestToken.price).to.equal(price);
expect(latestToken.currentlyListed).to.equal(true);
