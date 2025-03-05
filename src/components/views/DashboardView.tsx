
import React from 'react';
import WalletDashboard from '@/components/WalletDashboard';
import NFCPayment from '@/components/NFCPayment';

const DashboardView = () => {
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
};

export default DashboardView;
