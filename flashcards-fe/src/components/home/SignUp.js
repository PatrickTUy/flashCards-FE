import React, { useState, useEffect } from 'react';
import {
  Button,
  Container,
  FormControl,
  Paper,
  Typography,
  Snackbar,
} from '@mui/material';
import Box from '@mui/material/Box';
import { makeStyles } from '@mui/styles';
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator';
import LoadingButton from '@mui/lab/LoadingButton';
import Link from '@mui/material/Link';
import { useQuery, gql, useMutation } from '@apollo/client';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';

import background from '../../Assets/Images/loginBG.jpg';

const useStyles = makeStyles({
  home: {
    backgroundImage: `url(${background})`,
    height: '100vh',
    backgroundSize: '100% 100%',
    backgroundRepeat: 'no-repeat',
    scrollBehaviour: 'none',
  },
  centerDiv: {
    textAlign: 'center',
    margin: 'auto',
    padding: '20vh',
  },
});

const SIGNUP_MUTATION = gql`
  mutation SignupMutation($email: String!, $password: String!, $name: String!) {
    signup(email: $email, password: $password, name: $name) {
      token
      user {
        name
        id
      }
    }
  }
`;

const Signup = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [names, setNames] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const onChangeNames = (e) => {
    const names = e.target.value;
    setNames(names);
  };

  const onChangeEmail = (e) => {
    const email = e.target.value;
    setEmail(email);
  };
  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };

  const [signup] = useMutation(SIGNUP_MUTATION, {
    variables: {
      name: names,
      email: email,
      password: password,
    },
    onCompleted: ({ signup }) => {
      console.log(signup.user);
      setIsLoading(false);
      toast.success('successfully signed up!', {
        position: 'top-center',
        autoClose: 2000,
      });
      localStorage.setItem('userToken', signup.token);
      localStorage.setItem('userName', signup.user.name);
      localStorage.setItem('userId', signup.user.id);
      setTimeout(() => {
        navigate('/dashboard/flashcards');
      }, 3000);
    },
    onError: (error) => {
      console.log(error);
      setIsLoading(false);
      toast.success(error.message, {
        position: 'top-center',
        autoClose: 2000,
      });
    },
  });

  return (
    <div className={classes.home} style={{ display: 'flex' }}>
      <Box
        sx={{
          width: '40vw',
          paddingTop: '50% auto',
          borderRadius: '20px',
          alignSelf: 'center',
          background: 'white',
          margin: 'auto',
        }}
      >
        <Container>
          <Typography
            variant="h4"
            style={{
              color: 'black',
              fontWeight: 700,
              textAlign: 'center',
              marginTop: '1rem',
              marginBottom: '3rem',
            }}
          >
            Create new account
          </Typography>

          <ValidatorForm
            form
            onSubmit={(e) => {
              e.preventDefault();
              // handleLogin();
            }}
            sx={{
              alignSelf: 'center',
              alignItems: 'center',
            }}
          >
            <div
              style={{
                margin: '0 auto',
                maxWidth: '300px',
                width: '100%',
              }}
            >
              <FormControl
                margin="normal"
                required
                // fullWidth
                style={{ alignContent: 'center', width: "100%" }}
              >
                <TextValidator
                  label="names"
                  name="Names"
                  variant="filled"
                  value={names}
                  onChange={onChangeNames}
                  style={{
                    backgroundColor: '#F4F8F5',
                    margin: '0 auto',
                    width: "100%",
                  }}
                  validators={['required']}
                  errorMessages={['This field is required']}
                />
              </FormControl>
            </div>
            <div
              style={{
                width: 'fit-content',
                margin: '0 auto',
                maxWidth: '300px',
                width: '100%',
              }}
            >
              <FormControl
                margin="normal"
                required
                fullWidth
                style={{ 
                  alignContent: 'center',
                  width:'100%' 
                   }}
              >
                <TextValidator
                  label="email"
                  name="Email"
                  variant="filled"
                  value={email}
                  onChange={onChangeEmail}
                  style={{
                    backgroundColor: '#F4F8F5',
                    margin: '0 auto',
                    width: "100%",
                  }}
                  validators={['required', 'isEmail']}
                  errorMessages={[
                    'This field is required',
                    'email is not valid',
                  ]}
                />
              </FormControl>
            </div>

            <div
              style={{
                width: 'fit-content',
                margin: '0 auto',
                maxWidth: '300px',
                width: '100%',
              }}
            >
              <FormControl margin="normal" required fullWidth>
                <TextValidator
                  label="Password"
                  name="password"
                  type="password"
                  variant="filled"
                  value={password}
                  onChange={onChangePassword}
                  validators={['required']}
                  style={{
                    backgroundColor: '#F4F8F5',
                    width:'100%'
                  }}
                  errorMessages={['Password is required.']}
                />
              </FormControl>
            </div>

            <div
              style={{
                width: 'fit-content',
                margin: '0 auto',
                maxWidth: '200px',
                width: '100%',
              }}
            >
              <LoadingButton
                variant="contained"
                type="submit"
                sx={{ color: 'white' }}
                loading={isLoading}
                onClick={() => {
                  setIsLoading(true);
                  signup();
                }}
                style={{
                  borderRadius: '20px',
                  textAlign: 'center',
                  margin: '10px',
                  color: 'white,',
                  borderColor: 'white',
                  backgroundColor: '#07539F',
                  width:'100%'
                }}
              >
                register
              </LoadingButton>
            </div>

            <Box
              sx={{
                display: 'flex',
                justifyContent: 'right',
              }}
            >
              <Link
                href="/login"
                underline="none"
                style={{
                  color: '#07539F',
                  marginBottom: '20px',
                }}
              >
                LOGIN
              </Link>
            </Box>
          </ValidatorForm>
        </Container>
      </Box>
    </div>
  );
};

export default Signup;
