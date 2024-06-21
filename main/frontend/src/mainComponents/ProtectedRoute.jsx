import React, { useState, useEffect } from 'react';
import { Route, Navigate } from 'react-router-dom';
import { useUserContext } from '../context/UserContext';
import { useMetaMaskContext } from '../context/MetaMaskContext';
import InvalidAddres from './InvalidAddres';

const ProtectedRoute = ({ role, children }) => {
  const { account } = useMetaMaskContext();
  const { login, users } = useUserContext();
  let isValidAddress=false;
 
    const isLoggedIn = (role) => {
      const currentUser = users.find((user) => user.role === role);

      if (currentUser && currentUser.isLoggedIn && currentUser.userData && currentUser.userData.address === account) {
      isValidAddress=true;
        return true; // User is already logged in
      } else if (currentUser && currentUser.isLoggedIn && currentUser.userData) {
      isValidAddress=false;
        return true;
      }

      const cachedData = localStorage.getItem(role);
      const data = cachedData ? JSON.parse(cachedData) : false;

      if (data) {
        login(role, { email: data.email, password: data.password, address: data.address });
        if (data.address == account) {
        isValidAddress=true;
        } else {
        isValidAddress=false;
        }
        return true;
      }

      return false;
    };


  if (!isLoggedIn(role)) {
    return  <Navigate to="/AuthPage/login" />; // Redirect to login if not authenticated
  } else if (!isValidAddress) {
    return <Navigate to="/AuthPage/signup" />;
  } else {
    return children; // Render children if the user is authenticated and has a valid address
  }
};

export default ProtectedRoute;
