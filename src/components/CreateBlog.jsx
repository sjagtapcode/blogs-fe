import React, { useCallback } from 'react';
// import { useHistory } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import { useFormik } from 'formik';

import axiosInstance from '../services/axiosInstance';
import { TextField, Typography } from '@mui/material';
import { Editor, EditorState } from 'draft-js';
import 'draft-js/dist/Draft.css';

import { useAuth } from '../contexts/auth';

// TODO: validations
const CreateBlog = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const formik = useFormik({
    initialValues: {
      title: '',
      description: () => EditorState.createEmpty(),
      error: '',
    },
    onSubmit: async (values) => {
      handleSubmit(values);
    },
  });
  const handleSubmit = useCallback(
    async (values) => {
      if (values.confirmPassword !== values.password) {
        formik.setFieldError('confirmPassword', 'Passwords do not match');
        return;
      }
      try {
        const res = await axiosInstance.post(
          '/blogs',
          {
            title: values?.title,
            description: values?.description,
          },
          {
            headers: {
              authorization: `Bearer ${user?.accessToken}`,
            },
          }
        );
        if (res?.status === 200) {
          alert('Blog created successfully and saved to drafts');
          navigate('/profile');
          return;
        }
      } catch (error) {
        formik.setFieldValue(
          'error',
          error?.errorMessage || 'Error creating blog'
        );
      }
    },
    [formik.values, formik, user?.accessToken, navigate]
  );

  if (!isAuthenticated) return 'Only logged in users can create blogs';

  return (
    <Container>
      <h2>CreateBlog</h2>
      <form onSubmit={formik.handleSubmit}>
        <TextField
          autoFocus
          margin='dense'
          id='title'
          label='title'
          type='text'
          onChange={formik.handleChange}
          value={formik.values.title}
          fullWidth
          variant='outlined'
        />
        <TextField
          autoFocus
          margin='dense'
          id='description'
          label='description'
          value={formik.values.description}
          // type='multiline'
          onChange={formik.handleChange}
          fullWidth
          multiline
          rows={20}
          variant='outlined'
        />
        {/* <Editor
          id='description'
          editorState={formik.values.description}
          onChange={formik.handleChange}
        /> */}
        <Typography color='error'>{formik?.values?.error}</Typography>
        <Button
          variant='contained'
          sx={{ margin: 2 }}
          color='error'
          onClick={formik.resetForm}
        >
          Clear
        </Button>
        <Button variant='contained' type='submit'>
          Create Blog
        </Button>
      </form>
    </Container>
  );
};

export default CreateBlog;
