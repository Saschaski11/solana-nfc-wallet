
import React, { useState } from 'react';
import { useSolana } from '@/lib/SolanaContext';
import { useNFC } from '@/lib/NFCContext';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card } from './ui/card';
import { toast } from '@/components/ui/use-toast';
import { CreditCard, ScanLine } from 'lucide-react';

const NFCCardOperations = () => {
  const [pin, setPin] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const { publicKey, privateKey } = useSolana();
  const { writeTag, readTag } = useNFC();

  const handleWriteToCard = async () => {
    if (!privateKey || !publicKey || !pin) {
      toast({
        title: "Error",
        description: "Please enter your PIN code",
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
        idNumber: "" // We're no longer requiring an ID number
      });
      
      toast({
        title: "Success",
        description: "Wallet details written to NFC card successfully!",
      });

      setPin('');
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
    <Card className="p-6 mx-4 bg-gradient-to-br from-[#1E293B] to-[#162037] border-[#ffffff10]">
      <div className="text-center mb-6">
        <CreditCard className="h-6 w-6 mx-auto mb-2 text-[#9b87f5]" />
        <h2 className="text-xl font-bold text-[#9b87f5]">NFC Card Operations</h2>
      </div>
      
      <div className="space-y-4">
        <div>
          <label className="text-sm font-medium mb-2 block text-gray-300">
            PIN Code
          </label>
          <Input
            type="password"
            value={pin}
            onChange={(e) => setPin(e.target.value)}
            placeholder="Enter PIN"
            className="w-full bg-[#1A1F2C]/60 border-[#ffffff10] text-white placeholder:text-gray-500"
            maxLength={4}
          />
        </div>

        <div className="flex gap-4">
          <Button
            onClick={handleWriteToCard}
            disabled={isScanning}
            className="flex-1 bg-[#9b87f5] hover:bg-[#7E69AB] text-white"
          >
            {isScanning ? "Writing..." : "Write to Card"}
          </Button>

          <Button
            onClick={handleReadFromCard}
            disabled={isScanning}
            variant="outline"
            className="flex-1 border-[#9b87f5] text-[#9b87f5] hover:bg-[#9b87f5]/20"
          >
            <ScanLine className="mr-2 h-4 w-4" />
            {isScanning ? "Reading..." : "Read Card"}
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default NFCCardOperations;
