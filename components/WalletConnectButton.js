'use client'

import { useState, useEffect } from 'react';

import { useWeb3Modal, useWalletInfo } from "@web3modal/wagmi/react";
import { useAccount, useSignMessage } from 'wagmi';
import axios from 'axios';


import Image from 'next/image';

export default function WalletConnectButton() {
    const { walletInfo } = useWalletInfo()

    const { open } = useWeb3Modal();
    const { address, isConnected } = useAccount(); // Wallet information
    const { signMessageAsync } = useSignMessage(); // For signing the message
    const [signature, setSignature] = useState("");
    const [walletAddress, setWalletAddress] = useState("");


    // Function to call the API with the wallet address and signature using Axios
    const authenticateMetaMask = async (walletAddress, signature) => {
        try {
            const response = await axios.post('https://api-buy.pumpingbear.com/api/authenticateMetaMask', {
                address,
                signature
            });

            setApiResponse(response.data); // Store the API response
            console.log('API Response:', response.data);
        } catch (error) {
            console.error('Error during API call:', error);
        }
    };


    // This function is called after wallet is connected to sign a message
    const signWallet = async () => {
        const message = `Sign this message to authenticate with MetaMask`;
        try {
            const signatureResult = await signMessageAsync({ message });
            setSignature(signatureResult); // Set the generated signature
            console.log("Signature:", signatureResult);

            // Call the API after signing the message
            authenticateMetaMask(walletAddress, signatureResult);
        } catch (error) {
            console.error('Error signing message:', error);
        }
    }; 

    // When the wallet connects, automatically trigger the signing
    useEffect(() => {
        if (isConnected && address) {
            setWalletAddress(address); // Store wallet address after connection
            signWallet(); // Automatically sign after wallet connects
        }
    }, [isConnected, address]);

    // Function to trigger MetaMask connection manually
    const authenticateWallet = async () => {
        if (!isConnected) {
            await open(); // Opens MetaMask to connect the wallet
        }
    };



    return (

        <button

            onClick={() => open()}
            className="flex items-center px-4 py-2 bg-pbr-blue border-solid border-2 border-black text-white text-lg rounded-xl space-x-2 hover:bg-pbr-yellow-dark hover:text-black"
        >
            {walletInfo ? <Image src={walletInfo.icon} width={20} height={20} alt='wallet-network' /> : <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#fffff" fill="none">
                <path d="M16 14C16 14.8284 16.6716 15.5 17.5 15.5C18.3284 15.5 19 14.8284 19 14C19 13.1716 18.3284 12.5 17.5 12.5C16.6716 12.5 16 13.1716 16 14Z" stroke="currentColor" strokeWidth="1.5" />
                <path d="M10 7H16C18.8284 7 20.2426 7 21.1213 7.87868C22 8.75736 22 10.1716 22 13V15C22 17.8284 22 19.2426 21.1213 20.1213C20.2426 21 18.8284 21 16 21H10C6.22876 21 4.34315 21 3.17157 19.8284C2 18.6569 2 16.7712 2 13V11C2 7.22876 2 5.34315 3.17157 4.17157C4.34315 3 6.22876 3 10 3H14C14.93 3 15.395 3 15.7765 3.10222C16.8117 3.37962 17.6204 4.18827 17.8978 5.22354C18 5.60504 18 6.07003 18 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>}

            <span>
                {isConnected ? `Connected: ${address.slice(0, 6)}...${address.slice(-4)}` : 'Connect Wallet'}
            </span>
        </button>




    )
}

