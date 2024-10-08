export const TransactionPendingOverlay = ({message}) => {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50">
        <div className="text-center">
          {/* Spinner */}
          <svg
            className="animate-spin h-12 w-12 text-white mx-auto"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
            ></path>
          </svg>
          
          {/* Loading text */}
          <p className="mt-4 text-white text-lg">{message}</p>
        </div>
      </div>
    );
};


