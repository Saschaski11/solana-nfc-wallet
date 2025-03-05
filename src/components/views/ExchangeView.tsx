
import React, { useState, useEffect } from 'react';
import { useSolana } from '@/lib/SolanaContext';
import { ArrowDown } from 'lucide-react';
import config from '@/config/config';
import { toast } from '@/components/ui/use-toast';

const ExchangeView = () => {
  const { balance, tokenBalance, publicKey, solanaPrice, solToUsd, usdToSol } = useSolana();
  const [amount, setAmount] = useState('');
  const [estimatedOutput, setEstimatedOutput] = useState('');

  // MCT token value is set to 1 USD
  const MCT_USD_VALUE = 1;
  
  // Calculate how many MCT tokens per SOL based on Solana's current price
  const mctPerSol = solanaPrice / MCT_USD_VALUE;

  // Update estimated output when amount or prices change
  useEffect(() => {
    if (amount && !isNaN(parseFloat(amount))) {
      const solAmount = parseFloat(amount);
      const mctAmount = solAmount * mctPerSol;
      setEstimatedOutput(mctAmount.toFixed(2));
    } else {
      setEstimatedOutput('');
    }
  }, [amount, mctPerSol]);

  const handleSwap = () => {
    if (!amount || parseFloat(amount) <= 0) {
      toast({
        description: "Please enter a valid amount to swap",
        variant: "destructive"
      });
      return;
    }
    
    if (parseFloat(amount) > balance) {
      toast({
        description: "Insufficient SOL balance",
        variant: "destructive"
      });
      return;
    }

    toast({
      description: "Swap functionality not implemented yet",
    });
  };

  return (
    <div className="p-6 animate-fade-in">
      <h2 className="text-xl font-bold text-center mb-6">Swap</h2>
      
      {/* Swap Card */}
      <div className="bg-white/5 backdrop-blur-md rounded-xl border border-white/10 p-4">
        {/* From Token */}
        <div className="mb-2">
          <div className="flex justify-between text-sm text-gray-400 mb-2">
            <span>From</span>
            <span>Balance: {balance.toFixed(5)} SOL (${solToUsd(balance).toFixed(2)})</span>
          </div>
          
          <div className="flex items-center bg-white/5 rounded-lg p-3">
            <div className="flex-1">
              <input
                type="number"
                placeholder="0.0"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full bg-transparent text-white text-xl font-medium focus:outline-none"
              />
            </div>
            <div className="flex items-center space-x-2 bg-white/10 px-3 py-2 rounded-lg">
              <div className="w-6 h-6 bg-[#9b87f5] rounded-full"></div>
              <span className="font-medium">SOL</span>
            </div>
          </div>
        </div>
        
        {/* Swap Direction Button */}
        <div className="flex justify-center my-3">
          <div className="bg-white/10 p-2 rounded-full">
            <ArrowDown size={16} className="text-[#9b87f5]" />
          </div>
        </div>
        
        {/* To Token */}
        <div>
          <div className="flex justify-between text-sm text-gray-400 mb-2">
            <span>To (estimated)</span>
            <span>Balance: {tokenBalance.toFixed(2)} {config.token.symbol} (${tokenBalance.toFixed(2)})</span>
          </div>
          
          <div className="flex items-center bg-white/5 rounded-lg p-3">
            <div className="flex-1">
              <input
                type="number"
                placeholder="0.0"
                readOnly
                value={estimatedOutput}
                className="w-full bg-transparent text-white text-xl font-medium focus:outline-none"
              />
            </div>
            <div className="flex items-center space-x-2 bg-white/10 px-3 py-2 rounded-lg">
              <div className="w-6 h-6 bg-purple-500 rounded-full"></div>
              <span className="font-medium">{config.token.symbol}</span>
            </div>
          </div>
        </div>
        
        {/* Rate Info */}
        <div className="mt-4 bg-white/5 rounded-lg p-3">
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">Rate</span>
            <span>1 SOL ≈ {mctPerSol.toFixed(2)} {config.token.symbol} (${solanaPrice.toFixed(2)})</span>
          </div>
          <div className="flex justify-between text-sm mt-1">
            <span className="text-gray-400">Value</span>
            <span>1 {config.token.symbol} = $1.00</span>
          </div>
        </div>
      </div>
      
      {/* Swap Button */}
      <button 
        className="w-full mt-6 bg-gradient-to-r from-[#9b87f5] to-purple-500 text-white py-3 px-6 rounded-xl font-medium"
        onClick={handleSwap}
      >
        Swap
      </button>
    </div>
  );
};

export default ExchangeView;
