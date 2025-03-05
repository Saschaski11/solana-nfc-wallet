
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

  useEffect(() => {
    const storedKey = localStorage.getItem('privateKey');
    setHasWallet(!!storedKey);
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
