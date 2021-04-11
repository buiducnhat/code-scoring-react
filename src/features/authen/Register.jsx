import React, { useState } from 'react';
import { Redirect, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRegister } from './authenSlice';
import {
  Avatar,
  Button,
  TextField,
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
  const isPendingRegister_gs = useSelector((state) => state.authenSlice.isPendingFetchRegister);
  const registerMsg_gs = useSelector((state) => state.authenSlice.fetchRegisterMsg);

  const [emailInput_ls, setEmailInput_ls] = useState('');
  const [nameInput_ls, setNameInput_ls] = useState('');
  const [passwordInput_ls, setPasswordInput_ls] = useState('');

  const classes = useStyles();

  if (isLoggedIn_gs) {
    return <Redirect to={{ pathname: props.location.state?.lastUrl || listRoute.home }} />;
  }

  const handleSubmitForm = (event) => {
    event.preventDefault();
    dispatch(
      fetchRegister({
        email: emailInput_ls,
        name: nameInput_ls,
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
          ĐĂNG KÝ
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
            id="name"
            label="Họ tên"
            name="name"
            autoComplete="name"
            value={nameInput_ls}
            onChange={(e) => setNameInput_ls(e.target.value)}
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
          {registerMsg_gs && (
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
                  {registerMsg_gs}
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
            {isPendingRegister_gs ? <CircularProgress color="inherit" size={20} /> : 'Đăng ký'}
          </Button>
          <Grid container>
            <Grid item>
              <Link to={{ pathname: listRoute.login }} variant="body2">
                {'Đã có tài khoản? Đăng nhập ngay'}
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
