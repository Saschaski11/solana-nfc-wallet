
import React from 'react';

const MoreOptionsView = () => {
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
};

export default MoreOptionsView;
