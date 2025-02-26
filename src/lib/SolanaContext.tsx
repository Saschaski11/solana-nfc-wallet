
import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  Connection, 
  PublicKey, 
  Transaction, 
  SystemProgram, 
  LAMPORTS_PER_SOL, 
  Keypair 
} from '@solana/web3.js';
import { getAssociatedTokenAddress, createAssociatedTokenAccountInstruction, createTransferInstruction } from '@solana/spl-token';
import bs58 from 'bs58';
import config from '@/config/config';

interface SolanaContextType {
  balance: number;
  tokenBalance: number;
  publicKey: string | null;
  privateKey: string | null;
  createWallet: () => Promise<void>;
  importWallet: (privateKeyString: string) => Promise<void>;
  sendTransaction: (recipientAddress: string, amount: number) => Promise<string>;
  sendTokens: (recipientAddress: string, amount: number) => Promise<string>;
  connection: Connection;
}

const SolanaContext = createContext<SolanaContextType | undefined>(undefined);

export const useSolana = () => {
  const context = useContext(SolanaContext);
  if (!context) {
    throw new Error('useSolana must be used within a SolanaProvider');
  }
  return context;
};

export const SolanaProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [balance, setBalance] = useState(0);
  const [tokenBalance, setTokenBalance] = useState(0);
  const [publicKey, setPublicKey] = useState<string | null>(null);
  const [privateKey, setPrivateKey] = useState<string | null>(null);
  const connection = new Connection(
    config.network === 'mainnet-beta' 
      ? 'https://api.mainnet-beta.solana.com' 
      : 'https://api.devnet.solana.com',
    'confirmed'
  );

  useEffect(() => {
    const fetchBalances = async () => {
      if (publicKey) {
        try {
          // Fetch SOL balance
          const solBalance = await connection.getBalance(new PublicKey(publicKey));
          setBalance(solBalance / LAMPORTS_PER_SOL);

          // Fetch token balance if mint address is configured
          if (config.token.mintAddress) {
            const tokenMint = new PublicKey(config.token.mintAddress);
            const tokenAccount = await getAssociatedTokenAddress(
              tokenMint,
              new PublicKey(publicKey)
            );
            
            try {
              const tokenAccountInfo = await connection.getTokenAccountBalance(tokenAccount);
              setTokenBalance(
                Number(tokenAccountInfo.value.amount) / Math.pow(10, config.token.decimals)
              );
            } catch (error) {
              console.log('No token account found - balance is 0');
              setTokenBalance(0);
            }
          }
        } catch (error) {
          console.error('Error fetching balances:', error);
        }
      }
    };

    if (publicKey) {
      fetchBalances();
      const id = setInterval(fetchBalances, 10000);
      return () => clearInterval(id);
    }
  }, [publicKey, connection]);

  const createWallet = async () => {
    try {
      const keyPair = Keypair.generate();
      const privateKeyString = bs58.encode(keyPair.secretKey);
      const publicKeyString = keyPair.publicKey.toString();
      
      setPrivateKey(privateKeyString);
      setPublicKey(publicKeyString);
      
      localStorage.setItem('privateKey', privateKeyString);
    } catch (error) {
      console.error('Error creating wallet:', error);
      throw error;
    }
  };

  const importWallet = async (privateKeyString: string) => {
    try {
      const decodedPrivateKey = bs58.decode(privateKeyString);
      const keyPair = Keypair.fromSecretKey(decodedPrivateKey);
      
      setPrivateKey(privateKeyString);
      setPublicKey(keyPair.publicKey.toString());
      
      localStorage.setItem('privateKey', privateKeyString);
    } catch (error) {
      console.error('Error importing wallet:', error);
      throw error;
    }
  };

  const sendTransaction = async (recipientAddress: string, amount: number) => {
    if (!privateKey || !publicKey) throw new Error('Wallet not initialized');

    try {
      const decodedPrivateKey = bs58.decode(privateKey);
      const senderKeypair = Keypair.fromSecretKey(decodedPrivateKey);
      
      const transaction = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey: senderKeypair.publicKey,
          toPubkey: new PublicKey(recipientAddress),
          lamports: amount * LAMPORTS_PER_SOL,
        })
      );

      const signature = await connection.sendTransaction(transaction, [senderKeypair]);
      await connection.confirmTransaction(signature);

      return signature;
    } catch (error) {
      console.error('Error sending transaction:', error);
      throw error;
    }
  };

  const sendTokens = async (recipientAddress: string, amount: number) => {
    if (!privateKey || !publicKey || !config.token.mintAddress) {
      throw new Error('Wallet not initialized or token not configured');
    }

    try {
      const decodedPrivateKey = bs58.decode(privateKey);
      const senderKeypair = Keypair.fromSecretKey(decodedPrivateKey);
      const tokenMint = new PublicKey(config.token.mintAddress);
      const recipientPublicKey = new PublicKey(recipientAddress);

      // Get token accounts
      const senderATA = await getAssociatedTokenAddress(
        tokenMint,
        senderKeypair.publicKey
      );
      const recipientATA = await getAssociatedTokenAddress(
        tokenMint,
        recipientPublicKey
      );

      const transaction = new Transaction();

      // Check if recipient has an ATA and create if needed
      try {
        await connection.getTokenAccountBalance(recipientATA);
      } catch {
        transaction.add(
          createAssociatedTokenAccountInstruction(
            senderKeypair.publicKey,
            recipientATA,
            recipientPublicKey,
            tokenMint
          )
        );
      }

      // Add token transfer instruction
      transaction.add(
        createTransferInstruction(
          senderATA,
          recipientATA,
          senderKeypair.publicKey,
          amount * Math.pow(10, config.token.decimals)
        )
      );

      const signature = await connection.sendTransaction(transaction, [senderKeypair]);
      await connection.confirmTransaction(signature);

      return signature;
    } catch (error) {
      console.error('Error sending tokens:', error);
      throw error;
    }
  };

  return (
    <SolanaContext.Provider
      value={{
        balance,
        tokenBalance,
        publicKey,
        privateKey,
        createWallet,
        importWallet,
        sendTransaction,
        sendTokens,
        connection,
      }}
    >
      {children}
    </SolanaContext.Provider>
  );
};
