import { config } from "dotenv";
config();

export const getInfuraProjectId = (): string => {
  const infuraProjectId = process.env.INFURA_PROJECT_ID;

  if (!infuraProjectId) {
    throw new Error("INFURA_PROJECT_ID environment variable is not set.");
  }

  return infuraProjectId;
};

export const getExplorerApiKeyMatic = (): string => {
  const explorerApiKeyMatic = process.env.EXPLORER_API_KEY_MATIC;

  if (!explorerApiKeyMatic) {
    throw new Error("EXPLORER_API_KEY_MATIC environment variable is not set.");
  }

  return explorerApiKeyMatic;
};

export const getPrivateKeyMatic = (): string => {
  const privateKeyMatic = process.env.PRIVATE_KEY_MATIC;

  if (!privateKeyMatic) {
    throw new Error("PRIVATE_KEY_MATIC environment variable is not set.");
  }

  return privateKeyMatic;
};
