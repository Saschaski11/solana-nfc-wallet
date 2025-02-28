
import React, { useState } from 'react';
import { useSolana } from '@/lib/SolanaContext';
import { useNFC } from '@/lib/NFCContext';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card } from './ui/card';
import { toast } from '@/components/ui/use-toast';
import { ArrowUpRight, ArrowDownLeft, Repeat } from 'lucide-react';

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
    <Card className="p-6 mx-4 mb-4 bg-gradient-to-br from-[#1E293B] to-[#162037] border-[#ffffff10] shadow-lg rounded-xl">
      <div className="text-center mb-6">
        <div className="bg-[#9b87f5]/10 p-3 rounded-full inline-block mb-3">
          <Repeat className="h-6 w-6 text-[#9b87f5]" />
        </div>
        <h2 className="text-xl font-bold text-[#9b87f5]">Transactions</h2>
        <p className="text-xs text-gray-400 mt-1">Send or receive SOL payments</p>
      </div>
      
      <div className="space-y-4">
        <div>
          <label className="text-sm font-medium mb-2 block text-gray-300">
            Amount (SOL)
          </label>
          <Input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount"
            className="w-full bg-[#1A1F2C]/90 border-[#ffffff10] text-white placeholder:text-gray-500"
            min="0"
            step="0.01"
          />
        </div>

        <div className="grid grid-cols-2 gap-4 pt-2">
          <Button
            onClick={handleSendPayment}
            disabled={isScanning || isReceiving}
            className="bg-[#9b87f5] hover:bg-[#7E69AB] text-white"
          >
            <ArrowUpRight className="mr-2 h-4 w-4" />
            {isScanning ? "Sending..." : "Send"}
          </Button>

          <Button
            onClick={handleReceivePayment}
            disabled={isScanning || isReceiving}
            variant="outline"
            className="border-[#9b87f5] text-[#9b87f5] hover:bg-[#9b87f5]/20"
          >
            <ArrowDownLeft className="mr-2 h-4 w-4" />
            {isReceiving ? "Receiving..." : "Receive"}
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default PaymentOperations;
