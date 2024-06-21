import React, { createContext, useContext, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import routes from '../routes';

const PageContext = createContext();

export const usePageContext = () => useContext(PageContext);

export const PageProvider = ({ children }) => {
  const location = useLocation();
  const [currentPage, setCurrentPage] = useState({});

  useEffect(() => {
   
    

    const currentRoute = routes.find(
      (route) => route.path == location.pathname
    );
     
    if (currentRoute) {
       
      setCurrentPage({
        name: currentRoute.name,
        role: currentRoute.role || '',
        path: currentRoute.path,
      });
    }
  }, [location]);

  return (
    <PageContext.Provider value={currentPage}>
      {children}
    </PageContext.Provider>
  );
};
