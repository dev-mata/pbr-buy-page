import axios from "axios";

const apiClient = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});


// Interceptors can be added here for handling token refresh or logging
apiClient.interceptors.request.use(
    config => {
        // Modify request here (e.g., add auth token)
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);


// Function to call the /authenticateMetaMask API
export const authenticateMetaMask = async (walletAddress, signature) => {
    try {
        const response = await apiClient.post('/api/authenticateMetaMask', {
            walletAddress,
            signature,
        });
        return response.data;
    } catch (error) {
        console.error('Error authenticating MetaMask:', error);
        throw error;
    }
};


export const convertPbrPurchase = async (phase, currency, amount) => {
    try {
      const response =  await apiClient.post('/api/convert', {
        phase: phase,
        currency: currency,
        amount: amount,
      });
      return response.data;
    } catch (error) {
      console.error('Error converting PBR:', error);
      throw error;
    }
  };

  export const getChainMasterWallet = async (activeNetwork) => { 
    try {
        const response = await apiClient.get(`/apinet/convert/${activeNetwork}`);
      return response.data;
    } catch (error) {
      console.error('Error converting abc:', error); 
      throw error;
    }
  };


 