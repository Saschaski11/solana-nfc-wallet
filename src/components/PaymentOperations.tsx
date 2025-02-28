
import React, { useState } from 'react';
import { useSolana } from '@/lib/SolanaContext';
import { useNFC } from '@/lib/NFCContext';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card } from './ui/card';
import { toast } from '@/components/ui/use-toast';
import { ArrowUpRight, ArrowDownLeft, Repeat, QrCode } from 'lucide-react';

const PaymentOperations = () => {
  const [amount, setAmount] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const [isReceiving, setIsReceiving] = useState(false);
  const [showQR, setShowQR] = useState(false);
  const { publicKey, sendTransaction, balance } = useSolana();
  const { readTag, isEnabled } = useNFC();

  const handleReceivePayment = async () => {
    if (!publicKey) {
      toast({
        title: "Error",
        description: "You need to create a wallet first",
        variant: "destructive",
      });
      return;
    }

    setIsReceiving(true);
    setShowQR(true);
    toast({
      title: "Ready to Receive",
      description: "Show this QR code to the sender to receive payment",
    });

    // In a real app, this would set up a listener for incoming transactions
    setTimeout(() => {
      setIsReceiving(false);
    }, 3000);
  };

  const handleSendPayment = async () => {
    if (!amount || isNaN(parseFloat(amount)) || parseFloat(amount) <= 0) {
      toast({
        title: "Error",
        description: "Please enter a valid amount",
        variant: "destructive",
      });
      return;
    }

    const amountValue = parseFloat(amount);
    if (amountValue > balance) {
      toast({
        title: "Insufficient Balance",
        description: "You don't have enough SOL to send this amount",
        variant: "destructive",
      });
      return;
    }

    if (!isEnabled) {
      toast({
        title: "NFC Not Available",
        description: "NFC is not available on this device. Please manually enter recipient address.",
        variant: "destructive",
      });
      // In a real app, we would offer a manual address input option here
      return;
    }

    try {
      setIsScanning(true);
      toast({
        description: "Please tap the recipient's NFC card",
      });
      
      const data = await readTag();
      
      if (!data || !data.publicKey) {
        toast({
          title: "Error", 
          description: "Invalid card data. Cannot process payment.",
          variant: "destructive",
        });
        return;
      }

      // Ask for confirmation before sending
      if (confirm(`Send ${amount} SOL to ${data.publicKey.slice(0, 8)}...?`)) {
        try {
          const signature = await sendTransaction(data.publicKey, amountValue);
          
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
      console.error('Error in payment process:', error);
      toast({
        title: "Error",
        description: "Failed to complete payment. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsScanning(false);
    }
  };

  return (
    <Card className="p-6 mx-4 bg-[#1A1F2C]/80 border-[#ffffff10] rounded-xl">
      <div className="text-center mb-6">
        <div className="bg-[#9b87f5]/10 p-3 rounded-full inline-block mb-3">
          <Repeat className="h-6 w-6 text-[#9b87f5]" />
        </div>
        <h2 className="text-xl font-bold text-[#9b87f5]">Transactions</h2>
        <p className="text-xs text-gray-400 mt-1">Send or receive SOL payments</p>
      </div>
      
      {showQR ? (
        <div className="space-y-4">
          <div className="flex justify-center p-4 bg-white rounded-lg">
            <div className="w-48 h-48 bg-gray-200 flex items-center justify-center">
              {/* Placeholder for QR code - in a real app you'd generate this */}
              <div className="text-black text-xs text-center p-2">
                <QrCode className="w-12 h-12 mx-auto mb-2 text-gray-700" />
                <p className="break-all">
                  {publicKey?.substring(0, 20)}...
                </p>
              </div>
            </div>
          </div>
          <Button
            onClick={() => setShowQR(false)}
            className="w-full bg-[#9b87f5] hover:bg-[#7E69AB] text-white"
          >
            Done
          </Button>
        </div>
      ) : (
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
              className="w-full bg-[#121420]/70 border-[#ffffff10] text-white placeholder:text-gray-500"
              min="0.000001"
              step="0.01"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <Button
              onClick={handleSendPayment}
              disabled={isScanning || isReceiving}
              className="bg-[#9b87f5] hover:bg-[#7E69AB] text-white"
            >
              <ArrowUpRight className="mr-2 h-4 w-4" />
              {isScanning ? "Scanning..." : "Send"}
            </Button>

            <Button
              onClick={handleReceivePayment}
              disabled={isScanning || isReceiving}
              variant="outline"
              className="border-[#9b87f5] text-[#9b87f5] hover:bg-[#9b87f5]/20"
            >
              <ArrowDownLeft className="mr-2 h-4 w-4" />
              {isReceiving ? "Generating..." : "Receive"}
            </Button>
          </div>
        </div>
      )}
    </Card>
  );
};

export default PaymentOperations;
