import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Theme } from './ui';
import { AuthProvider, SaveAuth } from './Auth';
import Home from './Home';

function App() {
  return (
    <Theme>
      <BrowserRouter>
        <Switch>
          <Route exact path="/auth">
            {props => <SaveAuth {...props} />}
          </Route>
          <Route>
            {() => (
              <AuthProvider>
                <Home />
              </AuthProvider>
            )}
          </Route>
        </Switch>
      </BrowserRouter>
    </Theme>
  );
}

export default App;
