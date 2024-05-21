// src/DataContext.js
import React, { createContext, useState, useEffect, useContext } from 'react';
import { usersCatApiInstance } from '../helper/axiosInstances';

const UsersFactsContext = createContext();

const UsersFactsProvider = ({ children }) => {
  const [usersCatFacts, setUsersCatFacts] = useState([]);

  const [isLoadingUsersFacts, setIsLoadingUsersFacts] = useState(false);
  const [isErrorFetchingUsersCatFacts, setIsErrorFetchingUsersCatFacts] =
    useState(false);

  useEffect(() => {
    const fetchUsersCatFacts = async () => {
      setIsErrorFetchingUsersCatFacts(false);
      setIsLoadingUsersFacts(true);
      try {
        const response = await usersCatApiInstance.get('/facts');

        setUsersCatFacts(response.data);
        // Simulate a delay of 0.6 seconds
        setIsLoadingUsersFacts(true);

        const loadingTimer = setTimeout(() => {
          setIsLoadingUsersFacts(false);
        }, 600);

        return () => clearTimeout(loadingTimer);
      } catch (error) {
        setIsErrorFetchingUsersCatFacts(true);
        console.error('Error fetching data:', error);
      }

      setIsLoadingUsersFacts(false);
    };

    fetchUsersCatFacts();
  }, []);

  return (
    <UsersFactsContext.Provider
      value={{
        setUsersCatFacts,
        usersCatFacts,
        isLoadingUsersFacts,
        isErrorFetchingUsersCatFacts,
      }}
    >
      {children}
    </UsersFactsContext.Provider>
  );
};

export default UsersFactsProvider;

export const useUsersFacts = () => {
  return useContext(UsersFactsContext);
};
