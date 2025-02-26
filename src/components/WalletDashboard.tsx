
import React from 'react';
import { useSolana } from '@/lib/SolanaContext';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Copy } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

const WalletDashboard = () => {
  const { balance, publicKey } = useSolana();

  const copyAddress = () => {
    if (publicKey) {
      navigator.clipboard.writeText(publicKey);
      toast({
        description: "Address copied to clipboard",
      });
    }
  };

  return (
    <div className="p-4 space-y-6">
      <Card className="p-6">
        <div className="space-y-4">
          <div className="text-center">
            <p className="text-sm text-muted-foreground">Current Balance</p>
            <h1 className="text-4xl font-bold">{balance.toFixed(2)} SOL</h1>
          </div>

          <div className="pt-4 border-t">
            <p className="text-sm text-muted-foreground mb-2">Wallet Address</p>
            <div className="flex items-center gap-2 bg-muted p-2 rounded-lg">
              <code className="flex-1 text-xs truncate">
                {publicKey}
              </code>
              <Button
                variant="ghost"
                size="icon"
                onClick={copyAddress}
                className="h-8 w-8"
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
