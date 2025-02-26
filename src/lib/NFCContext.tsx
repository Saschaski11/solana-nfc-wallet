
import React, { createContext, useContext, useEffect, useState } from 'react';

interface NFCContextType {
  isEnabled: boolean;
  startScanning: () => Promise<void>;
  stopScanning: () => Promise<void>;
  writeTag: (data: any) => Promise<void>;
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

  useEffect(() => {
    checkNFCStatus();
  }, []);

  const checkNFCStatus = async () => {
    try {
      // For web, we'll just check if the NDEFReader API is available
      setIsEnabled('NDEFReader' in window);
    } catch (error) {
      console.error('Error checking NFC status:', error);
      setIsEnabled(false);
    }
  };

  const startScanning = async () => {
    try {
      if (!isEnabled) throw new Error('NFC is not enabled');
      // Implementation will vary based on platform (web/mobile)
      console.log('Started NFC scanning');
    } catch (error) {
      console.error('Error starting NFC scan:', error);
      throw error;
    }
  };

  const stopScanning = async () => {
    try {
      if (!isEnabled) return;
      // Implementation will vary based on platform (web/mobile)
      console.log('Stopped NFC scanning');
    } catch (error) {
      console.error('Error stopping NFC scan:', error);
      throw error;
    }
  };

  const writeTag = async (data: any) => {
    try {
      if (!isEnabled) throw new Error('NFC is not enabled');
      // Implementation will vary based on platform (web/mobile)
      console.log('Writing to NFC tag:', data);
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
