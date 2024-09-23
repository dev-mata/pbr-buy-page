'use client'

import { useEffect, useState } from "react";
import useDebounce from "../hooks/useDebounce"

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
import { convertPbrPurchase } from "../lib/api"

import { useAccount, useBalance, useReadContract } from 'wagmi';

const USDT_DECIMALS = 6;
const DEBOUNCE_DELAY = 500;
const USDT_CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_USDT_SEPOLIA_CONTRACT_ADDRESS

export default function PurchaseForm() {
    const { chain, chains, address, isConnected } = useAccount();
    const [tokenName, setTokenName] = useState('');

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const [purchaseAmount, setPurchaseAmount] = useState(0);
    const debouncedAmount = useDebounce(purchaseAmount, 500);
    const [currency] = useState('usdt');
    const phase = useState(1);
    const [pbrAmount, setPbrAmount] = useState(0);

    const [usdtBalance, setUsdtBalance] = useState(null);
    const isSepolia = chain?.id === process.env.NEXT_PUBLIC_USDT_SEPOLIA_CHAIN_ID;

    const { data: ethBalance } = useBalance({
        address,
        enabled: isSepolia && isConnected,
    });



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
        return new Intl.NumberFormat('en-US', {
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(Math.floor(Number(value) / 10 ** 12));
    };


    const toggleDropdown = () => {
        setIsDropdownOpen((prev) => !prev);
    };



    useEffect(() => {
        const fetchPbrAmount = async () => {
            if (debouncedAmount > 0) {
                try {
                    const result = await convertPbrPurchase(1, 'usdt', debouncedAmount);
                    setPbrAmount(result.data.bprTokens);
                } catch (error) {
                    console.error('Error during purchase:', error);
                }
            }
        };
        fetchPbrAmount();
    }, [debouncedAmount]);

    const handlePurchaseAmountChange = (e) => {
        setPurchaseAmount(e.target.value);
    };



    useEffect(() => {
        if (usdtData) {
            const formattedBalance = Number(usdtData) / 10 ** USDT_DECIMALS;
            const usdtNumberBalance = formatUSDTInteger(formattedBalance)
            setUsdtBalance(usdtNumberBalance);
            console.log("Formatted USDT Balance:", usdtNumberBalance);
        }
    }, [usdtData]);

    useEffect(() => {
        if (tokenNameData) {
            setTokenName(tokenNameData);
        }
    }, [tokenNameData]);


    if (!chain || !chain.name) {
        return <p className="text-2xl text-black font-londrina">No network connected</p>;
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
                            onChange={handlePurchaseAmountChange}
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
                            value={pbrAmount}
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
                <p className="text-sm text-white text-right mr-2 "> 1 PBR = 0.000003 ETH</p>

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



