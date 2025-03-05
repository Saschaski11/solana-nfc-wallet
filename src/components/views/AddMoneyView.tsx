
import React from 'react';

const AddMoneyView = () => {
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
};

export default AddMoneyView;
