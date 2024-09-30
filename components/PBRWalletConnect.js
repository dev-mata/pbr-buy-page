export default function PBRWalletConnect() {

    const handlePBRWalletConnection = () => {
        console.log("PBR Wallet COnnecting...")
    }

    return (
        <div>
            <button
                type="button"
                onClick={handlePBRWalletConnection}
                className="w-full bg-pbr-blue hover:bg-yellow-600 text-white px-2 py-3 text-lg border-solid border-black border-2 rounded-xl font-bold"
            >
                Create Your PBR Wallet!
            </button>
        </div>
    )

}