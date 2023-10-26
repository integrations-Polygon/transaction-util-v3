import { mintNFT } from "./nftMethods/mintNFT";
import { ethJsonRpcMethod } from "./milestoneApis/ethJsonRpcMethod";

const startScript = async () => {
  try {
    /* ---------------------------- MINT ERC721 ------------------------------ */
    console.clear();

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
      CHECK FINALITY USING ETH JSON RPC API METHOD; eth_getBlockByNumber
    */
    await ethJsonRpcMethod(yourBlock, mintedNftTimestamp);
  } catch (error) {
    console.log("Error in startScript", error);
    process.exit(1);
  }
};

startScript()
  .then(() => {
    console.log("\n\n---------- ENDING ALL PROCESS ----------\n\n");
    process.exit(0);
  })
  .catch((error) => {
    console.error("error", error);
    process.exit(1);
  });
