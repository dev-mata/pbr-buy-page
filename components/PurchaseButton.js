import { useSendTransaction, useContractWrite, usePrepareContractWrite } from 'wagmi';
import { erc20ABI } from '../lib/abis';

export default function PurchaseButton({ purchaseAmount, selectedToken, recipientAddress }) {
  const USDT_CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_USDT_CONTRACT_ADDRESS; // Set your USDT contract address here

  // Prepare for sending ETH
  const { sendTransaction } = useSendTransaction({
    to: recipientAddress,
    value: BigInt(purchaseAmount * 10 ** 18), // Wagmi will handle the conversion, no need for ethers
  });

  // Prepare for sending USDT or ERC-20 tokens
  const { config } = usePrepareContractWrite({
    address: USDT_CONTRACT_ADDRESS,
    abi: erc20ABI,
    functionName: 'transfer',
    args: [recipientAddress, BigInt(purchaseAmount * 10 ** 6)], // USDT uses 6 decimals, handle it with BigInt
    enabled: selectedToken === 'usdt', // Only enabled if the selected token is USDT
  });

  const { write: sendUSDT } = useContractWrite(config);

  const handleBuyClick = () => {
    if (selectedToken === 'eth') {
      // Send ETH
      sendTransaction();
    } else if (selectedToken === 'usdt') {
      // Send USDT
      sendUSDT();
    }
  };

  return (
    <button
      type="button"
      onClick={handleBuyClick}
      className="w-full bg-pbr-yellow-dark hover:bg-yellow-600 text-black px-2 py-3 text-lg border-solid border-black border-2 rounded-xl font-bold"
    >
      BUY $ABC
    </button>
  );
}
