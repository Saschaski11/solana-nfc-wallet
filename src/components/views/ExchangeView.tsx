
import React, { useState } from 'react';
import { useSolana } from '@/lib/SolanaContext';
import { ArrowDown, Search } from 'lucide-react';
import config from '@/config/config';

const ExchangeView = () => {
  const { balance, tokenBalance, publicKey } = useSolana();
  const [amount, setAmount] = useState('');

  return (
    <div className="p-6 animate-fade-in">
      <h2 className="text-xl font-bold text-center mb-6">Swap</h2>
      
      {/* Swap Card */}
      <div className="bg-white/5 backdrop-blur-md rounded-xl border border-white/10 p-4">
        {/* From Token */}
        <div className="mb-2">
          <div className="flex justify-between text-sm text-gray-400 mb-2">
            <span>From</span>
            <span>Balance: {balance.toFixed(5)} SOL</span>
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
            <span>Balance: {tokenBalance.toFixed(2)} {config.token.symbol}</span>
          </div>
          
          <div className="flex items-center bg-white/5 rounded-lg p-3">
            <div className="flex-1">
              <input
                type="number"
                placeholder="0.0"
                readOnly
                value={amount ? (parseFloat(amount) * 10).toFixed(2) : ''}
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
            <span>1 SOL ≈ 10 {config.token.symbol}</span>
          </div>
        </div>
      </div>
      
      {/* Swap Button */}
      <button className="w-full mt-6 bg-gradient-to-r from-[#9b87f5] to-purple-500 text-white py-3 px-6 rounded-xl font-medium">
        Swap
      </button>
      
      {/* More Info */}
      <div className="mt-8">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Popular Tokens</h3>
        </div>
        
        <div className="space-y-3">
          <TokenItem 
            symbol="SOL" 
            name="Solana" 
            balance={balance} 
            dollarValue={balance * 20} // Example price
            change={"+2.43%"}
            color="bg-blue-500"
          />
          <TokenItem 
            symbol={config.token.symbol} 
            name={config.token.name} 
            balance={tokenBalance} 
            dollarValue={tokenBalance * 0.1} // Example price
            change={"+5.17%"}
            color="bg-purple-500"
          />
        </div>
      </div>
    </div>
  );
};

const TokenItem = ({ 
  symbol, 
  name, 
  balance, 
  dollarValue, 
  change, 
  color 
}: { 
  symbol: string; 
  name: string; 
  balance: number; 
  dollarValue: number;
  change: string;
  color: string;
}) => (
  <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors">
    <div className="flex items-center space-x-3">
      <div className={`w-8 h-8 ${color} rounded-full flex items-center justify-center text-white font-bold text-xs`}>
        {symbol.slice(0, 2)}
      </div>
      <div>
        <div className="font-medium">{name}</div>
        <div className="text-gray-400 text-xs">{symbol}</div>
      </div>
    </div>
    <div className="text-right">
      <div className="font-medium">${dollarValue.toFixed(2)}</div>
      <div className="text-green-400 text-xs">{change}</div>
    </div>
  </div>
);

export default ExchangeView;
