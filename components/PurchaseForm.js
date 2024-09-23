'use client'

import { useEffect, useState } from "react";

import Image from "next/image";
import tonIcon from "../public/assets/tonIcon.svg"
import pbrIcon from "../public/assets/pbrIcon.png"
import ethIcon from "../public/assets/ethIcon.svg"
import bnbIcon from "../public/assets/bnbIcon.svg"
import maticIcon from "../public/assets/maticIcon.svg"
import usdtIcon from "../public/assets/usdtIcon.svg"
import noNetworkIcon from "../public/assets/noNetwork.svg"
import sepoliaIcon from "../public/assets/sepoliaIcon.svg"
import dropdownIcon from "../public/assets/dropdown.svg"


import { erc20ABI } from "../lib/abis"


import { useAccount, useBalance, useReadContract, useNetwork } from 'wagmi';

const USDT_CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_USDT_SEPOLIA_CONTRACT_ADDRESS

export default function PurchaseForm() {
    const { chain, chains, address, isConnected } = useAccount();
    const [tokenName, setTokenName] = useState('');

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const [purchaseAmount, setpurchaseAmount] = useState('');
    const [pbrAmount, setPbrAmount] = useState('');

    const [usdtBalance, setUsdtBalance] = useState(null);
    const isSepolia = chain?.id === process.env.NEXT_PUBLIC_USDT_SEPOLIA_CHAIN_ID;

    const { data: ethBalance } = useBalance({
        address,
        enabled: isSepolia && isConnected,
    });


    // Getting Token
    const { data: tokenNameData } = useReadContract({
        address: USDT_CONTRACT_ADDRESS,
        abi: erc20ABI,
        functionName: 'name',
        enabled: isSepolia && isConnected,
    });


    const { data: usdtData } = useReadContract({
        address: USDT_CONTRACT_ADDRESS,
        abi: erc20ABI,
        functionName: 'balanceOf',
        args: [address],
        enabled: isSepolia && isConnected,
    });

    const formatUSDTInteger = (value) => {
        // Convert the value, divide by 10^6, and format with commas (no decimals)
        return new Intl.NumberFormat('en-US', {
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(Math.floor(Number(value) / 10 ** 12)); // Use Math.floor to remove decimal places
    };

    const toggleDropdown = () => {
        setIsDropdownOpen((prev) => !prev);
    };


    // Format USDT balance and store it in state
    useEffect(() => {
        if (usdtData) {
            const formattedBalance = Number(usdtData) / 10 ** 6; // USDT has 6 decimals
            const usdtNumberBalance = formatUSDTInteger(formattedBalance)
            setUsdtBalance(usdtNumberBalance);
            console.log("Formatted USDT Balance:", usdtNumberBalance); // Log the formatted value before setting the state
        }
    }, [usdtData]);

    useEffect(() => {
        if (tokenNameData) {
            setTokenName(tokenNameData); // Set the token name (e.g., "Tether USD")
        }
    }, [tokenNameData]);


    if (!chain || !chain.name) {
        return <p className="text-2xl text-black font-londrina">No network connected</p>; // Display message if no chain is connected
    }


    const chainIcon = getChainIcon(chain.name);
    const tokenIcon = getTokenIcon(tokenName);


    return (
        <div className="bg-pbr-blue text-white rounded-2xl p-6 font-londrina font-light">
            <h2 className="text-2xl font-bold mb-4">Buy PBR now and start earning!</h2>
            <form className="space-y-4">
                {/* Payment Method Dropdown */}
                <div className="relative">
                    <label className="block text-xl font-medium">Network</label>
                    <div className="relative">
                        <input
                            type="text"
                            className="mt-1 w-full pl-10 pr-2 py-3 border-solid border-black border-2 rounded-xl bg-white text-black text-xl"
                            value={chain.name}
                            readOnly
                            disabled
                        />

                        <Image
                            src={chainIcon}
                            width={20}
                            height={20}
                            alt="Crypto Logo"
                            className="absolute left-3 top-1/2 transform -translate-y-1/2 w-6 h-6"
                        />

                    </div>
                </div>

                {/* Input Fields */}
                <div className="relative">
                    <label className="block text-xl font-medium">Amount</label>
                    <div className="relative">
                        <input
                            type="number"
                            className="mt-1 w-full pl-10 pr-2 py-3 border-solid border-black border-2 rounded-xl bg-white text-black text-right text-xl"
                            onChange={(e) => setpurchaseAmount(e.target.value)}
                        />
                        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 flex items-center space-x-1">
                            <Image
                                src={tokenIcon}
                                width={20}
                                height={20}
                                alt="Crypto Logo"
                                className="w-6 h-6 cursor-pointer"
                                onClick={toggleDropdown}
                            />
                            <Image
                                src={dropdownIcon}
                                alt="Dropdown Icon"
                                className="cursor-pointer"
                                onClick={toggleDropdown}
                            />
                        </div>


                        {/* Dropdown */}
                        {isDropdownOpen && (
                            <div className="absolute left-2 mt-2 w-48 bg-white text-black shadow-md border border-gray-300 rounded-xl z-10">
                                <ul className="p-2">
                                    <li
                                        className="py-2 px-2 hover:bg-gray-100 cursor-pointer flex items-center justify-between"
                                        onClick={() => console.log('Option 1 selected')}
                                    >
                                        <span className="ml-2">
                                            <Image src={ethIcon} width={20} height={20} alt="Ethereum Icon" />
                                        </span>

                                        <span>Ethereum</span>

                                    </li>
                                    <li
                                        className="py-2 px-2 hover:bg-gray-100 cursor-pointer flex items-center justify-between"
                                        onClick={() => console.log('Option 1 selected')}
                                    >
                                        <span className="ml-2">
                                            <Image src={usdtIcon} width={20} height={20} alt="Ethereum Icon" />
                                        </span>

                                        <span>USDT (ERC-20) </span>

                                    </li>

                                </ul>
                            </div>
                        )}
                    </div>
                    <p className="text-sm text-white text-right mr-2">{usdtBalance} {tokenName}</p>
                </div>

                <div className="relative">
                    <label className="block text-xl font-medium">Total</label>
                    <div className="relative">
                        <input
                            type="text"
                            className="mt-1 w-full pl-10 pr-2 py-3 border-solid border-black border-2 rounded-xl bg-white text-black text-right text-xl"
                            value="999,999,999"
                            readOnly
                        />
                        <Image
                            src={pbrIcon}
                            alt="Crypto Logo"
                            className="absolute left-3 top-1/2 transform -translate-y-1/2 w-6 h-6"
                        />
                    </div>
                </div>


                {/* Conversion Rate */}
                <p className="text-sm text-white text-right mr-2">1 PBR = 0.0000025 TON</p>

                {/* Buy Button */}
                <button type="submit" className="w-full  bg-pbr-yellow-dark hover:bg-yellow-600 text-black px-2 py-3 text-lg border-solid border-black border-2 rounded-xl font-bold">
                    BUY $PBR
                </button>
            </form>
        </div>
    )
}

export const getChainIcon = (chainName) => {
    switch (chainName) {
        case 'Ethereum':
            return ethIcon;
        case 'Sepolia':
            return sepoliaIcon
        case 'BNB Smart Chain':
            return bnbIcon;
        case 'Polygon':
            return maticIcon;
        default:
            return noNetworkIcon; // No icon available for this chain
    }
};

export const getTokenIcon = (tokenName) => {
    switch (tokenName) {
        case 'USDT':
            return usdtIcon;
        default:
            return noNetworkIcon; // No icon available for this chain
    }
};



 