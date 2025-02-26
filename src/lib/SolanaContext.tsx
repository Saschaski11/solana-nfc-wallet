
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Connection, PublicKey, Transaction, SystemProgram, LAMPORTS_PER_SOL, Keypair } from '@solana/web3.js';
import bs58 from 'bs58';

interface SolanaContextType {
  balance: number;
  publicKey: string | null;
  privateKey: string | null;
  createWallet: () => Promise<void>;
  importWallet: (privateKeyString: string) => Promise<void>;
  sendTransaction: (recipientAddress: string, amount: number) => Promise<string>;
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
  const [publicKey, setPublicKey] = useState<string | null>(null);
  const [privateKey, setPrivateKey] = useState<string | null>(null);
  const connection = new Connection('https://api.devnet.solana.com', 'confirmed');

  useEffect(() => {
    const fetchBalance = async () => {
      if (publicKey) {
        try {
          const balance = await connection.getBalance(new PublicKey(publicKey));
          setBalance(balance / LAMPORTS_PER_SOL);
        } catch (error) {
          console.error('Error fetching balance:', error);
        }
      }
    };

    if (publicKey) {
      fetchBalance();
      const id = setInterval(fetchBalance, 10000);
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

  return (
    <SolanaContext.Provider
      value={{
        balance,
        publicKey,
        privateKey,
        createWallet,
        importWallet,
        sendTransaction,
        connection,
      }}
    >
      {children}
    </SolanaContext.Provider>
  );
};
