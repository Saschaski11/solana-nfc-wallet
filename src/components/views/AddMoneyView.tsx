
import React, { useState } from 'react';
import { useSolana } from '@/lib/SolanaContext';
import { Copy, QrCode } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

const AddMoneyView = () => {
  const { publicKey } = useSolana();
  const [showQR, setShowQR] = useState(false);

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
    `${publicKey.slice(0, 8)}...${publicKey.slice(-8)}` : 
    'Loading...';

  return (
    <div className="p-6 animate-fade-in">
      <h2 className="text-xl font-bold text-center mb-6">Receive</h2>
      
      {/* QR Code Section */}
      <div className="bg-white/5 backdrop-blur-md rounded-xl border border-white/10 p-6 flex flex-col items-center">
        <div className="w-48 h-48 bg-white p-3 rounded-lg mb-6 flex items-center justify-center">
          {showQR ? (
            <div className="bg-[#f5f5f5] w-full h-full flex items-center justify-center">
              <QrCode size={120} className="text-gray-800" />
            </div>
          ) : (
            <QrCode size={120} className="text-gray-800" />
          )}
        </div>
        
        <p className="text-center text-gray-300 mb-4 max-w-xs">
          Send only Solana (SOL) to this address. Other tokens may be lost forever.
        </p>
        
        <div className="w-full bg-white/5 p-3 rounded-lg flex items-center justify-between mb-4">
          <span className="text-sm font-mono">{shortPublicKey}</span>
          <button 
            onClick={copyAddress}
            className="p-1.5 bg-[#9b87f5]/20 hover:bg-[#9b87f5]/30 rounded-full"
          >
            <Copy size={14} className="text-[#9b87f5]" />
          </button>
        </div>
        
        <button 
          onClick={copyAddress}
          className="w-full bg-[#9b87f5] hover:bg-[#8a75e3] text-white py-3 rounded-xl font-medium transition-colors"
        >
          Copy Full Address
        </button>
      </div>
      
      {/* Additional Info */}
      <div className="mt-8 bg-blue-500/10 backdrop-blur-md rounded-xl border border-blue-500/20 p-5">
        <p className="text-sm text-center text-gray-300">
          After sending funds, they will appear in your wallet once the transaction is processed on the blockchain.
        </p>
      </div>
    </div>
  );
};

export default AddMoneyView;
