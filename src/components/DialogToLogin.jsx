import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Redirect } from 'react-router-dom';

import { listRoute } from 'src/app/listRoute';

export default function DialogToLogin({ needOpen, setNeedOpen }) {
  const [needRedirect_ls, setNeedRedirect_ls] = useState(false);

  const handleClose = () => {
    setNeedOpen(false);
  };

  return needRedirect_ls ? (
    <Redirect to={{ pathname: listRoute.login }} />
  ) : (
    <div>
      <Dialog open={needOpen} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Chưa đăng nhập</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Để thực hiện hành động này, bạn cần đăng nhập để tiếp tục
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Hủy
          </Button>
          <Button onClick={() => setNeedRedirect_ls(true)} color="primary">
            Đăng nhập ngay
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
