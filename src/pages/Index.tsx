
import React, { useState, useEffect } from 'react';
import { SolanaProvider } from '@/lib/SolanaContext';
import { NFCProvider } from '@/lib/NFCContext';
import WalletCreation from '@/components/WalletCreation';
import DashboardView from '@/components/views/DashboardView';
import AddMoneyView from '@/components/views/AddMoneyView';
import ExchangeView from '@/components/views/ExchangeView';
import WalletDetailsView from '@/components/views/WalletDetailsView';
import MoreOptionsView from '@/components/views/MoreOptionsView';
import NavBar from '@/components/NavBar';

const Index = () => {
  const [hasWallet, setHasWallet] = useState(false);
  const [activeView, setActiveView] = useState('dashboard');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedKey = localStorage.getItem('privateKey');
    setHasWallet(!!storedKey);
    
    // Add a small delay to simulate loading and show animation
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);

  // Render content based on active view
  const renderContent = () => {
    switch (activeView) {
      case 'dashboard':
        return <DashboardView />;
      case 'addMoney':
        return <AddMoneyView />;
      case 'exchange':
        return <ExchangeView />;
      case 'details':
        return <WalletDetailsView />;
      case 'more':
        return <MoreOptionsView />;
      default:
        return <DashboardView />;
    }
  };

  return (
    <SolanaProvider>
      <NFCProvider>
        <div className="min-h-screen max-w-md mx-auto bg-gradient-to-b from-[#121420] to-[#0a0b12] text-white relative overflow-hidden">
          {/* Status bar - simplified version */}
          <div className="h-6 w-full"></div>
          
          {/* Background design elements */}
          <div className="fixed inset-0 z-0">
            {/* Subtle gradient orbs */}
            <div className="absolute top-0 left-0 w-96 h-96 bg-[#9b87f5]/5 rounded-full filter blur-3xl"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-indigo-500/5 rounded-full filter blur-3xl"></div>
          </div>
          
          <div className="relative z-10">
            {/* Loading state or wallet creation */}
            {isLoading ? (
              <div className="flex items-center justify-center h-screen">
                <div className="w-8 h-8 border-2 border-[#9b87f5] rounded-full border-t-transparent animate-spin"></div>
              </div>
            ) : !hasWallet ? (
              <WalletCreation />
            ) : (
              <div className="flex flex-col h-screen">
                {/* Main content */}
                <div className="flex-1 overflow-auto pb-20">
                  {renderContent()}
                </div>
                
                {/* Bottom navigation */}
                <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto">
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
