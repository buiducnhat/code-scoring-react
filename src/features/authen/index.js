import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Login from './Login';
import Register from './Register';
import Copyright from 'src/components/Copyright';
import { listRoute } from 'src/app/listRoute';

const Authen = () => {
  return (
    <React.Fragment>
      <Switch>
        <Route path={listRoute.login} render={(props) => <Login {...props} />} />
        <Route path={listRoute.register} render={(props) => <Register {...props} />} />
      </Switch>
      <Copyright />
    </React.Fragment>
  );
};

export default Authen;
