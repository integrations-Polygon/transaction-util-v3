import { ethers } from "ethers";
import { milestoneFinalisedBlock } from "./utils/milestoneFinalisedBlock";

export async function heimdalMilestoneApi(
  tx: ethers.providers.TransactionResponse,
  mintedNftTimestamp: number
): Promise<void> {
  try {
    /*
      HEIMDAL MILESTONE API CALL
    */
    const { timestamp } = await milestoneFinalisedBlock();

    /* 
      Users block number 
    */
    const yourBlock = tx.blockNumber;

    /*
      Check if the transaction and transaction block number exist
    */
    if (!tx || !yourBlock) throw new Error("Transaction or block number is undefined");

    console.log(`Waiting for your block to get finalised...`);

    do {
      /*
        This can be commented if we don't want see realtime stats
      */
      console.log(
        `Finalised Block: ${(await milestoneFinalisedBlock()).endBlock} vs Your Block: ${yourBlock}`
      );
    } while (
      /*
        Check if your block has achieved finality
      */
      yourBlock >= (await milestoneFinalisedBlock()).endBlock
    );

    /*
      Get the current timestamp in seconds
    */
    const newTimestamp = Date.now() / 1000;
    console.log(`Total time for new Milestone to be added in heimdal: ${(newTimestamp - timestamp) / 60000}`);

    /*
      Log the total duration in mins
    */
    console.log(
      `\nThe total duration required for the block to achieve finality: ${
        (newTimestamp - mintedNftTimestamp) / 60000
      }`
    );
    console.log(`Your Block: ${yourBlock} is now finalized!`);
  } catch (error) {
    console.log(`Error at heimdalMilestoneApi: ${error}`);
    process.exit(1);
  }
}
