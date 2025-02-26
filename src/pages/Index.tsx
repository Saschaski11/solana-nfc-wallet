
import React, { useState, useEffect } from 'react';
import { SolanaProvider } from '@/lib/SolanaContext';
import { NFCProvider } from '@/lib/NFCContext';
import WalletCreation from '@/components/WalletCreation';
import WalletDashboard from '@/components/WalletDashboard';
import NFCPayment from '@/components/NFCPayment';

const Index = () => {
  const [hasWallet, setHasWallet] = useState(false);

  useEffect(() => {
    const storedKey = localStorage.getItem('privateKey');
    setHasWallet(!!storedKey);
  }, []);

  return (
    <SolanaProvider>
      <NFCProvider>
        <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
          <div className="container mx-auto max-w-md p-4">
            <div className="mb-8 pt-8">
              <h1 className="text-3xl font-bold text-center bg-gradient-to-r from-blue-300 to-blue-100 bg-clip-text text-transparent">
                Solana NFC Wallet
              </h1>
            </div>
            <div className="glass rounded-2xl p-6 animate-fade-in">
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
