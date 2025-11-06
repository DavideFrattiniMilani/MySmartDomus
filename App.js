import React from 'react';
import AppNavigator from './src/navigation/AppNavigator';
import { DrawerProvider } from './src/context/DrawerContext';
import { ScenariProvider } from './src/context/ScenariContext';

export default function App() {
  return  (
<DrawerProvider>
<ScenariProvider>
<AppNavigator />
</ScenariProvider>
</DrawerProvider>
);
}
