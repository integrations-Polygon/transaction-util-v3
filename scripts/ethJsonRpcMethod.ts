import axios from "axios";
import { MUMBAI_RPC_URL } from "./utils/constants";

export async function ethJsonRpcMethod(yourBlock: number, mintedNftTimestamp: number): Promise<void> {
  try {
    console.log(`Waiting for your block to get finalised...`);
    /* 
      Set flag for block finality 
    */
    let finalised: boolean = false;
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
      const finalizedBlock = parseInt(response.result.number, 16);

      /*
        This can be commented if we don't want see realtime stats
      */
      console.log(`Finalised Block: ${finalizedBlock} vs Your Block: ${yourBlock}`);

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
        const newTimestamp = Date.now() / 60000;
        console.log(
          `\nThe total duration required for the block to achieve finality: ${
            (newTimestamp - mintedNftTimestamp) / 60000
          } mins`
        );
        console.log(`Your Block: ${yourBlock} is now finalized!`);
      }
    }
  } catch (error) {
    console.log(`Error at ethJsonRpcMethod: ${error}`);
    process.exit(1);
  }
}
