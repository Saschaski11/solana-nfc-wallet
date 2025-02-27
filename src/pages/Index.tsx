
import React, { useState, useEffect } from 'react';
import { SolanaProvider } from '@/lib/SolanaContext';
import { NFCProvider } from '@/lib/NFCContext';
import WalletCreation from '@/components/WalletCreation';
import WalletDashboard from '@/components/WalletDashboard';
import NFCPayment from '@/components/NFCPayment';
import { Wallet, Shield } from 'lucide-react';

const Index = () => {
  const [hasWallet, setHasWallet] = useState(false);

  useEffect(() => {
    const storedKey = localStorage.getItem('privateKey');
    setHasWallet(!!storedKey);
  }, []);

  return (
    <SolanaProvider>
      <NFCProvider>
        <div className="min-h-screen bg-gradient-to-b from-[#162955] via-[#1A1F2C] to-[#1A1F2C]">
          <div className="container mx-auto max-w-md px-4 pb-8">
            <div className="pt-8 pb-6">
              <div className="flex items-center justify-center gap-2">
                <Shield className="h-8 w-8 text-[#9b87f5]" />
                <h1 className="text-3xl font-bold text-center bg-gradient-to-r from-[#9b87f5] to-[#D6BCFA] bg-clip-text text-transparent">
                  Solana Tap
                </h1>
              </div>
              <p className="text-center text-gray-400 mt-2">Secure NFC Wallet</p>
            </div>
            
            <div className="rounded-2xl overflow-hidden backdrop-blur-md bg-[#1E293B]/70 border border-[#ffffff10] shadow-xl animate-fade-in">
              {!hasWallet ? (
                <WalletCreation />
              ) : (
                <div className="space-y-6 animate-slide-up">
                  <WalletDashboard />
                  <NFCPayment />
                </div>
              )}
            </div>
          </div>
        </div>
      </NFCProvider>
    </SolanaProvider>
  );
};

export default Index;
