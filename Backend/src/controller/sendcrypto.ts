import Web3 from "web3";
import { Request, Response } from "express";
import { newKitFromWeb3 } from "@celo/contractkit";
import "dotenv/config";
import { User } from "../model";
import { Transaction } from "../model/Transaction";

const celoProvider = process.env.ALFAJORES_RPC!;

//connect to celo https://docs.celo.org/blog/developer-guide/start/hellocelo
const web3 = new Web3(celoProvider);

const kit = newKitFromWeb3(web3 as any);

//hard coded values
let anAddress = "0xC8AafcfE085C141475897Bb10a3ce36fe31173b7";

//send cUSD to another wallet address
export const swapCrypto = async (req: any, res: Response) => {
  const { phonenumber, amount } = req.body;
  const user = await User.findOne({ phonenumber });
  let recipientAddress = user?.walletAddress;

  const c_user = req.session!.c_user;

  console.log(c_user)

  let privatekey =
    "0xeda4164c50e7ff4c4ab849bb06e7ba6f78860b53f8bedc7c84faca4fbbe8d18a";
  kit.connection.addAccount(privatekey);

  //celo token
  // let celotoken = await kit.contracts.getGoldToken();

  //cUsd
  let cUSDtoken = await kit.contracts.getStableToken();

  //check balance
  let cUSDbalance = await cUSDtoken.balanceOf(anAddress);
  let initialCUSDBalance = cUSDbalance.toNumber();
  if (amount < initialCUSDBalance) {
    try {
      let cUSDtx = await cUSDtoken
        .transfer(recipientAddress!, amount)
        .send({ from: anAddress });

      let cUSDReceipt = await cUSDtx.waitReceipt();

      //check balance
      let cUSDbal = await cUSDtoken.balanceOf(anAddress);
      let cUSDbalance = cUSDbal.toNumber();

      console.log("cUSD receipt", cUSDReceipt);
      let txhash = cUSDReceipt.transactionHash;
      console.log("txhash", txhash);
      //save transaction details
      try {
        const transaction = new Transaction({
          txhash: txhash,
          to: recipientAddress,
          amount: req.body.amount,
          from: anAddress,
        });
        let datasaved = await transaction.save();
        console.log("datasaved", datasaved);
      } catch (error) {
        console.log(error);
      }
      return res.status(201).json({
        msg: "transaction successfull",
        amount,
        recipientAddress,
        txhash,
        cUSDbalance,
      });
    } catch (error) {
      console.log(error);
    }
  } else {
    return res.status(400).json({ msg: "Wallet balance too low" });
  }
};
