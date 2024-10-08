'use client'

import { useState, useEffect } from 'react';

import { useWeb3Modal, useWalletInfo } from "@web3modal/wagmi/react";
import { useAccount, useSignMessage, useDisconnect  } from 'wagmi';
import { authenticateMetaMask } from "../lib/api"
import { setCookie, getCookie, deleteCookie } from 'cookies-next';

import Image from 'next/image';
import { TransactionPendingOverlay } from './TransactionPendingOverlay';

export default function WalletConnectButton({ setSignature }) {
    const { walletInfo } = useWalletInfo()
    const { open } = useWeb3Modal();
    const { address, isConnected } = useAccount();
    const { signMessageAsync } = useSignMessage();
    const { disconnect } = useDisconnect();

    const [isLoading, setisLoading] = useState(false);
    
    const [token, setToken] = useState(null);


    const signWallet = async () => {
        const message = `Sign this message to authenticate with MetaMask`;
        try {

            const signatureResult = await signMessageAsync({ message });
            setSignature(signatureResult);

            setisLoading(true)
            const response = await authenticateMetaMask(address, signatureResult);

            if (response.success) {
                setCookie('authToken', response.token, { maxAge: 60 * 60 * 24, httpOnly: false });
                setCookie('metamaskSignature', signatureResult, { maxAge: 60 * 60 * 24, httpOnly: false });
                setisLoading(false)
            } else {
                console.error('Authentication failed.');
                disconnect()
            }
        } catch (error) {
            console.error('Error signing message:', error);
        }
    };

    useEffect(() => {
        const authToken = getCookie('authToken');
        setToken(authToken);
    }, []);


    useEffect(() => {

        const timeoutId = setTimeout(() => {
            if (isConnected && address && !token) {
                console.log("logged true", isConnected);
                signWallet();
            } else if (isConnected === false) {
                console.log("logged false", isConnected);
                deleteCookie('authToken')
                deleteCookie('metamaskSignature')
                setToken("")
                
            }
        }, 2000); // Delay by 100ms (or adjust as needed)

        return () => clearTimeout(timeoutId); // Clean up timeout on unmount

    }, [isConnected, address]);


    if(isLoading){
        return (
           < TransactionPendingOverlay message="The Bear is authenticating your account. Please wait.." />
        )
    }

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

