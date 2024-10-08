'use client'

import { useEffect, useState } from "react";
import Image from "next/image";

import pbrGuy from "../public/assets/pbr-guy.png"
import bearIcon from "../public/assets/bearIcon.svg"
import PurchaseForm from "../components/PurchaseForm"

export default function Home() {

  return (
    <>

      <div className=" bg-pbr-yellow flex items-center justify-center">
        <div className="mt-[5rem] md:mt-[10rem]">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-6xl w-full p-6">

            <div className="relative col-span-2 bg-pbr-yellow-light border-solid border-2 border-black rounded-2xl p-6 text-black font-londrina">

              <Image src={pbrGuy} alt="pbr-guy" className="absolute -top-[118px] left-3" />
              <div className="space-y-6 mt-6">

          
          
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <span className="inline-block p-2 rounded-full">
                      <span role="img" aria-label="icon"><Image src={bearIcon} alt="bear-icon" /></span>
                    </span>
                  </div>
                  <div className="ml-4">
                    <h2 className="text-3xl font-bold">Login with MetaMask</h2>
                    <p className="font-light text-lg">Connect your MetaMask wallet to access our platform seamlessly.</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <span className="inline-block p-2 rounded-full">
                      <span role="img" aria-label="icon"><Image src={bearIcon} alt="bear-icon" /></span>
                    </span>
                  </div>
                  <div className="ml-4">
                    <h2 className="text-3xl font-bold">Create Your $PBR TON Wallet</h2>
                    <p className="font-light text-lg">Set up your $PBR TON wallet effortlessly to receive your PBR tokens.</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <span className="inline-block p-2 rounded-full">
                      <span role="img" aria-label="icon"><Image src={bearIcon} alt="bear-icon" /></span>
                    </span>
                  </div>
                  <div className="ml-4">
                    <h2 className="text-3xl font-bold">Make a Purchase</h2>
                    <p className="font-light text-lg">Buy PBR tokens using your preferred currency: ETH, BNB, USDT, or USDC.</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <span className="inline-block p-2 rounded-full">
                      <span role="img" aria-label="icon"><Image src={bearIcon} alt="bear-icon" /></span>
                    </span>
                  </div>
                  <div className="ml-4">
                    <h2 className="text-3xl font-bold">Join Our Referral Program</h2>
                    <p className="font-light text-lg">Invite friends and earn rewards!</p>
                    <p className="font-light text-lg">~ Referrer Bonus: 20,000 tokens for each successful referral.</p>
                    <p className="font-light text-lg">~ Referral Bonus: 2,000 tokens for users who make a purchase.</p>
                    <p className="font-light text-lg">~ Don’t miss out on this opportunity—start your journey with TON today!</p>
                    <p className="font-light text-lg">~ Invite friends and earn rewards!</p>

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
