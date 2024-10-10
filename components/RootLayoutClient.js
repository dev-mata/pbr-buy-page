'use client'
import { useEffect, useState } from 'react';
import Web3ModalProvider from '../lib/wagmi-provider';
import Header from "../components/Header";
import Home from '../app/page';
import { getCookie } from "cookies-next";
import { fetchUserDashboard } from '../lib/api';

export default function RootLayoutClient({ children, initialState }) {

  const [isTransactionOpen, setIsTransactionOpen] = useState(false);
  const [userDashboardData, setUserDashboardData] = useState(null);
  const [authToken, setAuthToken] = useState(null);

  const fetchAuthToken = () => {
    const token = getCookie('authToken');
    setAuthToken(token);
  };

  // Fetch the token when component mounts
  useEffect(() => {
    fetchAuthToken();
  }, []);

  // Handle the event when the cookie changes
  useEffect(() => {
    const handleCookieChange = () => {
      fetchAuthToken();
    };

    window.addEventListener('cookieChange', handleCookieChange);

    return () => {
      window.removeEventListener('cookieChange', handleCookieChange);
    };
  }, []);

  const fetchUserDashboardData = () => {
    if (authToken) {
      fetchUserDashboard(authToken)
        .then((data) => {
          const fetchTonWalletAddress = data.data;
          setUserDashboardData(fetchTonWalletAddress);
        })
        .catch((error) => {
          console.error('Error fetching dashboard data', error);
        });
    }
  }

  useEffect(() => {
    fetchUserDashboardData()
  }, [authToken, setUserDashboardData]);

  return (
    <Web3ModalProvider initialState={initialState}>
      <Header setIsTransactionOpen={setIsTransactionOpen} userDashboardData={userDashboardData} refreshDashboardData={fetchUserDashboardData} />
      <Home isTransactionOpen={isTransactionOpen} userDashboardData={userDashboardData} />
    </Web3ModalProvider>
  );
}
