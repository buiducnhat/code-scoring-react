import React, { useState } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@material-ui/core';
import { useHistory } from 'react-router-dom';

import { listRoute } from 'src/app/listRoute';

export default function DialogToLogin({ needOpen, setNeedOpen, lastUrl }) {
  const routerHistory = useHistory();

  const handleClose = () => {
    setNeedOpen(false);
  };

  return (
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
          <Button
            onClick={() => routerHistory.push(`${listRoute.login}`, { lastUrl })}
            color="primary"
          >
            Đăng nhập ngay
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
