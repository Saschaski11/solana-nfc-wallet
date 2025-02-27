
import React from 'react';
import NFCCardOperations from './NFCCardOperations';
import PaymentOperations from './PaymentOperations';

const NFCPayment = () => {
  return (
    <div className="p-4 space-y-6">
      <NFCCardOperations />
      <PaymentOperations />
    </div>
  );
};

export default NFCPayment;
