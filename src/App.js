import 'bulma/css/bulma.css';
import React from 'react';
import { AppContextProvider } from './context';
import ConversionForm from './components/ConversionForm';
import Content from './components/Content';
import './App.css';

const App = () => (
  <AppContextProvider>
    <div className="app">
      <ConversionForm />
      <Content />
    </div>
  </AppContextProvider>
);

export default App;
