
import { useState, useEffect } from "react";
import { createTonWallet, fetchUserDashboard } from "../lib/api"
import { useAccount } from 'wagmi';
import { getCookie } from "cookies-next";

import Image from "next/image";
import pbrIcon from "../public/assets/pbrIcon.png"
import { TransactionPendingOverlay } from "../components/TransactionPendingOverlay";
import { CreatePBRWallet } from "../components/CreatePBRWallet";


export default function PBRWallet({ signature }) {

    const { address, isConnected } = useAccount();
    const chainNetwork = "testnet"
    const [token, setToken] = useState(null);
    const [metamaskSignature, setmetamaskSignature] = useState("");

    const [tonPbrWalletAddress, setTonPbrWalletAddress] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const [walletData, setWalletData] = useState(null);
    const [isCreateWalletPopupOpen, setIsCreateWalletPopupOpen] = useState(false);


    const handleCreatePBRWallet = async () => {
        try {
            setIsLoading(true)
            const response = await createTonWallet(metamaskSignature, address, chainNetwork, token)

            if (response.success) {
                console.log("Wallet created successfully")
                setWalletData(response.mnemonic)
                setIsLoading(false)
                setIsCreateWalletPopupOpen(true)
                console.log("dashboardtoken", token)
                fetchUserDashboard(token)
                    .then((data) => {
                        const fetchTonWalletAddress = data.data.tonWalletAddress;
                        setTonPbrWalletAddress(fetchTonWalletAddress)
                    })
                    .catch((error) => {
                        console.error('Error fetching dashboard data:', error);
                    });

            } else {
                console.error('Failed to create wallet', response)
            }
        } catch (error) {
            console.error('Error creating wallet: ', error)
        }

    }

    useEffect(() => {

        const authToken = getCookie('authToken');
        const metaSign = getCookie('metamaskSignature');
        setmetamaskSignature(metaSign)
        setToken(authToken);
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            const authToken = getCookie('authToken');
            setToken(authToken);

            const metaSign = getCookie('metamaskSignature');
            setmetamaskSignature(metaSign)

        }, 1000);

        return () => clearInterval(interval); // Clean up on component unmount
    }, []);


    useEffect(() => {
        if (token && address && isConnected) {
            const timeoutId = setTimeout(() => {
                console.log("dashboardtokenxxx", token)
                fetchUserDashboard(token)
                    .then((data) => {
                        const fetchTonWalletAddress = data.data.tonWalletAddress;
                        setTonPbrWalletAddress(fetchTonWalletAddress)
                    })
                    .catch((error) => {
                        console.error('Error fetching dashboard data:', error);
                    });

            }, 1500);
            return () => clearTimeout(timeoutId);
        } else {
            setTonPbrWalletAddress("")
        }
    }, [token, address]);


    const handleFinalizeWallet = () => {
        setIsCreateWalletPopupOpen(false); // close the popup
    };

    if (isCreateWalletPopupOpen) {
        return (
            <CreatePBRWallet
                data={walletData}
                onFinalize={handleFinalizeWallet} />
        )

    }


    if (isLoading) {
        return (
            <TransactionPendingOverlay />
        )
    }


    if (!isConnected) {
        return (
            <div></div>
        )
    }


    return (
        <>
            {
                tonPbrWalletAddress === "TON wallet not linked" ? (
                    !token && isConnected ? (
                        <div>--</div>
                    ) : (
                        <>
                            <button
                                type="button"
                                onClick={handleCreatePBRWallet}
                                className="flex items-center px-4 py-2 bg-pbr-blue border-solid border-2 border-black text-white text-lg rounded-xl space-x-2 hover:bg-pbr-yellow-dark hover:text-black"
                            >
                                Get My PBR Wallet
                            </button>
                        </>
                    )
                ) : (
                    <div className="flex items-center">
                        <Image src={pbrIcon} alt="pbr-icon" className="w-8 h-8 mr-2 " />

                        <a href={`https://tonscan.org/address/${tonPbrWalletAddress}`} className="flex items-center">
                            <span className="mr-1 bg-pbr-yellow-dark px-2 rounded-lg">{tonPbrWalletAddress != "TON wallet not linked" ? `PBR Wallet: ${tonPbrWalletAddress.slice(0, 15)}...${tonPbrWalletAddress.slice(-4)}` : '-'}</span>

                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="48" color="#000000" fill="none">
                                <path d="M11.0991 3.00012C7.45013 3.00669 5.53932 3.09629 4.31817 4.31764C3.00034 5.63568 3.00034 7.75704 3.00034 11.9997C3.00034 16.2424 3.00034 18.3638 4.31817 19.6818C5.63599 20.9999 7.75701 20.9999 11.9991 20.9999C16.241 20.9999 18.3621 20.9999 19.6799 19.6818C20.901 18.4605 20.9906 16.5493 20.9972 12.8998" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M20.556 3.49612L11.0487 13.0586M20.556 3.49612C20.062 3.00151 16.7343 3.04761 16.0308 3.05762M20.556 3.49612C21.05 3.99074 21.0039 7.32273 20.9939 8.02714" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                        </a>


                    </div>
                )
            }
        </>
    )
}  