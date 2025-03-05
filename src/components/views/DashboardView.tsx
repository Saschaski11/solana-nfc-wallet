
import React from 'react';
import { useSolana } from '@/lib/SolanaContext';
import { Copy } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

const DashboardView = () => {
  const { balance, tokenBalance, publicKey } = useSolana();

  const copyAddress = () => {
    if (publicKey) {
      navigator.clipboard.writeText(publicKey);
      toast({
        description: "Address copied to clipboard",
      });
    }
  };

  // Short display version of public key
  const shortPublicKey = publicKey ? 
    `${publicKey.slice(0, 6)}...${publicKey.slice(-4)}` : 
    'Loading...';

  return (
    <div className="space-y-6 animate-fade-in px-4 pt-6">
      {/* Profile Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-gradient-to-r from-[#9b87f5] to-[#D6BCFA] rounded-full flex items-center justify-center text-white font-bold">
            {publicKey ? publicKey.slice(0, 2) : ''}
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h2 className="text-lg font-bold">My Wallet</h2>
              <div className="bg-[#9b87f5]/10 px-2 py-0.5 rounded-md">
                <span className="text-xs text-[#9b87f5] font-medium">{shortPublicKey}</span>
              </div>
              <button 
                onClick={copyAddress} 
                className="text-gray-400 hover:text-[#9b87f5] transition-colors"
              >
                <Copy size={14} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Balance Card */}
      <div className="bg-white/5 backdrop-blur-md rounded-xl border border-white/10 p-6">
        <div className="mb-2 text-gray-400 text-sm">Balance</div>
        <div className="flex items-baseline">
          <h1 className="text-4xl font-bold">${tokenBalance.toFixed(2)}</h1>
          <span className="ml-2 text-xs text-green-400">+ 0.00%</span>
        </div>
        <div className="mt-1 text-gray-400 text-sm">{balance.toFixed(5)} SOL</div>
      </div>
      
      {/* Quick Actions */}
      <div className="grid grid-cols-4 gap-3 mt-6">
        <QuickAction icon="💳" label="Add" />
        <QuickAction icon="↔️" label="Swap" />
        <QuickAction icon="⬇️" label="Receive" />
        <QuickAction icon="⬆️" label="Send" />
      </div>
      
      {/* Recent Activity */}
      <div className="mt-6">
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-lg font-semibold">Recent Activity</h3>
          <button className="text-[#9b87f5] text-sm">See all</button>
        </div>
        
        <div className="bg-white/5 backdrop-blur-md rounded-xl border border-white/10 p-4">
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
    </div>
  );
};

// Quick Action Button Component
const QuickAction = ({ icon, label }: { icon: string; label: string }) => (
  <div className="flex flex-col items-center">
    <div className="w-12 h-12 bg-[#9b87f5]/10 rounded-full flex items-center justify-center mb-2">
      <span className="text-xl">{icon}</span>
    </div>
    <span className="text-xs">{label}</span>
  </div>
);

export default DashboardView;
