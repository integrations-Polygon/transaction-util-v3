import { ethers } from "ethers";
import { milestoneFinalisedBlock } from "./utils/milestoneFinalisedBlock";
import { msToMinAndSec } from "./utils/msToMinAndSec";

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
      Get the current timestamp in milisec
    */
    const newTimestamp = Date.now();
    const totalMilestoneDuration = await msToMinAndSec(newTimestamp - timestamp);
    console.log(`Total time for new Milestone to be added in heimdal: ${totalMilestoneDuration}`);

    /*
      Log the total duration in mins and sec
    */
    const totalFinalityDuration = await msToMinAndSec(newTimestamp - mintedNftTimestamp);
    console.log(`\nThe total duration required for the block to achieve finality: ${totalFinalityDuration}`);
    console.log(`Your Block: ${yourBlock} is now finalized!`);
  } catch (error) {
    console.log(`Error at heimdalMilestoneApi: ${error}`);
    process.exit(1);
  }
}
