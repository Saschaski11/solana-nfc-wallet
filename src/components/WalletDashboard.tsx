
import React from 'react';
import { useSolana } from '@/lib/SolanaContext';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Copy, Wallet, Coins } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';
import config from '@/config/config';

const WalletDashboard = () => {
  const { balance, tokenBalance, publicKey } = useSolana();

  const copyAddress = () => {
    if (publicKey) {
      navigator.clipboard.writeText(publicKey);
      toast({
        description: "Address copied to clipboard",
      });
    }
  };

  return (
    <div className="px-4 pt-4 pb-2">
      <Card className="p-6 bg-gradient-to-br from-[#1E293B] to-[#162037] border-[#ffffff10]">
        <div className="space-y-6">
          <div className="text-center">
            <h2 className="text-xl font-bold text-[#9b87f5] mb-4">Wallet Balance</h2>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-3 rounded-lg bg-[#1A1F2C]/70 border border-[#ffffff10]">
              <div className="flex justify-center mb-2">
                <Wallet className="h-5 w-5 text-[#9b87f5]" />
              </div>
              <p className="text-sm text-gray-400 mb-1">SOL Balance</p>
              <h2 className="text-xl font-bold text-white">{balance.toFixed(2)}</h2>
            </div>
            
            <div className="text-center p-3 rounded-lg bg-[#1A1F2C]/70 border border-[#ffffff10]">
              <div className="flex justify-center mb-2">
                <Coins className="h-5 w-5 text-[#9b87f5]" />
              </div>
              <p className="text-sm text-gray-400 mb-1">{config.token.symbol}</p>
              <h2 className="text-xl font-bold text-white">{tokenBalance.toFixed(2)}</h2>
            </div>
          </div>

          <div className="pt-4 border-t border-[#ffffff10]">
            <p className="text-sm text-gray-400 mb-2">Wallet Address</p>
            <div className="flex items-center gap-2 bg-[#1A1F2C]/60 p-2 rounded-lg">
              <code className="flex-1 text-xs truncate text-gray-300">
                {publicKey}
              </code>
              <Button
                variant="ghost"
                size="icon"
                onClick={copyAddress}
                className="h-8 w-8 text-[#9b87f5] hover:bg-[#9b87f5]/20 hover:text-[#D6BCFA]"
              >
                <Copy className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default WalletDashboard;
