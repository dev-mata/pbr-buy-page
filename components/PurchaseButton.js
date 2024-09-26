
import React, { useState, useEffect } from 'react';

import { sendTransaction, prepareWriteContract } from '@wagmi/core';
import { useWriteContract, useAccount } from 'wagmi'
import { simulateContract, writeContract } from '@wagmi/core'

import {  abi } from '../lib/abis';
import { erc20Abi } from 'viem';
import { config, config2 } from '../lib/config';
import { parseEther } from 'viem'
import { sepolia } from 'wagmi/chains'

const ERC20_ABI =  [
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
]

export default function PurchaseButton({ purchaseAmount, selectedToken, recipientAddress }) {
  const USDT_CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_USDT_CONTRACT_ADDRESS; // Set your USDT contract address here
  const USDT_MASTER_ADDRESS = process.env.NEXT_PUBLIC_ETH_SEPOLIA_MASTER_WALLET; // Set your USDT contract address here


  const [transactionHash, setTransactionHash] = useState(null);
  

  const { address } = useAccount();


  const handleSendEthTransaction = async () => {
    try {
      const result = await sendTransaction(config2, {
        to: recipientAddress,
        value: parseEther(purchaseAmount),
      });
      console.log('Transaction result:', result);
    } catch (error) {
      console.error('Error sending transaction:', error);
    }
  };



  const handleWriteContract = async () => {
    console.log("Account:", address);
  
    if (recipientAddress) {
      try {
        console.log("Simulating contract with config:", USDT_CONTRACT_ADDRESS, address );
  
        const { request } = await simulateContract(config2, {
          abi: ERC20_ABI,  
          address: '0x0E50587190aE00240BB70015AADaA56B62B05deB',  
          account: address,
          functionName: 'transferFrom',
          args: [
            address,  
            USDT_MASTER_ADDRESS, 
            BigInt(purchaseAmount) * BigInt(10 ** 6), 
          ],
          chainId: sepolia.id, 
        });
  

        // const { request } = await simulateContract(config2, {
        //   abi: ERC20_ABI,  
        //   address: '0x0E50587190aE00240BB70015AADaA56B62B05deB',  
        //   account: address,
        //   functionName: 'approve',
        //   args: [
        //     address,  
        //     BigInt(1), 
        //   ],
        //   chainId: sepolia.id, 
        // });
        console.log("Request simulated:", request);
  
        const hash = await writeContract(config2, request);
        console.log("Contract write successful! Hash:", hash);
      } catch (error) {
        console.error("Error writing to contract:", error);
      }
    }
  };


  const handleWriteUSDContract = () => {
    console.log("34343")
    writeContract({
      args: [
        '0xd2135CfB216b74109775236E36d4b433F1DF507B', // From address
        '0xA0Cf798816D4b9b9866b5330EEa46a18382f251e', // To address
        BigInt(123), // Use BigInt for large integers
      ],
    });
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
