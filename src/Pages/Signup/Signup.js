import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Logo from '../../trig.PNG';
import './Signup.css';
import { useHistory } from 'react-router-dom';
import * as Yup from 'yup';
import { withFormik, Field } from 'formik';

function Signup(props) {
  const [password, setPassword] = useState('');
  const [email, setEnteredEmail] = useState('');
  const [open, setOpen] = useState(false);
  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);

  const validateConfirmPassword = (pass, value) => {
    let error = '';
    if (pass && value) {
      if (pass !== value) {
        error = 'Password not matched';
      }
    }
    return error;
  };

  const validatePassword = (values) => {
    let error = '';
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;
    if (!values) {
      error = '*Required';
    } else if (values.length < 8) {
      error = '*Password must be 8 characters long.';
    } else if (!passwordRegex.test(values)) {
      error = '*Invalid password.';
    }
    return error;
  };

  const { touched, errors, handleSubmit, setToken } = props;
  return (
    <>
      <div className='Signup'>
        <div className=' TopPage'>
          <img className='LogoS' src={Logo} alt='logo' />
        </div>
        <div className='ModalS'>
          <h2>Sign up with your information</h2>
          <p>
            Password must have Capital Letter, small letter, number , and one of
            those characters(!@#$%^&*)
          </p>
          <br />
          <Form onSubmit={(values) => handleSubmit(values, setToken)}>
            <label style={{ textAlign: 'left' }} className='SignupLabel'>
              {' '}
              Email :
            </label>
            <Field
              style={{ margin: '10px 0px 00px 130px ' }}
              id='email'
              type='text'
              name='email'
              // value={props.values.name}
              placeholder='Email'
              className='InS'
              // value={enteredEmail}
              // onChange={(e) => setEnteredEmail(e.target.value)}
            />
            <br />

            <label
              style={{ textAlign: 'left' }}
              className='SignupLabel'
              htmlFor='firstName'
            >
              First Name:
            </label>
            <Field
              type='text'
              pattern='[^\d]+'
              name='firstName'
              className='InS'
              style={{ margin: '10px 0px 00px 98px ' }}
              id='firstName'
              // value={props.values.name}
            />
            {touched.firstName && errors.firstName && (
              <span className='Message'>{errors.firstName}</span>
            )}
            <br />
            <label
              style={{ textAlign: 'left' }}
              className='SignupLabel'
              htmlFor='lastNmae'
            >
              Last Name:
            </label>
            <Field
              type='text'
              pattern='[^\d]+'
              className='InS'
              name='lastName'
              style={{ margin: '10px 0px 00px 100px ' }}
              id='lastName'
              // value={props.values.name}
            />
            {/* {touched.lastName && errors.lastName && (
              <span className="Message">{errors.lastName}</span>
            )} */}
            <br />

            <label style={{ textAlign: 'left' }} className='SignupLabel'>
              Password:
            </label>

            <Field
              style={{ margin: '10px 0px 10px 109px ' }}
              className='InS'
              type='password'
              name='password'
              validate={validatePassword}
              // value={props.values.name}
            />
            <br />
            <label style={{ textAlign: 'left' }} className='SignupLabel'>
              Confirm Password:
            </label>
            <Field
              style={{ margin: '10px 0px 10px 45px ' }}
              className='InS'
              type='password'
              name='confirmPassword'
              validate={(value) => validateConfirmPassword(password, value)}
            />
            <br />
            {touched.email && errors.email && (
              <span className='Message'>{errors.email}</span>
            )}
            <br />
            {touched.password && errors.password && (
              <span className='Message'>{errors.password}</span>
            )}

            <br />
            {touched.confirmPassword && errors.confirmPassword && (
              <span className='Message'>{errors.confirmPassword}</span>
            )}

            <br />

            <button
              style={{ width: '150px', height: '50px', paddingTop: '0px' }}
              type='submit'
              // disabled={isSubmitting}
              className='buttonSaveModalS'
              // onClick={() => {
              //   setToken(undefined);
              // }}
            >
              Sign up
            </button>
            <button
              style={{
                width: '150px',
                height: '50px',
                paddingTop: '0px',
                marginLeft: '20px',
              }}
              type='submit'
              className='buttonSaveModalS'
              onClick={() => {
                setToken(undefined);
              }}
            >
              Go to Login
            </button>
          </Form>
        </div>
      </div>
    </>
  );
}
const SignupFormik = withFormik({
  mapPropsToValues: (props) => {
    return {
      email: props.email || '',
      password: props.password || '',
      setToken: props.setToken,
    };
  },
  validationSchema: Yup.object().shape({
    email: Yup.string().email('Email not valid').required('Email is required'),
    // firstName: Yup.string().required("First Name is required"),
    // lastName: Yup.string().required("Last Name is required"),
    password: Yup.string()
      .required('Password is required')
      .min(8, 'at least 8 characters')
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
        'Invalid Password'
      ),

    confirmPassword: Yup.string()
      .required()
      .label('Confirm password')
      .test(
        'passwords-match',
        'Passwords must match ya fool',
        function (value) {
          return this.parent.password === value;
        }
      ),
  }),

  handleSubmit: (values, setToken) => {
    console.log(values);
    const REST_API_URL =
      'http://backendowner-env.eba-mhuzfgmk.us-east-2.elasticbeanstalk.com/users/';
    fetch(REST_API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(values),
    })
      .then((response) => {
        if (response.ok) {
          setToken.props.setToken(undefined);
          return response.json();
        } else {
          // HANDLE ERROR
          // console.log(response);
          throw new Error('Something went wrong');
        }
      })
      .then((data) => {
        // HANDLE RESPONSE DATA

        console.log(data);
      })
      .catch((error) => {
        // HANDLE ERROR
        console.log(error);
      });
  },
})(Signup);

export default SignupFormik;
