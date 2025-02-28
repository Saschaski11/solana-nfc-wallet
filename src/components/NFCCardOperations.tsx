
import React, { useState } from 'react';
import { useSolana } from '@/lib/SolanaContext';
import { useNFC } from '@/lib/NFCContext';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card } from './ui/card';
import { toast } from '@/components/ui/use-toast';
import { CreditCard, ScanLine, ShieldCheck } from 'lucide-react';

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
    <Card className="p-6 mx-4 bg-[#1A1F2C]/80 border-[#ffffff10] rounded-xl">
      <div className="text-center mb-6">
        <div className="bg-[#9b87f5]/10 p-3 rounded-full inline-block mb-3">
          <ShieldCheck className="h-6 w-6 text-[#9b87f5]" />
        </div>
        <h2 className="text-xl font-bold text-[#9b87f5]">NFC Security</h2>
        <p className="text-xs text-gray-400 mt-1">Write or read wallet data on NFC cards</p>
      </div>
      
      <div className="space-y-4">
        <div>
          <label className="text-sm font-medium mb-2 block text-gray-300">
            Security PIN
          </label>
          <Input
            type="password"
            value={pin}
            onChange={(e) => setPin(e.target.value)}
            placeholder="Enter PIN"
            className="w-full bg-[#121420]/70 border-[#ffffff10] text-white placeholder:text-gray-500"
            maxLength={4}
          />
        </div>

        <div className="flex gap-4 pt-2">
          <Button
            onClick={handleWriteToCard}
            disabled={isScanning}
            className="flex-1 bg-[#9b87f5] hover:bg-[#7E69AB] text-white"
          >
            <CreditCard className="mr-2 h-4 w-4" />
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
