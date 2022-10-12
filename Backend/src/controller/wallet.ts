import Web3 from "web3";
const web3 = new Web3("https://alfajores-forno.celo-testnet.org");

//create wallet: public address and private key which is not saved to DB for privacy
export const createWallet = async () => {
  const wallet = await web3.eth.accounts.create();
  const walletAddress = wallet.address;
  const privatekey = wallet.privateKey;
  return { walletAddress, privatekey };
};
