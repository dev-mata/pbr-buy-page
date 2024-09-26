'use client'

import Image from "next/image";

import pbrGuy from "../public/assets/pbr-guy.png"
import bearIcon from "../public/assets/bearIcon.svg"

import PurchaseForm from "../components/PurchaseForm"


export default function Home() {


  // return <button onClick={() => open()}>Connect Wallet</button>;


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
                  <h2 className="text-3xl font-bold">LOREM IPSUM</h2>
                  <p className="font-light text-lg">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus dignissim aliquet commodo.</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex-shrink-0">
                <span className="inline-block p-2 rounded-full">
                    <span role="img" aria-label="icon"><Image src={bearIcon}  alt="bear-icon" /></span>
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
                    <span role="img" aria-label="icon"><Image src={bearIcon}  alt="bear-icon" /></span>
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
