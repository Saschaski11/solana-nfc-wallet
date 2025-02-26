
import React, { useState } from 'react';
import { useSolana } from '@/lib/SolanaContext';
import { useNFC } from '@/lib/NFCContext';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card } from './ui/card';
import { toast } from '@/components/ui/use-toast';

const NFCPayment = () => {
  const [amount, setAmount] = useState('');
  const [pin, setPin] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const { sendTransaction } = useSolana();
  const { startScanning, stopScanning, writeTag } = useNFC();

  const handleSend = async () => {
    if (!amount || !pin) {
      toast({
        title: "Error",
        description: "Please enter amount and PIN",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsScanning(true);
      await startScanning();
      
      // This is where we'd handle the NFC scan result
      // For now, we'll use a mock recipient
      const mockRecipient = "MOCK_RECIPIENT_ADDRESS";
      
      const signature = await sendTransaction(mockRecipient, parseFloat(amount));
      
      toast({
        title: "Success",
        description: "Payment sent successfully!",
      });

      setAmount('');
      setPin('');
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send payment",
        variant: "destructive",
      });
    } finally {
      await stopScanning();
      setIsScanning(false);
    }
  };

  return (
    <div className="p-4 space-y-6">
      <Card className="p-6">
        <h2 className="text-2xl font-semibold text-center mb-6">Send Payment</h2>
        
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium mb-2 block">
              Amount (SOL)
            </label>
            <Input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0.00"
              className="w-full"
            />
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">
              PIN
            </label>
            <Input
              type="password"
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              placeholder="Enter PIN"
              className="w-full"
              maxLength={4}
            />
          </div>

          <Button
            onClick={handleSend}
            disabled={isScanning}
            className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600"
          >
            {isScanning ? "Scanning..." : "Send Payment"}
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default NFCPayment;
