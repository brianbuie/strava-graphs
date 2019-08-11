import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Menu, Theme } from './ui';
import { StravaProvider } from './StravaContext';

function App() {
  return (
    <Theme>
      <BrowserRouter>
        <StravaProvider>
          <Menu />
        </StravaProvider>
      </BrowserRouter>
    </Theme>
  );
}

export default App;
