
import React from 'react';
import { useSolana } from '@/lib/SolanaContext';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Copy, ArrowUp, ArrowDown, Coins } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';
import config from '@/config/config';

const WalletDashboard = () => {
  const { balance, tokenBalance, publicKey } = useSolana();
  
  // Calculate approximate number of transactions remaining
  // Assuming average transaction fee is around 0.000005 SOL
  const transactionFee = 0.000005;
  const transactionsLeft = Math.floor(balance / transactionFee);

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
            <h2 className="text-xl font-bold text-[#9b87f5] mb-4">Your Assets</h2>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-4 rounded-xl bg-[#1A1F2C]/90 border border-[#ffffff10] shadow-lg">
              <div className="flex justify-center mb-2">
                <ArrowUp className="h-5 w-5 text-[#9b87f5]" />
                <ArrowDown className="h-5 w-5 text-[#9b87f5] ml-1" />
              </div>
              <p className="text-sm text-gray-400 mb-1">Transactions Left</p>
              <h2 className="text-2xl font-bold text-white">{transactionsLeft.toLocaleString()}</h2>
              <p className="text-xs text-gray-500 mt-1">{balance.toFixed(4)} SOL</p>
            </div>
            
            <div className="text-center p-4 rounded-xl bg-[#1A1F2C]/90 border border-[#ffffff10] shadow-lg">
              <div className="flex justify-center mb-2">
                <Coins className="h-5 w-5 text-[#9b87f5]" />
              </div>
              <p className="text-sm text-gray-400 mb-1">{config.token.symbol}</p>
              <h2 className="text-2xl font-bold text-white">{tokenBalance.toFixed(2)}</h2>
              <p className="text-xs text-gray-500 mt-1">Token Balance</p>
            </div>
          </div>

          <div className="pt-4 border-t border-[#ffffff10]">
            <p className="text-sm text-gray-400 mb-2">Wallet Address</p>
            <div className="flex items-center gap-2 bg-[#1A1F2C]/90 p-3 rounded-lg">
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
