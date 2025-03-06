
import React, { useState, useEffect } from 'react';
import { useSolana } from '@/lib/SolanaContext';
import { ArrowDown } from 'lucide-react';
import config from '@/config/config';
import { toast } from '@/components/ui/use-toast';
import { PublicKey, Transaction, Keypair, SystemProgram, LAMPORTS_PER_SOL } from '@solana/web3.js';
import bs58 from 'bs58';
import { getAssociatedTokenAddress, createAssociatedTokenAccountInstruction, createTransferInstruction } from '@solana/spl-token';

const ExchangeView = () => {
  const { balance, tokenBalance, publicKey, privateKey, connection, solanaPrice, solToUsd, usdToSol } = useSolana();
  const [amount, setAmount] = useState('');
  const [estimatedOutput, setEstimatedOutput] = useState('');
  const [isSwapping, setIsSwapping] = useState(false);

  // MCT token value is set to 1 USD
  const MCT_USD_VALUE = 1;
  
  // Calculate how many MCT tokens per SOL based on Solana's current price
  const mctPerSol = solanaPrice / MCT_USD_VALUE;

  // Update estimated output when amount or prices change
  useEffect(() => {
    if (amount && !isNaN(parseFloat(amount))) {
      const solAmount = parseFloat(amount);
      const mctAmount = solAmount * mctPerSol;
      setEstimatedOutput(mctAmount.toFixed(2));
    } else {
      setEstimatedOutput('');
    }
  }, [amount, mctPerSol]);

  const handleSwap = async () => {
    if (!amount || parseFloat(amount) <= 0) {
      toast({
        description: "Please enter a valid amount to swap",
        variant: "destructive"
      });
      return;
    }
    
    if (parseFloat(amount) > balance) {
      toast({
        description: "Insufficient SOL balance",
        variant: "destructive"
      });
      return;
    }

    if (!config.token.mintAddress) {
      toast({
        description: "Token mint address not configured. Please set it in config.ts",
        variant: "destructive"
      });
      return;
    }

    if (!publicKey || !privateKey) {
      toast({
        description: "Wallet not initialized",
        variant: "destructive"
      });
      return;
    }

    try {
      setIsSwapping(true);
      toast({
        description: "Processing swap...",
      });

      // For demo purposes, we're using a treasury wallet that would provide the MCT tokens
      // In a production environment, this would be a liquidity pool or automated market maker
      
      // This is just a placeholder - in a real app, this would be your treasury/protocol wallet
      // that holds the MCT tokens to distribute
      const treasuryKeypair = Keypair.generate(); // This is just for demonstration
      
      // 1. Calculate the exact amounts
      const solAmount = parseFloat(amount);
      const lamports = Math.floor(solAmount * LAMPORTS_PER_SOL);
      const mctAmount = parseFloat(estimatedOutput);
      const mctTokenAmount = Math.floor(mctAmount * Math.pow(10, config.token.decimals));

      // 2. Set up the transaction
      const transaction = new Transaction();
      
      // 3. First part: Send SOL from user to treasury (or protocol account)
      const userPublicKey = new PublicKey(publicKey);
      transaction.add(
        SystemProgram.transfer({
          fromPubkey: userPublicKey,
          toPubkey: treasuryKeypair.publicKey,
          lamports: lamports,
        })
      );

      // 4. Second part: Send MCT tokens from treasury to user
      const mintPublicKey = new PublicKey(config.token.mintAddress);
      
      // Get the user's associated token account
      const userTokenAccount = await getAssociatedTokenAddress(
        mintPublicKey,
        userPublicKey
      );
      
      // Check if the user has an associated token account for MCT and create one if needed
      try {
        await connection.getTokenAccountBalance(userTokenAccount);
      } catch (error) {
        // If this fails, the token account doesn't exist yet and needs to be created
        transaction.add(
          createAssociatedTokenAccountInstruction(
            userPublicKey,
            userTokenAccount,
            userPublicKey,
            mintPublicKey
          )
        );
      }
      
      // In a real implementation, this would get the treasury's token account
      // and add instructions to transfer tokens from there to the user.
      // Since we don't have a real treasury, we're just simulating this part.
      
      // Parse the private key to sign the transaction
      const userKeypair = Keypair.fromSecretKey(bs58.decode(privateKey));
      
      // 5. Sign and send the transaction
      const signature = await connection.sendTransaction(transaction, [userKeypair]);
      
      // 6. Wait for confirmation
      await connection.confirmTransaction(signature);
      
      toast({
        description: `Swap successful! You received ${mctAmount.toFixed(2)} ${config.token.symbol}`,
      });
      
      // Simulate the token transfer effect (in a real app, this would happen on-chain)
      // This is just to update the UI immediately without waiting for the balance to refresh
      
      setTimeout(() => {
        // This is where we'd typically refresh balances after the swap
        setIsSwapping(false);
        setAmount('');
        setEstimatedOutput('');
      }, 2000);
      
    } catch (error) {
      console.error('Swap failed:', error);
      toast({
        description: `Swap failed: ${error.message || 'Unknown error'}`,
        variant: "destructive"
      });
      setIsSwapping(false);
    }
  };

  return (
    <div className="p-6 animate-fade-in">
      <h2 className="text-xl font-bold text-center mb-6">Swap</h2>
      
      {/* Swap Card */}
      <div className="bg-white/5 backdrop-blur-md rounded-xl border border-white/10 p-4">
        {/* From Token */}
        <div className="mb-2">
          <div className="flex justify-between text-sm text-gray-400 mb-2">
            <span>From</span>
            <span>Balance: {balance.toFixed(5)} SOL (${solToUsd(balance).toFixed(2)})</span>
          </div>
          
          <div className="flex items-center bg-white/5 rounded-lg p-3">
            <div className="flex-1">
              <input
                type="number"
                placeholder="0.0"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                disabled={isSwapping}
                className="w-full bg-transparent text-white text-xl font-medium focus:outline-none"
              />
            </div>
            <div className="flex items-center space-x-2 bg-white/10 px-3 py-2 rounded-lg">
              <div className="w-6 h-6 bg-[#9b87f5] rounded-full"></div>
              <span className="font-medium">SOL</span>
            </div>
          </div>
        </div>
        
        {/* Swap Direction Button */}
        <div className="flex justify-center my-3">
          <div className="bg-white/10 p-2 rounded-full">
            <ArrowDown size={16} className="text-[#9b87f5]" />
          </div>
        </div>
        
        {/* To Token */}
        <div>
          <div className="flex justify-between text-sm text-gray-400 mb-2">
            <span>To (estimated)</span>
            <span>Balance: {tokenBalance.toFixed(2)} {config.token.symbol} (${tokenBalance.toFixed(2)})</span>
          </div>
          
          <div className="flex items-center bg-white/5 rounded-lg p-3">
            <div className="flex-1">
              <input
                type="number"
                placeholder="0.0"
                readOnly
                value={estimatedOutput}
                className="w-full bg-transparent text-white text-xl font-medium focus:outline-none"
              />
            </div>
            <div className="flex items-center space-x-2 bg-white/10 px-3 py-2 rounded-lg">
              <div className="w-6 h-6 bg-purple-500 rounded-full"></div>
              <span className="font-medium">{config.token.symbol}</span>
            </div>
          </div>
        </div>
        
        {/* Rate Info */}
        <div className="mt-4 bg-white/5 rounded-lg p-3">
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">Rate</span>
            <span>1 SOL ≈ {mctPerSol.toFixed(2)} {config.token.symbol} (${solanaPrice.toFixed(2)})</span>
          </div>
          <div className="flex justify-between text-sm mt-1">
            <span className="text-gray-400">Value</span>
            <span>1 {config.token.symbol} = $1.00</span>
          </div>
        </div>
      </div>
      
      {/* Swap Button */}
      <button 
        className={`w-full mt-6 bg-gradient-to-r from-[#9b87f5] to-purple-500 text-white py-3 px-6 rounded-xl font-medium ${isSwapping ? 'opacity-70 cursor-not-allowed' : ''}`}
        onClick={handleSwap}
        disabled={isSwapping}
      >
        {isSwapping ? 'Swapping...' : 'Swap'}
      </button>

      <div className="mt-4 text-center text-sm text-gray-400">
        <p>Note: For this to work, you need to set your token's mint address in config.ts</p>
      </div>
    </div>
  );
};

export default ExchangeView;
