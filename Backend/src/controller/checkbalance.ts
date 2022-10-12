import Web3 from "web3";
import { Request, Response } from "express";
import { newKitFromWeb3 } from "@celo/contractkit";
import "dotenv/config";
import { User } from "../model";

const celoProvider = process.env.ALFAJORES_RPC!;

//connect to celo https://docs.celo.org/blog/developer-guide/start/hellocelo
const web3 = new Web3(celoProvider);

const kit = newKitFromWeb3(web3 as any);

//check wallet address balance
export const getBal = async (req: Request, res: Response) => {
  const { phonenumber } = req.body;

  const user = await User.findOne({ phonenumber });
  const walletAddress = user?.walletAddress;
  console.log("walletAddress", walletAddress);

  //cUsd
  let cUSDtoken = await kit.contracts.getStableToken();
  let cUSDbal = await cUSDtoken.balanceOf(walletAddress!);

  //celo token
  // let celotoken = await kit.contracts.getGoldToken();
  // let celobal = await celotoken.balanceOf(walletAddress!);

  let cUSDbalance = cUSDbal.toNumber();
  console.log("cUSDbal", cUSDbal.toNumber());
  return res
    .status(200)
    .json({ msg: "wallet balance fetched", walletAddress, cUSDbalance });
};
