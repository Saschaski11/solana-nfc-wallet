
import React, { useState } from 'react';
import { useSolana } from '@/lib/SolanaContext';
import { useNFC } from '@/lib/NFCContext';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card } from './ui/card';
import { toast } from '@/components/ui/use-toast';

const PaymentOperations = () => {
  const [amount, setAmount] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const [isReceiving, setIsReceiving] = useState(false);
  const { publicKey, sendTransaction } = useSolana();
  const { readTag } = useNFC();

  const handleReceivePayment = async () => {
    if (!publicKey) {
      toast({
        title: "Error",
        description: "You need to create a wallet first",
        variant: "destructive",
      });
      return;
    }

    if (!amount || isNaN(parseFloat(amount)) || parseFloat(amount) <= 0) {
      toast({
        title: "Error",
        description: "Please enter a valid amount",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsReceiving(true);
      toast({
        title: "Ready to Receive",
        description: "Ask the sender to scan your wallet and approve the payment",
      });

      // In a real app, this would involve setting up a listener or polling mechanism
      setTimeout(() => {
        toast({
          title: "Instructions",
          description: "Show your receiving QR code or NFC card to the sender",
        });
      }, 2000);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to set up payment receiver",
        variant: "destructive",
      });
    } finally {
      setIsReceiving(false);
    }
  };

  const handleSendPayment = async () => {
    try {
      setIsScanning(true);
      const data = await readTag();
      
      if (!data || !data.publicKey) {
        toast({
          title: "Error", 
          description: "Invalid card data. Cannot process payment.",
          variant: "destructive",
        });
        return;
      }

      if (!amount || isNaN(parseFloat(amount)) || parseFloat(amount) <= 0) {
        toast({
          title: "Error",
          description: "Please enter a valid amount",
          variant: "destructive",
        });
        return;
      }

      // Ask for confirmation before sending
      if (confirm(`Send ${amount} SOL to ${data.publicKey.slice(0, 8)}...?`)) {
        try {
          const signature = await sendTransaction(data.publicKey, parseFloat(amount));
          
          toast({
            title: "Payment Sent!",
            description: `Successfully sent ${amount} SOL. Transaction ID: ${signature.slice(0, 8)}...`,
          });
          
          setAmount('');
        } catch (error) {
          console.error("Payment error:", error);
          toast({
            title: "Payment Failed",
            description: "Transaction could not be completed. Please try again.",
            variant: "destructive",
          });
        }
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to read NFC card",
        variant: "destructive",
      });
    } finally {
      setIsScanning(false);
    }
  };

  return (
    <Card className="p-6">
      <h2 className="text-2xl font-semibold text-center mb-6">Payment Operations</h2>
      
      <div className="space-y-4">
        <div>
          <label className="text-sm font-medium mb-2 block">
            Amount (SOL)
          </label>
          <Input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount"
            className="w-full"
            min="0"
            step="0.01"
          />
        </div>

        <div className="flex gap-4">
          <Button
            onClick={handleSendPayment}
            disabled={isScanning || isReceiving}
            className="flex-1 bg-green-500 hover:bg-green-600"
          >
            {isScanning ? "Processing..." : "Send Payment"}
          </Button>

          <Button
            onClick={handleReceivePayment}
            disabled={isScanning || isReceiving}
            className="flex-1 bg-purple-500 hover:bg-purple-600"
          >
            {isReceiving ? "Waiting..." : "Receive Payment"}
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default PaymentOperations;
