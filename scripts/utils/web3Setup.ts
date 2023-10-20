import { getInfuraProjectId, getPrivateKeyMatic } from "../../envConfig";
import { ethers } from "ethers";
import { Web3Setup } from "./types";

const privateKey = getPrivateKeyMatic();
const infuraProjectID = getInfuraProjectId();

export async function web3Setup(): Promise<Web3Setup> {
  try {
    /* 
      USING INFURA PROVIDER
    */
    const provider: ethers.providers.InfuraProvider = new ethers.providers.InfuraProvider(
      "matic",
      infuraProjectID
    );

    /* 
      INITIALIZE SIGNER 
    */
    const signer: ethers.Wallet = new ethers.Wallet(privateKey, provider);

    return { provider, signer };
  } catch (error) {
    console.log("Error in setup", error);
    process.exit(1);
  }
}
