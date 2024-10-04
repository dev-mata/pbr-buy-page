import axios from "axios";

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    // 'Authorization': `Basic ${Buffer.from(`${process.env.API_USERNAME}:${process.env.API_PASSWORD}`).toString('base64')}`,
  },
});


// Interceptors can be added here for handling token refresh or logging
apiClient.interceptors.request.use(
  config => {
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);



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

    const response = await apiClient.post('/api/convert-currency', {
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



export const createTonWallet = async (signature, walletAddress, network, metamaskToken) => {
  try {
    const data = {
      signature: signature,
      walletAddress: walletAddress,
      network: network
    };

    const response = await apiClient.post(
      '/api/create-wallet-with-mnemonic',
      data,
      {
        headers: {
          'authorization': `Bearer ${metamaskToken}`,  
          'x-access-token': metamaskToken,
        }
      }
    );
    console.log('Response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error making API call:', error.response ? error.response.data : error.message);
  }
};



export const fetchUserDashboard = async (walletAddress, metamaskToken) => {
  try {
    const response = await apiClient.get(
      `api/userdashboard`, 
      {
        params: { walletAddress }, 
        headers: {
          'Authorization': `Bearer ${metamaskToken}`, 
        },
      }
    );
    
    console.log('Dashboard Data:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching user dashboard:', error.response ? error.response.data : error.message);
  }
};




