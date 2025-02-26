
import { AppConfig } from './types';

const config: AppConfig = {
  // Default configuration - users should modify this
  token: {
    name: "My Custom Token",
    symbol: "MCT",
    mintAddress: "", // User needs to provide their token's mint address
    decimals: 9,
  },
  nfc: {
    senderCardId: "", // User needs to provide their NFC card ID
    receiverCardId: "", // User needs to provide their NFC card ID
  },
  network: "devnet" // Change to mainnet-beta for production
};

export default config;
