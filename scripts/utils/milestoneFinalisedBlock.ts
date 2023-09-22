import fetch, { Response } from "node-fetch";
import { MILESTONE_API } from "./constants";
import { MilestoneData, MilestoneApiResponse } from "./types";

export async function milestoneFinalisedBlock(): Promise<MilestoneData> {
  try {
    const response: Response = await fetch(MILESTONE_API);
    const milestoneData: MilestoneApiResponse = await response.json(); // Extract JSON data from the response
    const endBlock: number = milestoneData.result.end_block;
    const timestamp: number = milestoneData.result.timestamp;

    return { endBlock, timestamp };
  } catch (error) {
    throw new Error(`Error in milestoneFinalisedBlock: ${error}`);
  }
}
