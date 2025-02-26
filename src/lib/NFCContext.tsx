
import React, { createContext, useContext, useEffect, useState } from 'react';
import config from '@/config/config';

interface NFCContextType {
  isEnabled: boolean;
  startScanning: () => Promise<string>;
  stopScanning: () => Promise<void>;
  writeTag: (data: NFCData) => Promise<void>;
}

interface NFCData {
  type: 'sender' | 'receiver';
  publicKey?: string;
  amount?: number;
}

const NFCContext = createContext<NFCContextType | undefined>(undefined);

export const useNFC = () => {
  const context = useContext(NFCContext);
  if (!context) {
    throw new Error('useNFC must be used within an NFCProvider');
  }
  return context;
};

export const NFCProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isEnabled, setIsEnabled] = useState(false);
  const [ndef, setNdef] = useState<any>(null);

  useEffect(() => {
    checkNFCStatus();
  }, []);

  const checkNFCStatus = async () => {
    try {
      if ('NDEFReader' in window) {
        const reader = new (window as any).NDEFReader();
        setNdef(reader);
        setIsEnabled(true);
      } else {
        setIsEnabled(false);
      }
    } catch (error) {
      console.error('Error checking NFC status:', error);
      setIsEnabled(false);
    }
  };

  const startScanning = async (): Promise<string> => {
    if (!isEnabled || !ndef) {
      throw new Error('NFC is not enabled');
    }

    try {
      return new Promise((resolve, reject) => {
        ndef.scan()
          .then(() => {
            ndef.addEventListener("reading", ({ serialNumber }: { serialNumber: string }) => {
              resolve(serialNumber);
            });
          })
          .catch((error: Error) => {
            console.error('Error starting NFC scan:', error);
            reject(error);
          });
      });
    } catch (error) {
      console.error('Error in NFC scanning:', error);
      throw error;
    }
  };

  const stopScanning = async () => {
    try {
      if (!isEnabled || !ndef) return;
      await ndef.stop();
      console.log('Stopped NFC scanning');
    } catch (error) {
      console.error('Error stopping NFC scan:', error);
      throw error;
    }
  };

  const writeTag = async (data: NFCData) => {
    if (!isEnabled || !ndef) {
      throw new Error('NFC is not enabled');
    }

    try {
      const message = {
        records: [{
          recordType: "mime",
          mediaType: "application/json",
          data: JSON.stringify({
            ...data,
            timestamp: new Date().toISOString(),
            appId: 'solana-nfc-wallet'
          })
        }]
      };

      await ndef.write(message);
      console.log('Successfully wrote to NFC tag:', data);
    } catch (error) {
      console.error('Error writing to NFC tag:', error);
      throw error;
    }
  };

  return (
    <NFCContext.Provider value={{ isEnabled, startScanning, stopScanning, writeTag }}>
      {children}
    </NFCContext.Provider>
  );
};
