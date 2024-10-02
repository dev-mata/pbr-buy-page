import { TonConnectButton, useTonAddress, useTonWallet, useIsConnectionRestored, useTonConnectUI  } from "@tonconnect/ui-react"
import { TonConnect } from '@tonconnect/sdk';


import Image from "next/image";
import pbrIcon from "../public/assets/pbrIcon.png"



export default function PBRWalletConnect() {

    const tonConnect = new TonConnect();


    const tonAddress = useTonAddress();
    const tonWallet = useTonWallet();

    const [tonConnectUI] = useTonConnectUI();
    



    console.log("tonAddress----", tonAddress)
    console.log("tonWallet----", tonWallet)



    const handleSignMessage = async () => {
        const message = 'Sign this message to authenticate with TON Wallet';
        const messageBuffer = new TextEncoder().encode(message);
        try {
            const signedData = await tonConnectUI.sendTransaction({
                validUntil: Math.round(Date.now() / 1000) + 60, // Timeout for the transaction
                messages: [
                  {
                    address: tonAddress,
                    data: messageBuffer,
                  },
                ],
              });

              console.log('Signed data:', signedData);

        } catch (error) {
            console.error('Error signing message:', error);
          }
    }






    const disconnectPBRWallet = async () => {
        await tonConnectUI.disconnect();
    }

    return (
        <div>
            {tonAddress ? (
                <div className="flex items-center ">
                    <Image src={pbrIcon} alt="pbr-icon" className="w-8 h-8 mr-2 " />
                    <span className="mr-2">{tonAddress}</span>
                    <button
                        type="button"
                        onClick={disconnectPBRWallet}
                        className="bg-pbr-blue hover:bg-yellow-600 text-white px-1 py-1 text-sm border-solid border-black border-2 rounded-xl font-bold"
                    >
                        Disconnect PBR
                    </button>
                </div>

            ) : (
              <TonConnectButton  /> 
              
            )}

<button onClick={handleSignMessage}>Click Meeee</button>
        </div>

    )

}