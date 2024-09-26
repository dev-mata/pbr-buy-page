
import React, { useState ,useEffect } from 'react';

import { sendTransaction, prepareWriteContract } from '@wagmi/core';
import { useWriteContract, useAccount } from 'wagmi'
import { simulateContract, writeContract } from '@wagmi/core'

import { erc20ABI, abi } from '../lib/abis';
import { erc20Abi } from 'viem';
import { config, config2 } from '../lib/config';
import { parseEther } from 'viem'
import { sepolia } from 'wagmi/chains'

const ERC20_ABI =[
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
    "constant": false,
    "inputs": [
      { "name": "from", "type": "address" },
      { "name": "to", "type": "address" },
      { "name": "value", "type": "uint256" }
    ],
    "name": "transferFrom",
    "outputs": [{ "name": "", "type": "bool" }],
    "type": "function"
  },
];

export default function PurchaseButton({ purchaseAmount, selectedToken, recipientAddress }) {
  const USDT_CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_USDT_CONTRACT_ADDRESS; // Set your USDT contract address here

  const [transactionHash, setTransactionHash] = useState(null);
  const { data, error, isLoading } = useWriteContract();
  const { address } = useAccount();


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



  const handleWriteContract = async () => {
    console.log("accountaccount", address)
    if (recipientAddress) {
        try {
          const { request } = await simulateContract(config2, {
            ERC20_ABI,
            address: '0x6b175474e89094c44da98b954eedeac495271d0f',
            functionName: 'transferFrom',
            args: [
              '0xd2135CfB216b74109775236E36d4b433F1DF507B',
              '0xA0Cf798816D4b9b9866b5330EEa46a18382f251e',
              123n,
            ],
            chainId: sepolia.id, 
          })
          const hash = await writeContract(config, request)
            console.log("Contract write successful! Hash:", hash);
        } catch (error) {
            console.error("Error writing to contract:", error);
        }
    }
};


  const handleSendUSDTTransaction = async () => {
    console.log("clicked");

    try {
      const result = await writeContract();
      console.log('Transaction sent:', result);
      setTransactionHash(result?.hash);
    } catch (e) {
      console.error('Error sending transaction:', e);
    }
  };

  
  const handleBuyClick = () => {
    if (selectedToken === 'eth') {
    
      console.log("ETH HEREEE")
      handleSendEthTransaction();
    } else if (selectedToken === 'usdt') {
      
      handleWriteContract();
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
