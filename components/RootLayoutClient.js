'use client'

import { TonConnectUIProvider } from "@tonconnect/ui-react";
import Web3ModalProvider from '../lib/wagmi-provider'
import Header from "../components/Header"


const manifestUrl = "http://54.176.36.64/tonconnect-manifest.json";

export default function RootLayoutClient({ children, initialState }) {
    return (
      <TonConnectUIProvider manifestUrl={manifestUrl}>
        <Web3ModalProvider initialState={initialState}>
          <Header />
          {children}
        </Web3ModalProvider>
      </TonConnectUIProvider>
    );
  }