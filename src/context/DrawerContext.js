// src/context/DrawerContext.js

import React, { createContext, useContext, useState } from 'react';

const DrawerContext = createContext();

export const DrawerProvider = ({ children }) => {
  const [drawerVisible, setDrawerVisible] = useState(false);

const openDrawer = () => {
  console.log('🚪 openDrawer chiamato! drawerVisible:', drawerVisible);
  setDrawerVisible(true);
  console.log('🚪 drawerVisible dopo set:', true);
  };

  const closeDrawer = () => {
    setDrawerVisible(false);
  };

  return (
    <DrawerContext.Provider value={{ drawerVisible, openDrawer, closeDrawer }}>
      {children}
    </DrawerContext.Provider>
  );
};

export const useDrawer = () => {
  const context = useContext(DrawerContext);
  if (!context) {
    throw new Error('useDrawer must be used within a DrawerProvider');
  }
  return context;
};