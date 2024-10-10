import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import logo from "../public/assets/pbr-logo.svg"
import WalletConnectButton from "./WalletConnectButton";
import PBRWallet from "./PBRWallet";


export default function Header({ setIsTransactionOpen, userDashboardData, refreshDashboardData  }) {
  const [signature, setSignature] = useState("");

  const [passedOnUserDashboard, setPassedOnUserDashboard] = useState();


 

  const handleSignature = (signatureResult) => {
    setSignature(signatureResult);
  };

  const handleOnClickTransactions = () => {
    setIsTransactionOpen(true);
  };

  const handleOnClickBuy = () => {
    setIsTransactionOpen(false);
  };


  useEffect(() => {
    setPassedOnUserDashboard(userDashboardData)
  }, [userDashboardData]);

  console.log("userDashboardDataxxxxx", passedOnUserDashboard)

  
  return (
    <header className="bg-pbr-yellow shadow-md p-4 font-londrina">
      <div className="container mx-auto flex justify-between items-center">

        <div className="flex-shrink-0">
          <Link href="/" className="text-2xl font-bold">
            <Image src={logo} alt="Logo" />
          </Link>
        </div>

        <nav className="hidden lg:block lg:flex block space-x-8 text-black flex-col lg:flex-row items-center w-full lg:w-auto">

          <div className="text-lg font-medium px-4 py-2 rounded-lg bg-pb-gray hover:bg-pbr-blue hover:text-white border-solid border-2 border-black"
            onClick={handleOnClickBuy}
          >Buy</div>

          <div
            className="text-lg font-medium px-4 py-2 rounded-lg bg-pb-gray hover:bg-pbr-blue hover:text-white border-solid border-2 border-black"
            onClick={handleOnClickTransactions}
          >History
          </div>

          <Link href="/leaderboard" className="text-lg font-medium px-4 py-2 rounded-lg bg-pb-gray hover:bg-pbr-blue hover:text-white border-solid border-2 border-black">Leaderboard</Link>

          <PBRWallet userDashboardData={passedOnUserDashboard} refreshDashboardData={refreshDashboardData} />
         
        </nav>


        <div className="">
          <WalletConnectButton setSignature={handleSignature} />
        </div>

      </div>

    </header>
  )
}