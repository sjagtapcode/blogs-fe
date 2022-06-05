import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useFormik } from 'formik';
import axiosInstance from '../../services/axiosInstance';
import { Typography } from '@mui/material';

export default function SignUpPopup({ open, onClose, handleSignedUp }) {
  // TODO: validations
  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      error: '',
    },
    onSubmit: (values) => {
      if (values.confirmPassword !== values.password) {
        formik.setFieldError('confirmPassword', 'Passwords do not match');
        return;
      }
      handleSignUp(values);
    },
  });
  const handleClose = () => {
    formik.resetForm();
    onClose();
  };
  const handleSignUp = async (values) => {
    formik.setFieldValue('error', '');
    try {
      const res = await axiosInstance.post('/users', {
        name: values.name,
        email: values.email,
        password: values.password,
      });
      if (res?.status === 200) {
        formik.resetForm();
        handleSignedUp();
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
  };
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Sign Up</DialogTitle>
      <DialogContent>
        <form>
          <TextField
            autoFocus
            margin='dense'
            id='name'
            label='Name'
            type='text'
            onChange={formik.handleChange}
            value={formik.values.name}
            fullWidth
            variant='outlined'
          />
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
            label='password'
            type='password'
            onChange={formik.handleChange}
            value={formik.values.password}
            fullWidth
            variant='outlined'
          />
          <TextField
            autoFocus
            margin='dense'
            id='confirmPassword'
            label='Confirm Password'
            type='password'
            onChange={formik.handleChange}
            value={formik.values.confirmPassword}
            fullWidth
            variant='outlined'
          />
          <Typography color='error'>{formik.values.error}</Typography>
        </form>
      </DialogContent>
      <DialogActions>
        <Button color='error' onClick={handleClose}>
          Cancel
        </Button>
        <Button onClick={formik.handleSubmit}>SignUp</Button>
      </DialogActions>
    </Dialog>
  );
}
