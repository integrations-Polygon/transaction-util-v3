import { mintNFT } from "./nftMethods/mintNFT";
import ps from "prompt-sync";
import { heimdalMilestoneApi } from "./milestoneApis/heimdalMilestoneApi";
import { ethJsonRpcMethod } from "./milestoneApis/ethJsonRpcMethod";
const prompt = ps();

const issueToken = async () => {
  try {
    /* ---------------------------- INPUT ------------------------------ */

    console.clear();
    console.log("\n-----------------------------------------");
    console.log(`PIP 11's MILESTONE FINALITY API TEST`);
    console.log("-----------------------------------------\n");
    console.log("Choose which Methodology to used:");
    console.log("1. Using Heimdal Milestone API.");
    console.log("2. Using ETH JSON RPC API method.\n");

    const choice = prompt("Enter your choice: ");
    if (!choice) return console.log("\nChoice no. cannot be null");
    if (choice !== "1" && choice !== "2") console.log(`\nChoice no. ${choice} is unsupported`);

    /* ---------------------------- MINT ERC721 ------------------------------ */

    const { tx, mintedNftTimestamp } = await mintNFT(); // mints one ERC721 NFT
    if (!tx.blockNumber) {
      throw Error("Cannot get transaction block number");
    }
    const yourBlock: number = tx.blockNumber;

    /* ---------------------------- PIP-11 MILESTONE FINALITY CHECK ------------------------------ */
    console.log("\n-----------------------------------------");
    console.log(`BLOCK FINALITY`);
    console.log("-----------------------------------------\n");
    /* 
      CHECK FINALITY USING HEIMDAL MILESTONE API
    */
    if (choice === "1") await heimdalMilestoneApi(tx, mintedNftTimestamp);

    /* 
      CHECK FINALITY USING ETH JSON RPC API METHOD; eth_getBlockByNumber
    */
    if (choice === "2") await ethJsonRpcMethod(yourBlock, mintedNftTimestamp);
  } catch (error) {
    console.log("Error in startScript", error);
    process.exit(1);
  }
};

issueToken()
  .then(() => {
    console.log("\n\n---------- ENDING ALL PROCESS ----------\n\n");
    process.exit(0);
  })
  .catch((error) => {
    console.error("error", error);
    process.exit(1);
  });
