import { useState, useEffect } from "react";



export const CreatePBRWallet = ({ data, onFinalize }) => {

    const [isConfirmed, setIsConfirmed] = useState(false);
    const [mnemonicArray, setMnemonicArray] = useState(data ? data.split(' ') : []);

    const handleCheckboxChange = () => {
        setIsConfirmed(!isConfirmed);
    };

    const handleCreateWallet = () => {
        if (isConfirmed) {
            if (onFinalize) {
                onFinalize(); 
            }
        } else {
            alert('Please confirm that you have written down the secret phrase.');
        }
    };

    useEffect(() => {
        setMnemonicArray(data ? data.split(' ') : [])
    }, [data]);



    return (
        <div className="fixed h-screen inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
            <div className="text-center">
                return (
                <div className="p-6 bg-white rounded-lg shadow-md w-full max-w-md mx-auto">
                    <p className="text-black mb-4">
                        📋 Write down these words in this exact order. You can use them to access your wallet, make sure you protect them.
                    </p>

                    <div className="grid grid-cols-4 gap-2 text-center mb-6">
                        {mnemonicArray.length > 0 ? (
                            mnemonicArray.map((word, index) => (
                                <div
                                    key={index}
                                    className="border p-2 rounded-md bg-white shadow-sm text-gray-800 text-sm"
                                >
                                    {index + 1}. {word}
                                </div>
                            ))
                        ) : (
                            <div>No mnemonic data available</div> 
                        )}
                    </div>

                    <div className="flex items-center mb-4">
                        <input
                            type="checkbox"
                            id="confirm"
                            checked={isConfirmed}
                            onChange={handleCheckboxChange}
                            className="h-4 w-4 text-pbr-blue border-gray-300 rounded focus:ring-blue-500"
                        />
                        <label htmlFor="confirm" className="ml-2 text-gray-700 text-sm">
                            I confirm I have written down and safely stored my secret phrase.
                        </label>
                    </div>

                    <button
                        onClick={handleCreateWallet}
                        className={`w-full py-2 px-4 rounded-md text-white ${isConfirmed ? 'bg-pbr-blue hover:bg-blue-700' : 'bg-gray-400 cursor-not-allowed'
                            }`}
                        disabled={!isConfirmed}
                    >
                        Create Wallet
                    </button>
                </div>
                );

            </div>
        </div>
    );
}