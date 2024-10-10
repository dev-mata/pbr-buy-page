'use client'

import { useState } from "react"
import Instructions from "../components/Instructions"
import PurchaseForm from "../components/PurchaseForm"
import MobileHeader from "../components/MobileHeader"
import Transactions from "../components/Transactions"

export default function Home({ isTransactionOpen, userDashboardData }) {


  return (
    <>




      <MobileHeader />

      {/* Purchase PBR Component */}
      {!isTransactionOpen ?

        <div className=" bg-pbr-yellow flex items-center justify-center font-londrina">
          <div className="mt-[5rem] md:mt-[10rem]">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-6xl w-full p-6">
              <Instructions />
              <PurchaseForm />
            </div>
          </div>
        </div>

        :

        <Transactions userDashboardData={userDashboardData}  />
      }




    </>
  )

}
