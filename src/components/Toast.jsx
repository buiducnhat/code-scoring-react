import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';

import { setToast } from 'src/features/ui/uiSlice';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

export default function Toast() {
  const dispatch = useDispatch();

  const classes = useStyles();

  // global state
  const toast_gs = useSelector((state) => state.uiSlice.toast);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    dispatch(setToast({ ...toast_gs, open: false }));
  };

  return (
    <div className={classes.root}>
      <Snackbar
        anchorOrigin={{
          vertical: toast_gs.position.vertical || 'top',
          horizontal: toast_gs.position.horizontal || 'right',
        }}
        open={toast_gs.open}
        autoHideDuration={2000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity={toast_gs.type}>
          {toast_gs.content}
        </Alert>
      </Snackbar>
    </div>
  );
}
