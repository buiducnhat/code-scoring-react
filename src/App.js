import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Switch } from 'react-router-dom';

import Login from 'src/features/authen/views/Login';
import Register from 'src/features/authen/views/Register';
import ListExercise from 'src/features/exercise/views/ListExercise';
import ExerciseDetail from 'src/features/exercise/views/ExerciseDetail';
import Header from 'src/components/Header';
import Copyright from 'src/components/Copyright';
import { listRoute } from 'src/app/listRoute';
import { fetchGetUserData } from 'src/features/authen/authenSlice';
import './App.scss';

const App = () => {
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(fetchGetUserData());
  }, [dispatch]);

  return (
    <React.Fragment>
      <Header />
      <Switch>
        <Route exact path={listRoute.home} render={(props) => <ListExercise {...props} />} />
        <Route path={listRoute.login} render={(props) => <Login {...props} />} />
        <Route path={listRoute.register} render={(props) => <Register {...props} />} />
        <Route path={listRoute.exerciseDetail} render={(props) => <ExerciseDetail {...props} />} />
        <Route path={listRoute.exerciseEndpoint} render={(props) => <ListExercise {...props} />} />
      </Switch>
      <Copyright />
    </React.Fragment>
  );
};

export default App;
