import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Header, Theme } from './ui';
import Home from './Home';

function App() {
  return (
    <Theme>
      <BrowserRouter>
        <Header />
        <Home />
      </BrowserRouter>
    </Theme>
  );
}

export default App;
