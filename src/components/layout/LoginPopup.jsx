import * as React from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useFormik } from 'formik';

export default function LoginPopup({ open, onClose, onLogin, handleSignUp }) {
  // TODO: validations
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      error: '',
    },
    onSubmit: async (values) => {
      formik.setFieldValue('error', '');
      try {
        const res = await onLogin({
          email: values.email,
          password: values.password,
        });
        console.log('res:	', res);
        if (res?.status === 200) {
          handleClose();
          return;
        }
        formik.setFieldValue(
          'error',
          res.data.errorMessage || 'Something went wrong'
        );
      } catch (error) {
        formik.setFieldValue(
          'error',
          error?.response?.data?.errorMessage || 'Something went wrong'
        );
      }
    },
  });

  const handleClose = () => {
    formik.resetForm();
    onClose();
  };
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Login</DialogTitle>
      <DialogContent>
        <form>
          <TextField
            autoFocus
            margin='dense'
            id='email'
            label='Email Address'
            type='email'
            onChange={formik.handleChange}
            value={formik.values.email}
            fullWidth
            variant='outlined'
          />
          <TextField
            autoFocus
            margin='dense'
            id='password'
            label='Password'
            type='password'
            onChange={formik.handleChange}
            value={formik.values.password}
            fullWidth
            variant='outlined'
          />
          <Typography color='error'>{formik.values.error}</Typography>
        </form>
        <Box>
          Not Signed Up? <Button onClick={handleSignUp}>Sign Up here</Button>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button color='error' onClick={handleClose}>
          Cancel
        </Button>
        <Button onClick={formik.handleSubmit}>Login</Button>
      </DialogActions>
    </Dialog>
  );
}
