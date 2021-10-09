import React from 'react';

export interface SideTabContextInterface {
  isTabOpenned: boolean;
  setIsTabOpenned: React.Dispatch<any>;
  tabOpenned: string;
  setTabOpenned: React.Dispatch<any>;
}
