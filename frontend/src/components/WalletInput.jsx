import React, { useState } from 'react';
import { HDNodeWallet } from 'ethers';

const WalletInput = ({ onWalletImport }) => {
    const [mnemonic, setMnemonic] = useState('');
    const [error, setError] = useState('');

    const handleImport = () => {
        try {
            const cleanedMnemonic = mnemonic
                .trim()
                .toLowerCase()
                .replace(/\s+/g, ' ');

            const wallet = HDNodeWallet.fromPhrase(cleanedMnemonic);
            onWalletImport(wallet);
            setError('');
        } catch (err) {
            setError(err.message || "Something went wrong. Please check your mnemonic.");
        }
    };

    return (
        <div style={{ padding: '1rem', maxWidth: '400px', margin: '0 auto' }}>
            <h2>Import Wallet</h2>
            <textarea
                rows={4}
                value={mnemonic}
                onChange={(e) => setMnemonic(e.target.value)}
                placeholder="Enter your 12 or 24-word mnemonic phrase"
                style={{ width: '100%', padding: '0.5rem', fontSize: '1rem' }}
            />
            <button
                onClick={handleImport}
                style={{
                    marginTop: '1rem',
                    padding: '0.5rem 1rem',
                    fontSize: '1rem',
                    cursor: 'pointer'
                }}
            >
                Import Wallet
            </button>
            {error && <p style={{ color: 'red', marginTop: '0.5rem' }}>{error}</p>}
        </div>
    );
};

export default WalletInput;
