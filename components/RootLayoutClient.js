'use client'
import Web3ModalProvider from '../lib/wagmi-provider'
import Header from "../components/Header"



export default function RootLayoutClient({ children, initialState }) {
    return (
        <Web3ModalProvider initialState={initialState}>
          <Header />
          {children}
        </Web3ModalProvider>
     
    );
  }