import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

export default function LoginPopup({ open, handleClose, handleLogin }) {
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Login</DialogTitle>
      <DialogContent>
        You have successfully signed up. Please login to continue.
      </DialogContent>
      <DialogActions>
        <Button color='error' onClick={handleClose}>
          Cancel
        </Button>
        <Button onClick={handleLogin}>Go To Login</Button>
      </DialogActions>
    </Dialog>
  );
}
