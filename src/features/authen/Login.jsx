import React, { useState } from 'react';
import { Redirect, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchLogin } from './authenSlice';
import {
  Avatar,
  Button,
  TextField,
  FormControlLabel,
  Checkbox,
  Typography,
  CssBaseline,
  CircularProgress,
  Container,
  Grid,
  Box,
} from '@material-ui/core';
import { LockOutlined as LockIcon, ErrorOutlineRounded as ErrorIcon } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';

import Copyright from '../../components/Copyright/Copyright';
import { listRoute } from '../../app/listRoute';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    padding: theme.spacing(1),
  },
  error: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
}));

const Login = (props) => {
  const dispatch = useDispatch();

  const isLoggedIn_gs = useSelector((state) => state.authenSlice.isLoggedIn);
  const isPendingLogin_gs = useSelector((state) => state.authenSlice.isPendingFetchLogin);
  const loginMsg_gs = useSelector((state) => state.authenSlice.fetchLoginMsg);

  const [emailInput_ls, setEmailInput_ls] = useState('');
  const [passwordInput_ls, setPasswordInput_ls] = useState('');

  const classes = useStyles();

  if (isLoggedIn_gs) {
    return <Redirect to={{ pathname: props.location.state?.lastUrl || listRoute.home }} />;
  }

  const handleSubmitForm = (event) => {
    event.preventDefault();
    dispatch(
      fetchLogin({
        email: emailInput_ls,
        password: passwordInput_ls,
      })
    );
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          ĐĂNG NHẬP
        </Typography>
        <form className={classes.form} noValidate onSubmit={handleSubmitForm}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Địa chỉ Email"
            name="email"
            autoComplete="email"
            autoFocus
            value={emailInput_ls}
            onChange={(e) => setEmailInput_ls(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Mật khẩu"
            type="password"
            id="password"
            autoComplete="current-password"
            value={passwordInput_ls}
            onChange={(e) => setPasswordInput_ls(e.target.value)}
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Nhớ mật khẩu"
          />
          {loginMsg_gs && (
            <Grid Container>
              <Grid item>
                <Typography
                  component="span"
                  variant="span"
                  align="center"
                  color="error"
                  className={classes.error}
                >
                  <ErrorIcon />
                  {loginMsg_gs}
                </Typography>
              </Grid>
            </Grid>
          )}

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            {isPendingLogin_gs ? <CircularProgress color="inherit" size={20} /> : 'Đăng nhập'}
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Quên mật khẩu?
              </Link>
            </Grid>
            <Grid item>
              <Link to={{ pathname: listRoute.register }} variant="body2">
                {'Chưa có tài khoản? Đăng ký ngay'}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
};

export default Login;
