import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Login from './Login';
import Register from './Register';
import { listRoute } from '../../app/listRoute';

const Authen = () => {
  return (
    <Switch>
      <Route path={listRoute.login} render={(props) => <Login {...props} />} />
      <Route path={listRoute.register} render={(props) => <Register {...props} />} />
    </Switch>
  );
};

export default Authen;
