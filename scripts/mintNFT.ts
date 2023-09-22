import { gasPriceFetcher } from "./utils/gasPriceFetcher";
import { Web3Setup, GasData, MintData } from "./utils/types";
import { ethers } from "ethers";
import crypto from "crypto";
import { web3Setup } from "./utils/web3Setup";
import { abi, address } from "../deployments/mumbai/TestERC721.json";

export async function mintNFT(): Promise<MintData> {
  try {
    /* ---------------------------- SETUP ------------------------------ */

    const { provider, signer }: Web3Setup = await web3Setup();

    /* ---------------------------- issueToken ---------------------------- */

    /* 
      INITIALIZE TESTERC721 INSTANCE AND CONNECT WITH SIGNER
    */
    const testERC721Instance: ethers.Contract = new ethers.Contract(address, abi, provider);
    const testERC721: ethers.Contract = testERC721Instance.connect(signer);

    /* 
      MINT ERC721 
    */
    console.log("\n-----------------------------------------");
    console.log(`MINT - ERC721 NFT`);
    console.log("-----------------------------------------\n");

    /*
        GENERATE RANDOM HASH
      */
    const hash: string = crypto.randomBytes(20).toString("hex");

    /*
        GET SIGNER NONCE
      */
    const nonce: number = await provider.getTransactionCount(signer.address);

    // Fetch the latest gas price data from the polygon v2 gas station API
    const { maxFee, maxPriorityFee }: GasData = await gasPriceFetcher();

    /*
      ESTIMATE GAS
    */
    const estimatedGasLimit: ethers.BigNumber = await testERC721.estimateGas.issueToken(
      signer.address,
      hash,
      {
        gasLimit: 14_999_999,
        nonce: nonce,
        maxFeePerGas: maxFee,
        maxPriorityFeePerGas: maxPriorityFee,
      }
    );

    /*
      MINT NFT
    */
    const mintResponse: ethers.ContractTransaction = await testERC721.issueToken(signer.address, hash, {
      gasLimit: estimatedGasLimit,
      nonce: nonce,
      maxFeePerGas: maxFee,
      maxPriorityFeePerGas: maxPriorityFee,
    });
    await mintResponse.wait();

    /*
      Get the timestamp when NFT mint happened in seconds
    */
    const mintedNftTimestamp = Date.now() / 1000;
    const txHash: string = mintResponse.hash;
    const txReceipt: ethers.providers.TransactionReceipt = await provider.getTransactionReceipt(txHash);

    if (!txReceipt) {
      console.error("Transaction not found.");
      process.exit(1);
    }
    // Get the transaction hash
    const tx: ethers.providers.TransactionResponse = await provider.getTransaction(txHash);
    if (!tx) {
      console.error("Cannot get transaction.");
      process.exit(1);
    }
    return { tx, mintedNftTimestamp, provider };
  } catch (error) {
    console.log(`Error at mintNFT: ${error}`);
    process.exit(1);
  }
}
