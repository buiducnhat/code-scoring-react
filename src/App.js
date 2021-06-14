import React from 'react';
import { ThemeProvider } from '@material-ui/styles';
import * as colors from '@material-ui/core/colors';
import { createMuiTheme, CssBaseline } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Switch } from 'react-router-dom';

import LoadingScreen from 'src/components/LoadingScreen';
import Login from 'src/features/authen/views/Login';
import Register from 'src/features/authen/views/Register';
import ListExercise from 'src/features/exercise/views/ListExercise';
import ExerciseDetail from 'src/features/exercise/views/ExerciseDetail';
import EditExercise from 'src/features/exercise/views/EditExercise';
import Header from 'src/components/Header';
import Copyright from 'src/components/Copyright';
import PageNotFound from 'src/components/PageNotFound';
import { listRoute } from 'src/app/listRoute';
import { fetchGetUserData } from 'src/features/authen/authenSlice';

const App = () => {
  const dispatch = useDispatch();

  // global states
  const theme_gs = useSelector((state) => state.uiSlice.theme);

  const theme = React.useMemo(
    () =>
      createMuiTheme({
        palette: {
          type: theme_gs.type,
          primary: {
            main: colors.blue[500],
          },
          secondary: {
            main: colors.deepOrange[500],
          },
        },
      }),
    [theme_gs]
  );

  React.useEffect(() => {
    dispatch(fetchGetUserData());
  }, [dispatch]);

  return !theme_gs ? (
    <LoadingScreen />
  ) : (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header />
      <Switch>
        <Route exact path={listRoute.home} render={(props) => <ListExercise {...props} />} />
        <Route path={listRoute.login} render={(props) => <Login {...props} />} />
        <Route path={listRoute.register} render={(props) => <Register {...props} />} />
        <Route path={listRoute.createExercise} render={(props) => <EditExercise {...props} />} />
        <Route path={listRoute.updateExercise} render={(props) => <EditExercise {...props} />} />
        <Route path={listRoute.exerciseDetail} render={(props) => <ExerciseDetail {...props} />} />
        <Route path={listRoute.exerciseEndpoint} render={(props) => <ListExercise {...props} />} />
        <Route path="*" component={PageNotFound} />
      </Switch>
      <Copyright />
    </ThemeProvider>
  );
};

export default App;
