import { HardhatUserConfig } from "hardhat/config";
import "hardhat-deploy";
import "@nomiclabs/hardhat-ethers";
import "@nomiclabs/hardhat-waffle";
import "solidity-coverage";
import "@typechain/hardhat";
import "hardhat-gas-reporter";
import "@nomiclabs/hardhat-etherscan";
import { getExplorerApiKeyMumbai, getPrivateKeyMumbai } from "./envConfig";
import { MUMBAI_RPC_URL } from "./scripts/utils/constants";

const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.21",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  namedAccounts: {
    deployer: 0,
    admin: 1,
    admin1: 2,
    user: 3,
    user1: 4,
  },
  networks: {
    mumbai: {
      url: MUMBAI_RPC_URL,
      gasPrice: "auto",
      accounts: getPrivateKeyMumbai() !== undefined ? [getPrivateKeyMumbai()] : [],
    },
  },
  paths: {
    sources: "src",
  },
  typechain: {
    outDir: "src/types",
    target: "ethers-v5",
  },
  gasReporter: {
    enabled: process.env.REPORT_GAS !== undefined,
    currency: "USD",
  },
  etherscan: {
    apiKey: getExplorerApiKeyMumbai() || "",
  },
};

export default config;
