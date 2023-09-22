import { ethers } from "ethers";
import { milestoneFinalisedBlock } from "../utils/milestoneFinalisedBlock";
import { msToMinAndSec } from "../utils/msToMinAndSec";

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

    console.log(`Waiting for your block to get finalised...\n`);

    /* 
      Store the last known finalized block value; this is to avoid log spams 
    */
    let lastFinalizedBlock: number | null = null;

    do {
      const finalizedBlock = (await milestoneFinalisedBlock()).endBlock;

      if (lastFinalizedBlock !== finalizedBlock) {
        /*
          This can be commented if we don't want see realtime stats,
          Log the message only if the finalizedBlock value changes
        */
        console.log(`Finalised Block: ${finalizedBlock} vs Your Block: ${yourBlock}`);
        lastFinalizedBlock = finalizedBlock;
      }
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
    console.log(`\nTotal time for new Milestone to be added in heimdal: ${totalMilestoneDuration}`);

    /*
      Log the total duration in mins and sec
    */
    const totalFinalityDuration = await msToMinAndSec(newTimestamp - mintedNftTimestamp);
    console.log(`Total duration required for the block to achieve finality: ${totalFinalityDuration}`);
    console.log(`\nYour Block: ${yourBlock} is now finalized!`);
  } catch (error) {
    console.log(`Error at heimdalMilestoneApi: ${error}`);
    process.exit(1);
  }
}
