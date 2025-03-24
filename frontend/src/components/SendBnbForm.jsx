import React, { useEffect, useState } from 'react';
import { parseEther, formatEther } from 'ethers';

const SendBnbForm = ({ wallet, provider }) => {
    const [toAddress, setToAddress] = useState('');
    const [amount, setAmount] = useState('');
    const [status, setStatus] = useState('');
    const [balance, setBalance] = useState(null);
    const [loading, setLoading] = useState(false);


    useEffect(() => {
        const fetchBalance = async () => {
            try {
                const balanceBNB = await provider.getBalance(wallet.address);
                setBalance(formatEther(balanceBNB));
            } catch (err) {
                console.error('Error fetching balance:', err);
            }
        };

        fetchBalance();
    }, [wallet, provider]);

    // ✅ 發送 BNB
    const handleSend = async () => {
        try {
            setLoading(true);
            setStatus('');

            const tx = await wallet.connect(provider).sendTransaction({
                to: toAddress,
                value: parseEther(amount),
            });

            setStatus(`Transaction sent! Hash: ${tx.hash}`);
        } catch (err) {
            setStatus(`Error: ${err.message}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ padding: '1rem', maxWidth: '500px', margin: '0 auto' }}>
            <h2>Send BNB</h2>

            {}
            <div style={{ marginBottom: '1rem' }}>
                <strong>Your Address:</strong><br />
                <span style={{ wordBreak: 'break-word', color: '#444' }}>
                    {wallet.address}
                </span>
            </div>

            <div style={{ marginBottom: '1rem' }}>
                <strong>Balance:</strong>{' '}
                {balance !== null ? `${balance} BNB` : 'Loading...'}
            </div>

            <input
                type="text"
                placeholder="Recipient address"
                value={toAddress}
                onChange={(e) => setToAddress(e.target.value)}
                style={{ width: '100%', padding: '0.5rem', marginBottom: '0.5rem' }}
            />
            <input
                type="number"
                placeholder="Amount in BNB"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                style={{ width: '100%', padding: '0.5rem', marginBottom: '0.5rem' }}
            />

            <button
                onClick={handleSend}
                disabled={loading}
                style={{
                    padding: '0.5rem 1rem',
                    fontSize: '1rem',
                    cursor: loading ? 'not-allowed' : 'pointer',
                    opacity: loading ? 0.6 : 1,
                }}
            >
                {loading ? 'Sending...' : 'Send'}
            </button>

            {}
            {status && (
                <p
                    style={{
                        marginTop: '1rem',
                        color: status.startsWith('Error') ? 'red' : 'green',
                        wordBreak: 'break-word',
                    }}
                >
                    {status}
                </p>
            )}
        </div>
    );
};

export default SendBnbForm;
