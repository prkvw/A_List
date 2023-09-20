// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

Contract {
struct Assets {
   string title;
    string description;
   string  location;
}
function buyAsset(uint256 AssetId) public payable {

    Listing storage listing = listings[listingId];
    require(listing.price > 0, "Price must be greater than zero");
    require(msg.value >= listing.price, "Insufficient funds");

    address seller = seller.address;
    address buyer = msg.sender;
    uint256 price = price;

    // Ensure that the token's contract has "approved" our NFT marketplace to operate the token (to transfer it, etc.).
    require(IERC721(listing.tokenContract).getApproved(listing.tokenId) == address(this), "NFT marketplace is not approved");

    // Transfer the NFT from the seller to the buyer.
    IERC721(listing.tokenContract).safeTransferFrom(seller, buyer, listing.tokenId);

    // Transfer the funds from the buyer to the seller.
    payable(seller).transfer(price);

    // Emit a purchase event.
    emit AssetPurchased(listingId, buyer, seller, price);
}
main()
  .catch(err => {
      console.error(err)
      process.exit(1)
  }
  }

//buyAsset
//rateAsset
//CreateListing
//search
