
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
  const [idNumber, setIdNumber] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const { publicKey, privateKey } = useSolana();
  const { writeTag, readTag } = useNFC();

  const handleWriteToCard = async () => {
    if (!privateKey || !publicKey || !pin || !idNumber) {
      toast({
        title: "Error",
        description: "Please enter all required information",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsScanning(true);
      await writeTag({
        privateKey,
        publicKey,
        pin,
        idNumber,
      });
      
      toast({
        title: "Success",
        description: "Wallet details written to NFC card successfully!",
      });

      setPin('');
      setIdNumber('');
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to write to NFC card",
        variant: "destructive",
      });
    } finally {
      setIsScanning(false);
    }
  };

  const handleReadFromCard = async () => {
    try {
      setIsScanning(true);
      const data = await readTag();
      
      if (data) {
        toast({
          title: "Card Read Successfully",
          description: `Found wallet with public key: ${data.publicKey.slice(0, 8)}...`,
        });
        console.log('Card data:', data);
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
    <div className="p-4 space-y-6">
      <Card className="p-6">
        <h2 className="text-2xl font-semibold text-center mb-6">NFC Card Operations</h2>
        
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium mb-2 block">
              PIN Code
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

          <div>
            <label className="text-sm font-medium mb-2 block">
              ID Number
            </label>
            <Input
              type="text"
              value={idNumber}
              onChange={(e) => setIdNumber(e.target.value)}
              placeholder="Enter ID Number"
              className="w-full"
            />
          </div>

          <div className="flex gap-4">
            <Button
              onClick={handleWriteToCard}
              disabled={isScanning}
              className="flex-1 bg-blue-500 hover:bg-blue-600"
            >
              {isScanning ? "Writing..." : "Write to Card"}
            </Button>

            <Button
              onClick={handleReadFromCard}
              disabled={isScanning}
              variant="outline"
              className="flex-1"
            >
              {isScanning ? "Reading..." : "Read Card"}
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default NFCPayment;
