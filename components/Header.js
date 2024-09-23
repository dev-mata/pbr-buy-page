import Link from "next/link";
import Image from "next/image";
import logo from "../public/assets/pbr-logo.svg"
import WalletConnectButton from "./WalletConnectButton";


export default function Header() {
    return (
        <header className="bg-pbr-yellow shadow-md p-4 font-londrina">
            <div className="container mx-auto flex justify-between items-center">
                {/* Logo on the left */}
                <div className="flex-shrink-0">
                    <Link href="/" className="text-2xl font-bold">
                        <Image src={logo} alt="" />
                    </Link>
                </div>

                {/* Navigation Menus in the center */}
                <nav className="space-x-8 text-black">
                    <Link href="/" className="text-lg font-medium px-4 py-2 rounded-lg bg-pb-gray hover:bg-pbr-blue hover:text-white border-solid border-2 border-black">Buy</Link>
                    <Link href="/history" className="text-lg font-medium px-4 py-2 rounded-lg bg-pb-gray hover:bg-pbr-blue hover:text-white border-solid border-2 border-black">History</Link>
                    <Link href="/leaderboard" className="text-lg font-medium px-4 py-2 rounded-lg bg-pb-gray hover:bg-pbr-blue hover:text-white border-solid border-2 border-black">Leaderboard</Link>
                </nav>

                {/* Connect Wallet button on the right */}
                <div>
                    <WalletConnectButton />
                </div>
            </div>
        </header>
    )
}