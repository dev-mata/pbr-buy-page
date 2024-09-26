import { defaultWagmiConfig } from "@web3modal/wagmi";
import { cookieStorage, createStorage } from "wagmi";
import { http, createConfig } from '@wagmi/core'
import { bsc, mainnet, sepolia, polygon } from '@wagmi/core/chains'

export const projectId = process.env.WALLET_CONNECT_API_KEY || '5dd9b369ae173a94f01e196fa27a067f';
 
 
const metadata = {
  name: "Pumping Bear Coin (PBR)",
  description: "Pumping Bear Coin (PBR) is a revolutionary TON memecoin that thrives in any market. Join our community-driven pumps, enjoy low fees &amp; fast transactions, and be part of the memecoin revolution!",
  url: "https://pumpingbear.com/",
  icons: ["https://cache.tonapi.io/imgproxy/ZGQwJUacuVv2HJlUna2e6-jKHJH1McUBMRoTCNnuR88/rs:fill:200:200:1/g:no/aHR0cHM6Ly9ibGFjay1wZXRpdGUtdGFyc2llci04MC5teXBpbmF0YS5jbG91ZC9pcGZzL1FtV3BleWY2azJRY0JFdTdnYWhlUXRZSHRRdml5VEo0RlE3WUVCVFoza3RCVjc.webp"],
};

export const config = defaultWagmiConfig({
  chains: [sepolia, mainnet, bsc, polygon],
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
    [bsc.id]: http(),
  },
  projectId,
  metadata,
  ssr: true,

});

export const config2 = createConfig({
  chains: [mainnet, sepolia],
  ssr: true,
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
  },
})

