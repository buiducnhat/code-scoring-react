import React from 'react';
import { useHistory } from 'react-router-dom';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@material-ui/core';

import { listRoute } from 'src/app/listRoute';

export default function DialogToLogin({ needOpen, setNeedOpen, lastUrl }) {
  const navigation = useHistory();

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
          <Button color="primary" onClick={() => navigation.push(listRoute.login, { lastUrl })}>
            Đăng nhập ngay
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
