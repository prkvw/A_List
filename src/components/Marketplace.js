import Navbar from "./Navbar";
import NFTTile from "./NFTTile";
import MarketplaceJSON from "../Marketplace.json";
import axios from "axios";
import { useState } from "react";
import { GetIpfsUrlFromPinata } from "../utils";

export default function Marketplace() {
const sampleData = [
    {
        "name": "Danfo",
        "description": "Primo Collection",
        "website":"http://axieinfinity.io",
        "image":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ43HjoPlFdmS9CDRPWunyg9KNFZ8hIFGkubUb5D3dVw27RQw9HpluTB2MbGMmfedq3RQ0&usqp=CAU",
        "price":"0.03ETH",
        "currentlySelling":"True",
        "address":"0xe81Bf5A757CB4f7F82a2F23b1e59bE45c33c5b13",
    },
    {
        "name": "Scream",
        "description": "Lyrio Collection",
        "website":"http://axieinfinity.io",
        "image":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSldvZNGV_fFikVgKK_NNu599pa6Tn4zGe1-mDkA9_CQt_LGEfrRawS9WejHgF-Q2d7EVI&usqp=CAU",
        "price":"0.03ETH",
        "currentlySelling":"True",
        "address":"0xe81Bf5A757C4f7F82a2F23b1e59bE45c33c5b13",
    },
    {
        "name": "Spice",
        "description": "Illo Collection",
        "website":"http://axieinfinity.io",
        "image":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRU1I6Ca7LKWgbYbMLmxxo-hiU1yNmnDaLZe1bt9-QWx-ilJSkRqpt1V0EOSwjgaQRzHhQ&usqp=CAU",
        "price":"0.03ETH",
        "currentlySelling":"True",
        "address":"0xe81Bf5A757C4f7F82a2F23b1e59bE45c33c5b13",
    },
];
const [data, updateData] = useState(sampleData);
const [dataFetched, updateFetched] = useState(false);

async function getAllNFTs() {
    const ethers = require("ethers");
    //After adding your Hardhat network to your metamask, this code will get providers and signers
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    //Pull the deployed contract instance
    let contract = new ethers.Contract(MarketplaceJSON.address, MarketplaceJSON.abi, signer)
    //create an NFT Token
    let transaction = await contract.getAllNFTs()

    //Fetch all the details of every NFT from the contract and display
    const items = await Promise.all(transaction.map(async i => {
        var tokenURI = await contract.tokenURI(i.tokenId);
        console.log("getting this tokenUri", tokenURI);
        tokenURI = GetIpfsUrlFromPinata(tokenURI);
        let meta = await axios.get(tokenURI);
        meta = meta.data;

        let price = ethers.utils.formatUnits(i.price.toString(), 'ether');
        let item = {
            price,
            tokenId: i.tokenId.toNumber(),
            seller: i.seller,
            owner: i.owner,
            image: meta.image,
            name: meta.name,
            description: meta.description,
        }
        return item;
    }))

    updateFetched(true);
    updateData(items);
}

if(!dataFetched)
    getAllNFTs();

return (
    <div>
        <Navbar></Navbar>
        <div className="flex flex-col place-items-center mt-20">
            <div className="md:text-xl font-bold text-white">
                <h1 className="text-7xl font-bold text-white">Welcome to the A-List</h1>
            </div>
            <div className="flex mt-5 justify-between flex-wrap max-w-screen-xl text-center">
                {data.map((value, index) => {
                    return <NFTTile data={value} key={index}></NFTTile>;
                })}
            </div>
        </div>            
    </div>
);

}