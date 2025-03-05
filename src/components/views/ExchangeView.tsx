
import React from 'react';
import { Repeat } from 'lucide-react';

const ExchangeView = () => {
  return (
    <div className="p-6 mx-4 bg-[#1A1F2C]/80 rounded-xl border border-[#ffffff10] shadow-lg backdrop-blur-sm animate-fade-in">
      <h2 className="text-xl font-bold text-center text-[#9b87f5] mb-4">Exchange</h2>
      <p className="text-gray-300 text-center">Exchange feature will be available soon.</p>
      <div className="flex justify-center mt-8">
        <div className="bg-[#9b87f5]/10 p-5 rounded-full">
          <Repeat className="h-12 w-12 text-[#9b87f5]" />
        </div>
      </div>
    </div>
  );
};

export default ExchangeView;
