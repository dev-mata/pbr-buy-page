
import { sendTransaction, simulateContract, writeContract } from '@wagmi/core';
import { useAccount } from 'wagmi'
import { ERC20USDT_ABI } from '../lib/abis';
import { config, config2 } from '../lib/config';
import { parseEther } from 'viem'
import { sepolia } from 'wagmi/chains'


export default function PurchaseButton({ purchaseAmount, selectedToken, recipientAddress }) {
  const USDT_CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_USDT_CONTRACT_ADDRESS;
  const USDT_MASTER_ADDRESS = process.env.NEXT_PUBLIC_ETH_SEPOLIA_MASTER_WALLET;

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



  const approveUserMaxCap = async () => {
    if (recipientAddress) {
      try {
        console.log("Simulating contract with config:", USDT_CONTRACT_ADDRESS, address);
        const { request } = await simulateContract(config2, {
          abi: ERC20USDT_ABI,
          address: '0x0E50587190aE00240BB70015AADaA56B62B05deB',
          account: address,
          functionName: 'approve',
          args: [
            address,
            BigInt(purchaseAmount) * BigInt(10 ** 6),
          ],
          chainId: sepolia.id,
        });

        console.log("Request simulated:", request)
        const hash = await writeContract(config2, request);
        console.log("Contract write successful! Hash:", hash);
        await handleWriteContract(hash);
      } catch (error) {
        console.error("Error writing to contract:", error);
      }
    }
  };


  const handleWriteContract = async (hash) => {
    if (hash) {
      try {
        console.log("Simulating contract with config:", USDT_CONTRACT_ADDRESS, address);
        const { request } = await simulateContract(config2, {
          abi: ERC20USDT_ABI,
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

        console.log("Request simulated:", request)
        const hash = await writeContract(config2, request);
        console.log("Contract write successful! Hash:", hash);
      } catch (error) {
        console.error("Error writing to contract:", error);
      }
    }
  };


  const handleBuyClick = () => {
    if (selectedToken === 'eth') {
      handleSendEthTransaction();
    } else if (selectedToken === 'usdt') {
      approveUserMaxCap();
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
