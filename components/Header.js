import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import logo from "../public/assets/pbr-logo.svg"
import WalletConnectButton from "./WalletConnectButton";
import PBRWallet from "./PBRWallet";


export default function Header() {
    
    const [signature, setSignature] = useState("");

    const handleSignature = (signatureResult) => {
        setSignature(signatureResult);
    };



    return (
        <header className="bg-pbr-yellow shadow-md p-4 font-londrina">
            <div className="container mx-auto flex justify-between items-center">

                <div className="flex-shrink-0">
                    <Link href="/" className="text-2xl font-bold">
                        <Image src={logo} alt="" />
                    </Link>
                </div>


                <nav className="space-x-8 text-black flex">
                    <Link href="/" className="text-lg font-medium px-4 py-2 rounded-lg bg-pb-gray hover:bg-pbr-blue hover:text-white border-solid border-2 border-black">Buy</Link>
                    <Link href="/history" className="text-lg font-medium px-4 py-2 rounded-lg bg-pb-gray hover:bg-pbr-blue hover:text-white border-solid border-2 border-black">History</Link>
                    <Link href="/leaderboard" className="text-lg font-medium px-4 py-2 rounded-lg bg-pb-gray hover:bg-pbr-blue hover:text-white border-solid border-2 border-black">Leaderboard</Link>
                    <PBRWallet signature={signature} />
                </nav>


                <div>
                    <WalletConnectButton setSignature={handleSignature} />
                </div>
            </div>
        </header>
    )
}