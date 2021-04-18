import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Avatar,
  Typography,
  Divider,
  Button,
} from '@material-ui/core';
import {
  Mail as MailIcon,
  ExitToApp as LogInIcon,
  MeetingRoom as LogOutIcon,
  Home as HomeIcon,
} from '@material-ui/icons';

import useCheckLogin from 'src/hooks/useCheckLogIn';
import { logout } from 'src/features/authen/authenSlice';
import { listRoute } from 'src/app/listRoute';

const useStyles = makeStyles((theme) => ({
  list: {
    width: 250,
  },
  userInfo: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatar: {
    width: theme.spacing(8),
    height: theme.spacing(8),
    margin: theme.spacing(2),
  },
  fullList: {
    width: 'auto',
  },
}));

export default function CustomDrawer({ needOpen, setNeedOpen }) {
  const dispatch = useDispatch();

  const classes = useStyles();

  // global state
  const [isLoggedIn_gs, userData_gs] = useCheckLogin();

  const list = () => (
    <div className={classes.list}>
      <List>
        {isLoggedIn_gs && userData_gs ? (
          <React.Fragment>
            <ListItem button>
              <div className={classes.userInfo}>
                <Avatar
                  alt="avatar"
                  src={`https://i.pravatar.cc/150?u=${userData_gs.name}`}
                  className={classes.avatar}
                />
                <Typography variant="h6" color="primary">
                  {userData_gs.name}
                </Typography>
              </div>
            </ListItem>
            <ListItem button onClick={() => dispatch(logout())}>
              <ListItemIcon>
                <LogOutIcon color="secondary" />
              </ListItemIcon>
              <ListItemText primary={'Đăng xuất'} />
            </ListItem>
          </React.Fragment>
        ) : (
          <ListItem button component="a" href={listRoute.login}>
            <ListItemIcon>
              <LogInIcon color="primary" />
            </ListItemIcon>
            <ListItemText primary={'Đăng nhập'} />
          </ListItem>
        )}

        <Divider />

        <ListItem button component="a" href={listRoute.home}>
          <ListItemIcon>
            <HomeIcon color="primary" />
          </ListItemIcon>
          <ListItemText primary={'Trang chủ'} />
        </ListItem>

        <ListItem button component="a" href={listRoute.createExercise}>
          <ListItemIcon>
            <HomeIcon color="primary" />
          </ListItemIcon>
          <ListItemText primary={'Tạo bài tập'} />
        </ListItem>
      </List>
    </div>
  );

  return (
    <div>
      <Drawer anchor={'left'} open={needOpen} onClose={() => setNeedOpen(false)}>
        {list()}
      </Drawer>
    </div>
  );
}
