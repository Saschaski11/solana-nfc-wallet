
import React from 'react';
import { useSolana } from '@/lib/SolanaContext';
import { ExternalLink, Copy, Key, Shield } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

const WalletDetailsView = () => {
  const { publicKey } = useSolana();
  
  const copyAddress = () => {
    if (publicKey) {
      navigator.clipboard.writeText(publicKey);
      toast({
        description: "Address copied to clipboard",
      });
    }
  };

  // Get private key from localStorage (in a real app, this would be more secure)
  const privateKey = localStorage.getItem('privateKey') || '';
  
  const copyPrivateKey = () => {
    if (privateKey) {
      navigator.clipboard.writeText(privateKey);
      toast({
        description: "Private key copied to clipboard. Keep it secure!",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="p-6 animate-fade-in">
      <h2 className="text-xl font-bold text-center mb-6">Wallet Details</h2>
      
      {/* Wallet Address */}
      <div className="bg-white/5 backdrop-blur-md rounded-xl border border-white/10 p-5 mb-4">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center">
            <div className="mr-2 p-1.5 bg-[#9b87f5]/20 rounded-full">
              <Key size={14} className="text-[#9b87f5]" />
            </div>
            <span className="text-sm font-medium">Wallet Address</span>
          </div>
          <div className="flex space-x-2">
            <button 
              onClick={copyAddress}
              className="p-1.5 bg-white/5 hover:bg-white/10 rounded-full"
            >
              <Copy size={14} />
            </button>
            <a 
              href={`https://explorer.solana.com/address/${publicKey}`} 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-1.5 bg-white/5 hover:bg-white/10 rounded-full"
            >
              <ExternalLink size={14} />
            </a>
          </div>
        </div>
        <div className="bg-white/5 p-3 rounded-lg">
          <p className="text-xs break-all text-gray-300">
            {publicKey || 'Loading address...'}
          </p>
        </div>
      </div>
      
      {/* Network Info */}
      <div className="bg-white/5 backdrop-blur-md rounded-xl border border-white/10 p-5 mb-4">
        <div className="flex items-center mb-2">
          <div className="mr-2 p-1.5 bg-green-500/20 rounded-full">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          </div>
          <span className="text-sm font-medium">Network</span>
        </div>
        <div className="bg-white/5 p-3 rounded-lg">
          <p className="text-sm">
            Solana {window.location.href.includes('devnet') ? 'Devnet' : 'Mainnet'}
          </p>
        </div>
      </div>
      
      {/* Security Warning */}
      <div className="bg-red-500/10 backdrop-blur-md rounded-xl border border-red-500/20 p-5 mb-4">
        <div className="flex items-start">
          <div className="mr-3 p-2 bg-red-500/20 rounded-full mt-1">
            <Shield size={16} className="text-red-400" />
          </div>
          <div>
            <h4 className="text-red-400 font-medium mb-1">Security Notice</h4>
            <p className="text-xs text-gray-300">
              Never share your private key with anyone. Anyone with your private key has complete control over your wallet.
            </p>
          </div>
        </div>
      </div>
      
      {/* Export Private Key (with warning) */}
      <button 
        onClick={copyPrivateKey}
        className="w-full mt-4 bg-white/5 hover:bg-white/10 text-white py-3 rounded-xl font-medium border border-white/10 transition-colors"
      >
        Export Private Key
      </button>
    </div>
  );
};

export default WalletDetailsView;
