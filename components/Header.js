import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import logo from "../public/assets/pbr-logo.svg"
import WalletConnectButton from "./WalletConnectButton";
import PBRWallet from "./PBRWallet";


export default function Header() {
    const [signature, setSignature] = useState("");
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleSignature = (signatureResult) => {
        setSignature(signatureResult);
    };

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
      };


    return (
        <header className="bg-pbr-yellow shadow-md p-4 font-londrina">
        <div className="container mx-auto flex justify-between items-center">
      
          <div className="flex-shrink-0">
            <Link href="/" className="text-2xl font-bold">
              <Image src={logo} alt="Logo" />
            </Link>
          </div>
  
        
          <div className="block lg:hidden">
            <button onClick={toggleMenu} className="text-black focus:outline-none">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
              </svg>
            </button>
          </div>
  
        
          <nav className={`lg:flex ${isMenuOpen ? 'block' : 'hidden'} space-x-8 text-black flex-col lg:flex-row items-center w-full lg:w-auto`}>
            <Link href="/" className="text-lg font-medium px-4 py-2 rounded-lg bg-pb-gray hover:bg-pbr-blue hover:text-white border-solid border-2 border-black">Buy</Link>
            <Link href="/history" className="text-lg font-medium px-4 py-2 rounded-lg bg-pb-gray hover:bg-pbr-blue hover:text-white border-solid border-2 border-black">History</Link>
            <Link href="/leaderboard" className="text-lg font-medium px-4 py-2 rounded-lg bg-pb-gray hover:bg-pbr-blue hover:text-white border-solid border-2 border-black">Leaderboard</Link>
            <PBRWallet signature={signature} />
          </nav>
  
      
          <div className="hidden lg:block">
            <WalletConnectButton setSignature={handleSignature} />
          </div>
        </div>
  
   
        {isMenuOpen && (
          <div className="block lg:hidden mt-4">
            <WalletConnectButton setSignature={handleSignature} />
          </div>
        )}
      </header>
    )
}