
import React, { useState, useEffect } from 'react';
import { SolanaProvider } from '@/lib/SolanaContext';
import { NFCProvider } from '@/lib/NFCContext';
import WalletCreation from '@/components/WalletCreation';
import WalletDashboard from '@/components/WalletDashboard';
import NFCPayment from '@/components/NFCPayment';
import NavBar from '@/components/NavBar';
import { PlusCircle, Repeat, LayoutList, MoreHorizontal } from 'lucide-react';

const Index = () => {
  const [hasWallet, setHasWallet] = useState(false);

  useEffect(() => {
    const storedKey = localStorage.getItem('privateKey');
    setHasWallet(!!storedKey);
  }, []);

  return (
    <SolanaProvider>
      <NFCProvider>
        <div className="min-h-screen bg-gradient-to-b from-[#1A1F2C] to-[#121420] text-white relative overflow-hidden">
          {/* Background image overlay */}
          <div 
            className="absolute inset-0 z-0 opacity-20 bg-cover bg-center" 
            style={{ 
              backgroundImage: "url('/lovable-uploads/d5b2f1a6-7048-497d-87db-2b76652bbec9.png')",
              filter: "hue-rotate(280deg)" // Adjust to match our purple theme
            }}
          ></div>
          
          <div className="relative z-10">
            {!hasWallet ? (
              <WalletCreation />
            ) : (
              <div className="flex flex-col h-screen">
                {/* Top header with search bar */}
                <div className="pt-8 px-4 pb-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center">
                        <img 
                          src="/lovable-uploads/194b2393-6237-4c28-abfe-0af79aad43b6.png" 
                          alt="Solana Tap Logo" 
                          className="h-6 w-6"
                        />
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="bg-[#9b87f5]/20 p-2 rounded-full">
                        <div className="h-5 w-5 text-[#9b87f5]">≡</div>
                      </div>
                      <div className="bg-[#9b87f5]/20 p-2 rounded-full">
                        <div className="h-5 w-5 text-[#9b87f5]">☰</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-4 relative">
                    <div className="flex justify-center">
                      <p className="text-sm text-gray-400">Main • SOL</p>
                    </div>
                    <div className="text-center mt-2">
                      <h1 className="text-6xl font-bold">SOL</h1>
                    </div>
                  </div>

                  <div className="mt-6 mb-4 flex justify-center">
                    <button className="bg-[#9b87f5]/20 text-[#9b87f5] rounded-full py-2 px-8">
                      Accounts
                    </button>
                  </div>
                </div>
                
                {/* Main content */}
                <div className="flex-1 overflow-auto">
                  <WalletDashboard />
                  <NFCPayment />
                  
                  <div className="bg-[#1A1F2C]/80 m-4 p-6 rounded-xl border border-[#ffffff10]">
                    <div className="flex items-center space-x-4">
                      <div className="bg-gray-800 p-3 rounded-full">
                        <div className="text-gray-400 text-xl">🔄</div>
                      </div>
                      <div className="flex-1">
                        <p className="text-gray-400">No transactions yet</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Bottom navigation */}
                <div className="pt-4">
                  <NavBar />
                </div>
              </div>
            )}
          </div>
        </div>
      </NFCProvider>
    </SolanaProvider>
  );
};

export default Index;
