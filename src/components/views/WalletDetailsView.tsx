
import React from 'react';

const WalletDetailsView = () => {
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
};

export default WalletDetailsView;
