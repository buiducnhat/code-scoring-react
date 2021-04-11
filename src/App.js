import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Authen from './features/authen';
import {listRoute} from './app/listRoute';
import './App.scss';

const App = () => {
  return (
    <Switch>
      <Route path={listRoute.home} render={(props) => <Authen {...props} />} />
    </Switch>
  );
};

export default App;
