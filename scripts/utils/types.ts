import { ethers } from "ethers";

export interface Web3Setup {
  provider: ethers.providers.InfuraProvider;
  signer: ethers.Wallet;
}

export interface GasData {
  maxFee: number;
  maxPriorityFee: number;
}

export interface GasApiResponse {
  safeLow: {
    maxPriorityFee: number;
    maxFee: number;
  };
  standard: {
    maxPriorityFee: number;
    maxFee: number;
  };
  fast: {
    maxPriorityFee: number;
    maxFee: number;
  };
  estimatedBaseFee: number;
  blockTime: number;
  blockNumber: number;
}

export interface MilestoneData {
  endBlock: number;
  timestamp: number;
}

export interface MilestoneApiResponse {
  height: string;
  result: {
    proposer: string;
    start_block: number;
    end_block: number;
    hash: string;
    bor_chain_id: string;
    milestone_id: string;
    timestamp: number;
  };
}

export interface MintData {
  tx: ethers.providers.TransactionResponse;
  mintedNftTimestamp: number;
  provider: ethers.providers.InfuraProvider;
}
