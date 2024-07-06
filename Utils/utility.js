import { ethers } from "ethers";
import Web3Modal from "web3modal";

export const connectWallet = async () => {
  try {
    if (!window.ethereum) throw new Error("Install Metamask");
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    const firstAccount = accounts[0];
    return firstAccount;
  } catch (error) {
    console.error(error);
  }
};

export const checkIfWalletIsConnected = async () => {
  try {
    if (!window.ethereum) throw new Error("Install Metamask");
    const accounts = await window.ethereum.request({
      method: "eth_accounts",
    });
    const firstAccount = accounts[0];
    return firstAccount;
  } catch (error) {
    console.error(error);
  }
};
