import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Address from './pages/Address';
import Landing from './pages/Landing';
import MapPage from './pages/MapPage';

const Routes: React.FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Landing} />
        <Route path="/address" exact component={Address} />
        <Route path="/map" exact component={MapPage} />
      </Switch>
    </BrowserRouter>
  );
}

export default Routes;