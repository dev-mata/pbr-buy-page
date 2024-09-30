import { TonConnectButton, useTonAddress, useTonWallet, useIsConnectionRestored, useTonConnectUI  } from "@tonconnect/ui-react"



import Image from "next/image";
import pbrIcon from "../public/assets/pbrIcon.png"

import '../styles/TonConnectButtonStyles.css';



export default function PBRWalletConnect() {

    const tonAddress = useTonAddress();
    const tonWallet = useTonWallet();

    const [tonConnectUI] = useTonConnectUI();

    console.log("tonAddress----", tonAddress)
    console.log("tonWallet----", tonWallet)





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

        </div>

    )

}