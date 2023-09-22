import axios from "axios";
import { MUMBAI_RPC_URL } from "./utils/constants";
import { msToMinAndSec } from "./utils/msToMinAndSec";

export async function ethJsonRpcMethod(yourBlock: number, mintedNftTimestamp: number): Promise<void> {
  try {
    console.log(`Waiting for your block to get finalised...\n`);
    /* 
      Set flag for block finality 
    */
    let finalised: boolean = false;

    /* 
      Store the last known finalized block value; this is to avoid log spams 
    */
    let lastFinalizedBlock: number | null = null;

    while (!finalised) {
      const response = (
        await axios.post(MUMBAI_RPC_URL, {
          jsonrpc: "2.0",
          id: 1,
          method: "eth_getBlockByNumber",
          params: ["finalized", true],
        })
      ).data;

      /* 
        Convert hex to number
      */
      const finalizedBlock = parseInt(response.result.number.toString(), 16);
      // console.log(`hexToNumber: ${response.result.number} to ${finalizedBlock}`);

      if (lastFinalizedBlock !== finalizedBlock) {
        /*
          This can be commented if we don't want see realtime stats,
          Log the message only if the finalizedBlock value changes
        */
        console.log(`Finalised Block: ${finalizedBlock} vs Your Block: ${yourBlock}`);
        lastFinalizedBlock = finalizedBlock;
      }

      /*
        Check if your block has achieved finality
      */
      if (finalizedBlock >= yourBlock) {
        /* 
          Flag that means block has finalized 
        */
        finalised = true;

        /*
          Get the current timestamp in seconds
        */
        const newTimestamp = Date.now();
        const totalFinalityDuration = await msToMinAndSec(newTimestamp - mintedNftTimestamp);
        console.log(`\nTotal duration required for the block to achieve finality: ${totalFinalityDuration}`);
        console.log(`\nYour Block: ${yourBlock} is now finalized!`);
      }
    }
  } catch (error) {
    console.log(`Error at ethJsonRpcMethod: ${error}`);
    process.exit(1);
  }
}
