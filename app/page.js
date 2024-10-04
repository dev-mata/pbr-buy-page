'use client'

import { useEffect, useState } from "react";
import Image from "next/image";

import pbrGuy from "../public/assets/pbr-guy.png"
import bearIcon from "../public/assets/bearIcon.svg"

import PurchaseForm from "../components/PurchaseForm"
import PBRWallet from "../components/PBRWallet"
import pbrIcon from "../public/assets/pbrIcon.png"
import { useAccount } from 'wagmi';
import {fetchUserDashboard} from "../lib/api"






export default function Home() {
const { address, isConnected } = useAccount();
const [dashboardData, setDashboardData] = useState(null);



 
  return (
    <>

      <div className=" bg-pbr-yellow flex items-center justify-center">
        <div className="mt-[5rem] md:mt-[10rem]">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-6xl w-full p-6">

            <div className="relative col-span-2 bg-pbr-yellow-light border-solid border-2 border-black rounded-2xl p-6 text-black font-londrina">

              <Image src={pbrGuy} alt="pbr-guy" className="absolute -top-[118px] left-3" />
              <div className="space-y-6 mt-6">

              {/* TON Wallet */}
              <div className="flex items-center ">
                    <Image src={pbrIcon} alt="pbr-icon" className="w-8 h-8 mr-2 " />
                    <span className="mr-2">{dashboardData} xxxxPBRWalletHereIfConnected</span>
                    {/* <button
                        type="button"
                        onClick={disconnectPBRWallet}
                        className="bg-pbr-blue hover:bg-yellow-600 text-white px-1 py-1 text-sm border-solid border-black border-2 rounded-xl font-bold"
                    >
                        Disconnect PBR
                    </button> */}
                </div>

         

                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <span className="inline-block p-2 rounded-full">
                      <span role="img" aria-label="icon"><Image src={bearIcon} alt="bear-icon" /></span>
                    </span>
                  </div>
                  <div className="ml-4">
                    <h2 className="text-3xl font-bold">LOREM IPSUM</h2>
                    <p className="font-light text-lg">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus dignissim aliquet commodo.</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <span className="inline-block p-2 rounded-full">
                      <span role="img" aria-label="icon"><Image src={bearIcon} alt="bear-icon" /></span>
                    </span>
                  </div>
                  <div className="ml-4">
                    <h2 className="text-3xl font-bold">LOREM IPSUM</h2>
                    <p className="font-light text-lg">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus dignissim aliquet commodo.</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <span className="inline-block p-2 rounded-full">
                      <span role="img" aria-label="icon"><Image src={bearIcon} alt="bear-icon" /></span>
                    </span>
                  </div>
                  <div className="ml-4">
                    <h2 className="text-3xl font-bold">LOREM IPSUM</h2>
                    <p className="font-light text-lg">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus dignissim aliquet commodo.</p>
                  </div>
                </div>
              </div>




            </div>


            {/* Purchase PBR Component */}
            <PurchaseForm />




          </div>
        </div>
      </div>
    </>
  )

}
