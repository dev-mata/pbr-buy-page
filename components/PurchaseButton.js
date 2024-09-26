
import React, { useEffect } from 'react';

import { sendTransaction, prepareWriteContract, writeContract } from '@wagmi/core';
import { useWriteContract } from 'wagmi'
import { erc20ABI, abi } from '../lib/abis';
import { config } from '../lib/config';
import { parseEther } from 'viem'

const USDT_ABI = [
  {
    type: 'function',
    name: 'approve',
    stateMutability: 'nonpayable',
    inputs: [
      { name: 'spender', type: 'address' },
      { name: 'amount', type: 'uint256' },
    ],
    outputs: [{ type: 'bool' }],
  },
  {
    type: 'function',
    name: 'transferFrom',
    stateMutability: 'nonpayable',
    inputs: [
      { name: 'sender', type: 'address' },
      { name: 'recipient', type: 'address' },
      { name: 'amount', type: 'uint256' },
    ],
    outputs: [{ type: 'bool' }],
  },
];

export default function PurchaseButton({ purchaseAmount, selectedToken, recipientAddress }) {
  const USDT_CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_USDT_CONTRACT_ADDRESS; // Set your USDT contract address here

  const { writeContract } = useWriteContract()



  const handleSendEthTransaction = async () => {
    try {
      const result = await sendTransaction(config, {
        to: recipientAddress,
        value: parseEther(purchaseAmount),
      });
      console.log('Transaction result:', result);
    } catch (error) {
      console.error('Error sending transaction:', error);
    }
  };

  useEffect(() => {
    console.log("loaded")
    writeContract({
      USDT_ABI,
      address: '0x6b175474e89094c44da98b954eedeac495271d0f',
      functionName: 'transferFrom',
      args: [
        '0xd2135CfB216b74109775236E36d4b433F1DF507B',
        '0xA0Cf798816D4b9b9866b5330EEa46a18382f251e',
        123n,
      ],
    });
  }, []); // Empty dependency array to run only once when the component mounts.



  const handleBuyClick = () => {
    if (selectedToken === 'eth') {
    
      console.log("ETH HEREEE")
      handleSendEthTransaction();
    } else if (selectedToken === 'usdt') {
      
      handleSendUSDTTransaction();
    }
  };

  return (
    <button
      type="button"
      onClick={handleBuyClick}
      className="w-full bg-pbr-yellow-dark hover:bg-yellow-600 text-black px-2 py-3 text-lg border-solid border-black border-2 rounded-xl font-bold"
    >
      BUY $PBR
    </button>

  
  );
}
