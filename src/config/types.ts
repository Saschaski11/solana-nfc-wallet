
export interface TokenConfig {
  name: string;
  symbol: string;
  mintAddress: string;
  decimals: number;
}

export interface NFCConfig {
  senderCardId?: string;
  receiverCardId?: string;
}

export interface AppConfig {
  token: TokenConfig;
  nfc: NFCConfig;
  network: 'mainnet-beta' | 'devnet' | 'testnet';
}
