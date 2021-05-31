import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
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
  FormControlLabel,
  Switch,
  useTheme,
} from '@material-ui/core';
import {
  ExitToApp as LogInIcon,
  MeetingRoom as LogOutIcon,
  Home as HomeIcon,
  Create as CreateIcon,
} from '@material-ui/icons';

import useCheckLogin from 'src/hooks/useCheckLogIn';
import { setTheme } from 'src/features/ui/uiSlice';
import { logout } from 'src/features/authen/authenSlice';
import { listRoute } from 'src/app/listRoute';
import { EDIT_EXERCISE_ACTION, APP_THEME } from 'src/app/constants';

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
  link: {
    color: theme.palette.text.primary,
  },
}));

export default function CustomDrawer({ needOpen, setNeedOpen }) {
  const theme = useTheme();

  const dispatch = useDispatch();

  const classes = useStyles();

  // global state
  const theme_gs = useSelector((state) => state.uiSlice.theme);
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
            <Link to={{ pathname: listRoute.login }} className={classes.link}>
              <ListItem
                button
                onClick={() => {
                  dispatch(logout());
                  setNeedOpen(false);
                }}
              >
                <ListItemIcon>
                  <LogOutIcon color="secondary" />
                </ListItemIcon>
                <ListItemText primary={'Đăng xuất'} />
              </ListItem>
            </Link>
          </React.Fragment>
        ) : (
          <Link to={{ pathname: listRoute.login }} className={classes.link}>
            <ListItem button>
              <ListItemIcon>
                <LogInIcon color="primary" />
              </ListItemIcon>
              <ListItemText primary={'Đăng nhập'} />
            </ListItem>
          </Link>
        )}

        <Divider />

        <Link to={{ pathname: listRoute.home }} className={classes.link}>
          <ListItem button>
            <ListItemIcon>
              <HomeIcon color="primary" />
            </ListItemIcon>
            <ListItemText primary={'Trang chủ'} />
          </ListItem>
        </Link>

        {
          <Link
            to={{
              pathname: listRoute.createExercise,
              state: { action: EDIT_EXERCISE_ACTION.create },
            }}
            className={classes.link}
          >
            <ListItem button>
              <ListItemIcon>
                <CreateIcon color="primary" />
              </ListItemIcon>
              <ListItemText primary={'Tạo bài tập'} />
            </ListItem>
          </Link>
        }

        <ListItem>
          <FormControlLabel
            control={
              <Switch
                color="primary"
                checked={theme_gs.type === APP_THEME.dark}
                onChange={() =>
                  dispatch(
                    setTheme({
                      type: theme_gs.type === APP_THEME.light ? APP_THEME.dark : APP_THEME.light,
                    })
                  )
                }
              />
            }
            label="Giao diện tối"
          />
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
