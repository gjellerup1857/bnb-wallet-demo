import React, { useState } from 'react';
import { JsonRpcProvider } from 'ethers';
import WalletInput from './components/WalletInput';
import SendBnbForm from './components/SendBnbForm';
import './index.css';

const App = () => {
  const [wallet, setWallet] = useState(null);
  const provider = new JsonRpcProvider('https://data-seed-prebsc-1-s1.bnbchain.org:8545');

  const handleWalletInput = (importWallet) => {
    setWallet(importWallet);
  };

  return (
    <div>
      {!wallet ? (
        <WalletInput onWalletImport={handleWalletInput} />
      ) : (
        <SendBnbForm wallet={wallet} provider={provider} />
      )}
    </div>
  );
};

export default App;
