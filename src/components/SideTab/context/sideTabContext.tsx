import React, {useState} from 'react';

import {createContext} from 'use-context-selector';

import {SideTabContextInterface} from './types';

export const SideTabContext = createContext({} as SideTabContextInterface);

const SideTabContextProvider: React.FC = ({children}) => {
  const [isTabOpenned, setIsTabOpenned] = useState(false);
  const [tabOpenned, setTabOpenned] = useState('');

  return (
    <SideTabContext.Provider
      value={{
        isTabOpenned,
        setIsTabOpenned,
        tabOpenned,
        setTabOpenned,
      }}>
      {children}
    </SideTabContext.Provider>
  );
};

export default SideTabContextProvider;
