'use client'
import { useState } from 'react';
import Web3ModalProvider from '../lib/wagmi-provider'
import Header from "../components/Header"
import Home from '../app/page';



export default function RootLayoutClient({ children, initialState }) {

  const [isTransactionOpen, setIsTransactionOpen] = useState(false);

  console.log("isTransactionOpen", isTransactionOpen)


    return (
        <Web3ModalProvider initialState={initialState}>
          <Header setIsTransactionOpen={setIsTransactionOpen} />
            <Home isTransactionOpen={isTransactionOpen} />
          {/* {children} */}
        </Web3ModalProvider>
    );
  }