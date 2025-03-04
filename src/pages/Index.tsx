
import React, { useState, useEffect } from 'react';
import { SolanaProvider } from '@/lib/SolanaContext';
import { NFCProvider } from '@/lib/NFCContext';
import WalletCreation from '@/components/WalletCreation';
import WalletDashboard from '@/components/WalletDashboard';
import NFCPayment from '@/components/NFCPayment';
import NavBar from '@/components/NavBar';
import { Repeat } from 'lucide-react';

const Index = () => {
  const [hasWallet, setHasWallet] = useState(false);
  const [activeView, setActiveView] = useState('dashboard');

  useEffect(() => {
    const storedKey = localStorage.getItem('privateKey');
    setHasWallet(!!storedKey);
  }, []);

  // Render content based on active view
  const renderContent = () => {
    switch (activeView) {
      case 'dashboard':
        return (
          <div className="space-y-6 animate-fade-in">
            <WalletDashboard />
            <NFCPayment />
            
            <div className="bg-[#1A1F2C]/80 mx-4 p-6 rounded-xl border border-[#ffffff10] shadow-lg backdrop-blur-sm">
              <div className="flex items-center space-x-4">
                <div className="bg-gray-800/60 p-3 rounded-full">
                  <div className="text-[#9b87f5] text-xl">🔄</div>
                </div>
                <div className="flex-1">
                  <p className="text-gray-400 font-medium">No transactions yet</p>
                </div>
              </div>
            </div>
          </div>
        );
      case 'addMoney':
        return (
          <div className="p-6 mx-4 bg-[#1A1F2C]/80 rounded-xl border border-[#ffffff10] shadow-lg backdrop-blur-sm animate-fade-in">
            <h2 className="text-xl font-bold text-center text-[#9b87f5] mb-4">Add Money</h2>
            <p className="text-gray-300 text-center">To add SOL to your wallet, send funds to your wallet address.</p>
            <div className="mt-6 p-4 bg-[#121420]/70 rounded-lg border border-[#ffffff10]">
              <p className="text-sm text-gray-400 mb-2">Your wallet address:</p>
              <p className="text-xs text-gray-300 break-all bg-[#0c0e16] p-3 rounded-md">{localStorage.getItem('walletAddress') || 'Loading address...'}</p>
            </div>
            <div className="mt-6 flex justify-center">
              <div className="bg-[#9b87f5]/10 p-4 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#9b87f5]">
                  <rect width="18" height="18" x="3" y="3" rx="2" />
                  <path d="M7 7h.01" />
                  <path d="M7 17h.01" />
                  <path d="M17 7h.01" />
                  <path d="M17 17h.01" />
                  <path d="M12 12h.01" />
                </svg>
              </div>
            </div>
          </div>
        );
      case 'exchange':
        return (
          <div className="p-6 mx-4 bg-[#1A1F2C]/80 rounded-xl border border-[#ffffff10] shadow-lg backdrop-blur-sm animate-fade-in">
            <h2 className="text-xl font-bold text-center text-[#9b87f5] mb-4">Exchange</h2>
            <p className="text-gray-300 text-center">Exchange feature will be available soon.</p>
            <div className="flex justify-center mt-8">
              <div className="bg-[#9b87f5]/10 p-5 rounded-full">
                <Repeat className="h-12 w-12 text-[#9b87f5]" />
              </div>
            </div>
          </div>
        );
      case 'details':
        return (
          <div className="p-6 mx-4 bg-[#1A1F2C]/80 rounded-xl border border-[#ffffff10] shadow-lg backdrop-blur-sm animate-fade-in">
            <h2 className="text-xl font-bold text-center text-[#9b87f5] mb-4">Wallet Details</h2>
            <div className="space-y-4">
              <div className="p-5 bg-[#121420]/70 rounded-lg border border-[#ffffff10] hover:border-[#9b87f5]/30 transition-colors">
                <p className="text-sm text-gray-400 mb-1">Network</p>
                <p className="text-white font-medium flex items-center">
                  <span className="inline-block w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                  Solana {window.location.href.includes('devnet') ? 'Devnet' : 'Mainnet'}
                </p>
              </div>
              <div className="p-5 bg-[#121420]/70 rounded-lg border border-[#ffffff10] hover:border-[#9b87f5]/30 transition-colors">
                <p className="text-sm text-gray-400 mb-1">Wallet Creation Date</p>
                <p className="text-white font-medium">{new Date().toLocaleDateString()}</p>
              </div>
            </div>
          </div>
        );
      case 'more':
        return (
          <div className="p-6 mx-4 bg-[#1A1F2C]/80 rounded-xl border border-[#ffffff10] shadow-lg backdrop-blur-sm animate-fade-in">
            <h2 className="text-xl font-bold text-center text-[#9b87f5] mb-6">More Options</h2>
            <div className="space-y-4">
              <button className="w-full p-4 bg-[#121420]/70 rounded-lg border border-[#ffffff10] text-left hover:bg-[#121420] hover:border-[#9b87f5]/20 transition-all duration-200">
                <p className="text-white font-medium">Settings</p>
              </button>
              <button className="w-full p-4 bg-[#121420]/70 rounded-lg border border-[#ffffff10] text-left hover:bg-[#121420] hover:border-[#9b87f5]/20 transition-all duration-200">
                <p className="text-white font-medium">Help & Support</p>
              </button>
              <button 
                className="w-full p-4 bg-red-900/20 rounded-lg border border-red-900/30 text-left hover:bg-red-900/30 transition-all duration-200"
                onClick={() => {
                  if (confirm('Are you sure you want to reset your wallet? This action cannot be undone.')) {
                    localStorage.removeItem('privateKey');
                    localStorage.removeItem('walletAddress');
                    window.location.reload();
                  }
                }}
              >
                <p className="text-red-400 font-medium">Reset Wallet</p>
              </button>
            </div>
          </div>
        );
      default:
        return <WalletDashboard />;
    }
  };

  return (
    <SolanaProvider>
      <NFCProvider>
        <div className="min-h-screen max-w-2xl mx-auto bg-gradient-to-b from-[#1A1F2C] to-[#121420] text-white relative overflow-hidden">
          {/* Background design elements */}
          <div 
            className="absolute inset-0 z-0 opacity-20 bg-cover bg-center" 
            style={{ 
              backgroundImage: "url('/lovable-uploads/d5b2f1a6-7048-497d-87db-2b76652bbec9.png')",
              filter: "hue-rotate(280deg)" // Adjust to match our purple theme
            }}
          ></div>
          
          {/* Decorative blurs */}
          <div className="absolute top-0 left-0 w-96 h-96 bg-purple-500/10 rounded-full filter blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full filter blur-3xl"></div>
          
          <div className="relative z-10">
            {!hasWallet ? (
              <WalletCreation />
            ) : (
              <div className="flex flex-col h-screen">
                {/* Main content with removed top header */}
                <div className="flex-1 overflow-auto pb-20 pt-6">
                  {renderContent()}
                </div>
                
                {/* Bottom navigation */}
                <div className="fixed bottom-0 left-0 right-0 max-w-2xl mx-auto">
                  <NavBar onNavItemClick={setActiveView} activeView={activeView} />
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
