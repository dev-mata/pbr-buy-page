
export default function Transactions({ userDashboardData }) {


    return (
        <section className="py-1 font-londrina">
            <div className="w-full xl:w-8/12 mb-12 xl:mb-0 px-4 mx-auto mt-24">
                <div className="relative flex flex-col min-w-0 break-words bg-pbr-yellow-light w-full mb-6 shadow-lg border-solid border-2 border-black rounded-2xl ">
                    <div className="rounded-t mb-0 px-4 py-3 border-0">
                        <div className="flex flex-wrap items-center">
                            <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                                <h3 className="font-semibold text-base text-xl text-black">PBR Transaction History</h3>
                            </div>
                            <div className="relative w-full px-4 max-w-full flex-grow flex-1 text-right">
                                <button className="bg-pbr-blue text-white active:bg-indigo-600 text-md font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button">Open Explorer</button>
                            </div>
                        </div>
                    </div>

                    <div className="block w-full overflow-x-auto text-black">
                        <table className="items-center bg-transparent w-full border-collapse ">
                            <thead>
                                <tr>
                                    <th className="px-6 bg-blueGray-50 text-black align-middle border border-solid border-blueGray-100 py-3 text-md uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                        Date
                                    </th>
                                    <th className="px-6 bg-blueGray-50 text-black align-middle border border-solid border-blueGray-100 py-3 text-md uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                        Token Used
                                    </th>

                                    <th className="px-6 bg-blueGray-50 text-black align-middle border border-solid border-blueGray-100 py-3 text-md uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                        Amount
                                    </th>

                                  

                                    <th className="px-6 bg-blueGray-50 text-black align-middle border border-solid border-blueGray-100 py-3 text-md uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                        TxID
                                    </th>

                                    <th className="px-6 bg-blueGray-50 text-black align-middle border border-solid border-blueGray-100 py-3 text-md uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                        PBR Tokens
                                    </th>


                                </tr>
                            </thead>

                            <tbody>
                                {userDashboardData?.transactions?.map((transaction) => (
                                    <tr key={transaction._id}>
                                        <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-md whitespace-nowrap p-4 text-left text-blueGray-700 ">
                                            {transaction.timestamp}
                                        </th>
                                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-md whitespace-nowrap p-4 ">
                                            {transaction.tokenSymbol}
                                        </td>
                                        <td className="border-t-0 px-6 align-center border-l-0 border-r-0 text-md whitespace-nowrap p-4">
                                           {transaction.value}
                                        </td>
                                    
                                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-md whitespace-nowrap p-4">
                                            <i className="fas fa-arrow-up text-emerald-500 mr-4"></i>
                                           {transaction.txHash.slice(0,12)}...{transaction.txHash.slice(-4)}
                                        </td>

                                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-md whitespace-nowrap p-4">
                                            <i className="fas fa-arrow-up text-emerald-500 mr-4"></i>
                                           -
                                        </td>
                                    </tr>
                                ))}


                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <footer className="relative pt-8 pb-6 mt-16">
                <div className="container mx-auto px-4">
                    <div className="flex flex-wrap items-center md:justify-between justify-center">
                        <div className="w-full md:w-6/12 px-4 mx-auto text-center">
                            <div className="text-md text-black font-semibold py-1">
                                These are all your PBR Purchase..
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </section>
    )
}