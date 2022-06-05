import axios from './services/axiosInstance';
import { useFormik } from 'formik';

function App() {
  // TODO: validations
  // TODO: show and hide password
  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    onSubmit: (values) => {
      if (values.confirmPassword !== values.password) {
        formik.setFieldError('confirmPassword', 'Passwords do not match');
        return;
      }
      handleSignUp(values);
    },
  });

  const handleSignUp = (values) => {
    axios.post('/users', {
      name: values.name,
      email: values.email,
      password: values.password,
    });
  };
  return (
    <form onSubmit={formik.handleSubmit}>
      <h3>
        {' '}
        {/* Sign Up form */}
        SIGN UP FORM
      </h3>
      <br />

      <label htmlFor='name'>Name</label>
      <input
        id='name'
        name='name'
        type='name'
        onChange={formik.handleChange}
        value={formik.values.name}
      />
      <br />

      <label htmlFor='email'>Email Address</label>
      <input
        id='email'
        name='email'
        type='email'
        onChange={formik.handleChange}
        value={formik.values.email}
      />
      <br />

      <label htmlFor='password'>Password</label>
      <input
        id='password'
        name='password'
        type='text'
        onChange={formik.handleChange}
        value={formik.values.password}
      />
      <br />

      <label htmlFor='confirmPassword'>Confirm Password</label>
      <input
        id='confirmPassword'
        name='confirmPassword'
        type='password'
        onChange={formik.handleChange}
        value={formik.values.confirmPassword}
      />
      <br />
      <button type='submit'>Sign Up</button>
      <br />
    </form>
  );
}

export default App;
