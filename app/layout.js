import { headers } from 'next/headers'
import localFont from "next/font/local";
import { Londrina_Solid } from 'next/font/google'
import "./globals.css";


import { Metadata } from 'next'

import { cookieToInitialState } from "wagmi";

import { config2 } from '../lib/config'

// import Web3ModalProvider from '../lib/wagmi-provider'
// import Header from "../components/Header"

import RootLayoutClient from "../components/RootLayoutClient"

const londrina = Londrina_Solid({
  subsets: ['latin'],
  weight: ['100', '300', '400', '900'],
  variable: '--font-londrina',
  display: 'swap',
})


const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "Pumping Bear",
  description: "Generated by create next app",
};


export const TonConnectProvider = ({ children }) => (
  <TonConnectUIProvider manifestUrl={manifestUrl}>
    {children}
  </TonConnectUIProvider>
);

export default function RootLayout({ children }) {
  const initialState = cookieToInitialState(config2, headers().get('cookie'))

  return (
    <html lang="en" className={londrina.variable}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-pbr-yellow`}
      >
        <RootLayoutClient initialState={initialState}>{children}</RootLayoutClient>
      </body>
    </html>
  );
}
