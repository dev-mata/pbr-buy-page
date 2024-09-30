export const TransactionPendingOverlay = () => {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
            <div className="text-center">
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-white border-opacity-50 mb-4"></div>
                <p className="text-white text-lg">Transaction is pending. Please wait...</p>
            </div>
        </div>
    );
};


