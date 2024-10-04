import { beginCell, toNano  } from '@ton/ton'
import { TonConnectButton, useTonAddress, useTonWallet, useIsConnectionRestored, useTonConnectUI } from "@tonconnect/ui-react"


import Image from "next/image";
import pbrIcon from "../public/assets/pbrIcon.png"

export default function PBRWalletConnect() {


    const tonAddress = useTonAddress();
    const tonWallet = useTonWallet();
    const [tonConnectUI, setOptions] = useTonConnectUI();


    const destination = '0QAs-agG3LH1MGHyyiO6CJnCvMpxOChtU0fxXSmznX8WX27F'
    // test message 
    const body = beginCell()
        .storeUint(0, 32) 
        .storeStringTail("Sign this message to authenticate with TON Wallet") 
        .endCell();

        const myTransaction = {
            validUntil: Math.floor(Date.now() / 1000) + 360,
            messages: [
                {
                    address: destination,
                    amount: toNano("0.000005").toString(),
                    payload: body.toBoc().toString("base64") 
                }
            ]
        }




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
                <TonConnectButton />

            )}

            <button onClick={() => tonConnectUI.sendTransaction(myTransaction)}>Click Meeee</button>
        </div>

    )

}