import React, { createContext, useState, useEffect, useContext } from 'react';
import { ethers } from 'ethers';
import { contractAbi, contractAddress } from '../metamask/ContractInfo';

export const MetaMaskContext = createContext();

export const useMetaMaskContext = () => {
  return useContext(MetaMaskContext);
};

export const MetaMaskProvider = ({ children }) => {
  const [contract, setContract] = useState(null);
  const [account, setAccount] = useState(null);
  const [accounts, setAccounts] = useState([]);
  const [provider, setProvider] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadMetaMaskData() {
      try {
        const provider = new ethers.providers.JsonRpcProvider('http://localhost:8545');
  
        // Check if MetaMask is available
        if (window.ethereum) {
          const accountss = await window.ethereum.request({ method: 'eth_requestAccounts' });
          const accounts = accountss[0];
          const currentAccount = accounts;

          console.log("Login Address:", accounts); // Log the connected account address
          console.log("Wallet Address:", currentAccount); // Log the connected wallet address
  
          setAccount(currentAccount);
          setAccounts(accounts);
  
          // Check if account and wallet address are the same
          if (accounts === currentAccount) {
            console.log("Wallet address and Login address are the same");
          } else {
            console.log("Wallet address and Login address are different");
          }
  
          const signer = provider.getSigner(currentAccount);
  
          const contractInstance = new ethers.Contract(contractAddress, contractAbi, signer);
         
          setProvider(provider);
          setContract(contractInstance);
 
          window.ethereum.on('accountsChanged', (newAccounts) => {
            setAccount(newAccounts[0]);
            setAccounts(newAccounts);
          });
        } else {
          setError('MetaMask not detected');
          console.log('MetaMask not detected');
        }
      } catch (error) {
        setError(error);
        console.error('Error loading MetaMask data:', error);
      } finally {
        setIsLoading(false);
      }
    }
  
    loadMetaMaskData();
  }, []);
  

  return (
    <MetaMaskContext.Provider
      value={{ contract, accounts, account, provider, isLoading, error}}
    >
      {children}
    </MetaMaskContext.Provider>
  );
};