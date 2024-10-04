
import { useState, useEffect } from "react";
import { createTonWallet } from "../lib/api"
import { useAccount } from 'wagmi';
import { getCookie } from "cookies-next";



export default function PBRWallet({ signature }) {

    const { address, isConnected } = useAccount();
    const chainNetwork = "testnet"
    const [token, setToken] = useState(null);

    const handleCreatePBRWallet = () => {
        console.log("address-to-create-pbr", address, chainNetwork)
        console.log("token-to-create-pbr", token)
        console.log("signature-to-create-pbr", signature)

        createTonWallet(signature, address, chainNetwork, token)
    }

    useEffect(() => {
        const authToken = getCookie('authToken');
        setToken(authToken);
    }, []);

    useEffect(() => {
        // Check token changes manually (optional custom polling or any event listeners)
        const interval = setInterval(() => {
            const authToken = getCookie('authToken');
            setToken(authToken);
        }, 1000); // Poll every second for token updates

        return () => clearInterval(interval); // Clean up on component unmount
    }, []);




    return (
        <>
            {!token ? (
                <div>NO token</div>
            ) : (
                <button
                    type="button"
                    onClick={handleCreatePBRWallet}
                    className="flex items-center px-4 py-2 bg-pbr-blue border-solid border-2 border-black text-white text-lg rounded-xl space-x-2 hover:bg-pbr-yellow-dark hover:text-black"
                >
                    Get MY PBR Wallets
                </button>
            )

            }
        </>
    )
}