import React, { useState } from 'react';
import 'react-responsive-modal/styles.css';
import Logo from '../../trig.PNG';
import './Login.css';
import { FormGroup, Wrapper, Formbody, Button } from './LoginStyle';
import { useHistory } from 'react-router-dom';
import * as Yup from 'yup';
import { withFormik, Form, Field } from 'formik';
import { Link } from 'react-router-dom';
import { Grid } from '@material-ui/core';
const Login = (props) => {
  const [open, setOpen] = useState(false);

  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);

  const { touched, errors, handleSubmit, setToken } = props;
  return (
    <React.Fragment>
      <img className='Logo' src={Logo} alt='logo' />
      <h1 style={{ color: ' #3EA83E', paddingTop: '1px' }}>Data Mobilizer</h1>

      <Formbody className='Login'>
        <Link className='SignupLink' to='/Signup'>
          <button className='SignupBTN' onClick={() => setToken('sign')}>
            Sign Up
          </button>
        </Link>
        <Form onSubmit={(values) => handleSubmit(values, setToken)}>
          <FormGroup controlId='email'>
            <label className='Loginlabel' htmlFor='email'>
              Email
            </label>
            <Field
              type='text'
              name='email'
              placeholder='Email'
              className='FieldStyle'
            />
            <br />
            {touched.email && errors.email && (
              <span className='Message'>{errors.email}</span>
            )}
          </FormGroup>
          <FormGroup controlId='password'>
            <label className='Loginlabel' htmlFor='password'>
              Password
            </label>
            <Field
              type='password'
              name='password'
              placeholder='Password'
              className='FieldStyle'
            />
            <br />
            {touched.password && errors.password && (
              <span className='Message'>{errors.password}</span>
            )}
          </FormGroup>
          <Wrapper>
            <Grid container direction='row' justify='center'>
              <Button type='submit'>Login</Button>
            </Grid>
          </Wrapper>
        </Form>
      </Formbody>
    </React.Fragment>
  );
};

const LoginFormik = withFormik({
  mapPropsToValues: (props) => {
    return {
      email: props.email || '',
      password: props.password || '',
      setToken: props.setToken,
      //  history: props.history,
    };
  },

  validationSchema: Yup.object().shape({
    email: Yup.string().email('Email not valid').required('Email is required'),
    password: Yup.string()
      .required('Password is required')
      .min(8, 'at least 8 characters')
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
        'Invalid Password'
      ),
  }),

  handleSubmit: (values, setToken) => {
    // const { history } = this.props; when added it breaks the code with no error

    const REST_API_URL =
      'http://backendowner-env.eba-mhuzfgmk.us-east-2.elasticbeanstalk.com/users/';
    fetch(REST_API_URL + 'email=' + values.email, {
      method: 'GET',
    })
      .then((response) => {
        if (response.ok) {
          return response.json();

          if (response.status !== 200) {
            values({ error: response.json().error });
          }
        } else {
          // HANDLE ERROR
          throw new Error('Something went wrong');
        }
      })
      .then((items) => {
        if (items.password == values.password) {
          if (items.admin == true && items.active == true) {
            localStorage.setItem('adminId', items.id);
            localStorage.setItem('userLoggedIn', items.id);
            localStorage.setItem('userEmail', items.email);
            localStorage.setItem('isAdmin', items.admin);
            setToken.props.setToken(true);
            localStorage.setItem('token', true);
          } else if (items.admin == true && items.active == false) {
            setToken.props.setToken(undefined);
            alert('User Not Active ');
          } else if (items.admin == false && items.active == true) {
            localStorage.setItem('isAdmin', false);
            localStorage.setItem('userLoggedIn', items.id);
            localStorage.setItem('userEmail', items.email);
            setToken.props.setToken(false);
            localStorage.setItem('token', false);
          } else {
            setToken.props.setToken(undefined);
            alert('Not an Active User ');
          }
        } else {
          setToken.props.setToken(undefined);
        }
      })
      .catch((error) => {
        // HANDLE ERROR
        console.log(error);
      });
  },
})(Login);
export default LoginFormik;
// Login.propTypes = {
//   setToken: PropTypes.func.isRequired,
// };
