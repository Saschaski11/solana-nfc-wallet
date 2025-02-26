
import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card } from './ui/card';
import { useSolana } from '@/lib/SolanaContext';
import { toast } from '@/components/ui/use-toast';

const WalletCreation = () => {
  const [importKey, setImportKey] = useState('');
  const { createWallet, importWallet } = useSolana();

  const handleCreate = async () => {
    try {
      await createWallet();
      toast({
        title: "Wallet Created",
        description: "Your new wallet has been created successfully.",
      });
    } catch (error) {
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
        title: "Wallet Imported",
        description: "Your wallet has been imported successfully.",
      });
      setImportKey('');
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to import wallet. Please check your private key and try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="p-4 space-y-6">
      <h2 className="text-2xl font-semibold text-center mb-6">Create or Import Wallet</h2>
      
      <Card className="p-6 space-y-4">
        <div>
          <h3 className="text-lg font-medium mb-2">Create New Wallet</h3>
          <Button 
            onClick={handleCreate}
            className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600"
          >
            Create Wallet
          </Button>
        </div>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">or</span>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-medium mb-2">Import Existing Wallet</h3>
          <div className="space-y-2">
            <Input
              type="password"
              placeholder="Enter your private key"
              value={importKey}
              onChange={(e) => setImportKey(e.target.value)}
              className="w-full"
            />
            <Button 
              onClick={handleImport}
              variant="outline" 
              className="w-full"
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
