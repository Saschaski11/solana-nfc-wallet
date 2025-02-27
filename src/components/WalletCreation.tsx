
import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card } from './ui/card';
import { useSolana } from '@/lib/SolanaContext';
import { toast } from '@/components/ui/use-toast';
import { Wallet, Import, LockKeyhole } from 'lucide-react';

const WalletCreation = () => {
  const [importKey, setImportKey] = useState('');
  const { createWallet, importWallet } = useSolana();

  const handleCreate = async () => {
    try {
      await createWallet();
      toast({
        title: "Success",
        description: "Your new wallet has been created successfully.",
      });
      // Force page reload to update wallet state
      window.location.reload();
    } catch (error) {
      console.error('Error creating wallet:', error);
      toast({
        title: "Error",
        description: "Failed to create wallet. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleImport = async () => {
    if (!importKey) {
      toast({
        title: "Error",
        description: "Please enter a private key",
        variant: "destructive",
      });
      return;
    }

    try {
      await importWallet(importKey);
      toast({
        title: "Success",
        description: "Your wallet has been imported successfully.",
      });
      setImportKey('');
      // Force page reload to update wallet state
      window.location.reload();
    } catch (error) {
      console.error('Error importing wallet:', error);
      toast({
        title: "Error",
        description: "Failed to import wallet. Please check your private key and try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="text-center mb-2">
        <LockKeyhole className="h-10 w-10 mx-auto mb-3 text-[#9b87f5]" />
        <h2 className="text-2xl font-bold text-[#9b87f5]">Create or Import Wallet</h2>
        <p className="text-gray-400 mt-2 text-sm">Get started with your Solana wallet</p>
      </div>
      
      <Card className="p-6 space-y-6 bg-[#1A1F2C]/50 border-[#ffffff10]">
        <div>
          <h3 className="text-lg font-medium mb-3 text-white flex items-center">
            <Wallet className="mr-2 h-5 w-5 text-[#9b87f5]" />
            Create New Wallet
          </h3>
          <Button 
            onClick={handleCreate}
            className="w-full bg-gradient-to-r from-[#9b87f5] to-[#7E69AB] hover:from-[#7E69AB] hover:to-[#6a5a92] text-white"
          >
            Create Wallet
          </Button>
          <p className="text-xs text-gray-400 mt-2 text-center">Creates a new Solana wallet with a random seed</p>
        </div>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-[#ffffff10]" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-[#1A1F2C]/50 px-2 text-gray-400">or</span>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-medium mb-3 text-white flex items-center">
            <Import className="mr-2 h-5 w-5 text-[#9b87f5]" />
            Import Existing Wallet
          </h3>
          <div className="space-y-3">
            <Input
              type="password"
              placeholder="Enter your private key"
              value={importKey}
              onChange={(e) => setImportKey(e.target.value)}
              className="w-full bg-[#1E293B]/90 border-[#ffffff10] text-white placeholder:text-gray-500"
            />
            <Button 
              onClick={handleImport}
              variant="outline" 
              className="w-full border-[#9b87f5] text-[#9b87f5] hover:bg-[#9b87f5]/20"
            >
              Import Wallet
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default WalletCreation;
