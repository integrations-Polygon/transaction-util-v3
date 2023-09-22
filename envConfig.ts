import { config } from "dotenv";
config();

export const getInfuraProjectId = (): string => {
  const infuraProjectId = process.env.INFURA_PROJECT_ID;

  if (!infuraProjectId) {
    throw new Error("INFURA_PROJECT_ID environment variable is not set.");
  }

  return infuraProjectId;
};

export const getExplorerApiKeyMumbai = (): string => {
  const explorerApiKeyMumbai = process.env.EXPLORER_API_KEY_MUMBAI;

  if (!explorerApiKeyMumbai) {
    throw new Error("EXPLORER_API_KEY_MUMBAI environment variable is not set.");
  }

  return explorerApiKeyMumbai;
};

export const getPrivateKeyMumbai = (): string => {
  const privateKeyMumbai = process.env.PRIVATE_KEY_MUMBAI;

  if (!privateKeyMumbai) {
    throw new Error("PRIVATE_KEY_MUMBAI environment variable is not set.");
  }

  return privateKeyMumbai;
};
