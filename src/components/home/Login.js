import { gql, useMutation } from '@apollo/client';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import LoadingButton from '@mui/lab/LoadingButton';
import {
  Container,
  FormControl, Typography
} from '@mui/material';
import Box from '@mui/material/Box';
import InputAdornment from '@mui/material/InputAdornment';
import Link from '@mui/material/Link';
import { makeStyles } from '@mui/styles';
import { useState } from 'react';
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import background from '../../Assets/Images/loginBG.jpg';

const useStyles = makeStyles({
  home:{
    backgroundImage:`url(${background})`,
    height:'100vh',
    backgroundSize:'100% 100%',
    backgroundRepeat: 'no-repeat',
    scrollBehaviour:'none',
  },
  centerDiv:{
    textAlign: 'center',
    margin: 'auto',
    padding:'20vh'
  }
})

const LOGIN_MUTATION = gql`
mutation Login($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    token
    user{
      id
      name
    }
  }
}
`;

const Login = ()=>{
  const classes = useStyles();
  const navigate = useNavigate();
  // const token = JSON.parse(localStorage.getItem('userToken'));

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const onChangeEmail = (e) => {
    const email = e.target.value;
    setEmail(email);
  };
  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };
 
  
  const [login] = useMutation(LOGIN_MUTATION, {
    variables: {
      email: email,
      password: password
    },
    onCompleted: ({ login }) => {
      setIsLoading(false)
      toast.success('successfully logged in', {
        position: "top-center",
        autoClose:2000,
      })
      localStorage.setItem('userToken', login.token);
      localStorage.setItem('userName',login.user.name)
      localStorage.setItem('userId',login.user.id)
     setTimeout( ()=>{
      navigate('/dashboard/flashcards')
     },3000)
    },
    onError:(error)=>{
      setIsLoading(false)
      toast.error(error.message, {
        position: "top-center",
        autoClose:3000,
      })
    }

  });
  
  
 
  return (
    <div className={classes.home}
    style={{display:'flex'}}>
     <Box
     sx={{
      width: '40vw',
      paddingTop: '50% auto',
      borderRadius:'20px',
      alignSelf:'center',
      background:'white',
      margin:'auto'
    }}
   
    >
      <Container>
        <Typography
        variant="h4"
        style={{color:'black',
        fontWeight:700,
        textAlign:'center',
        marginTop:'1rem',
        marginBottom:'3rem'}}
        >
          Log into your account
        </Typography>
        
         <ValidatorForm
                form
                onSubmit={(e) => {
                  e.preventDefault();
                  
                }}
                sx={{
              
                  alignSelf:'center',
                  alignItems:'center'
                }}
              >
                <div
                style={{
                  width:'fit-content',
                  margin:'0 auto'
                }}>

                  <FormControl margin="normal" required fullWidth
                style={{alignContent:'center'}}>
                  <TextValidator
                    label="email"
                    name="Email"
                    variant="filled"
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <EmailIcon />
                        </InputAdornment>
                      ),
                    }}
                    value={email}
                    onChange={onChangeEmail}
                    style={{ backgroundColor: '#F4F8F5', width: '20vw',margin:'0 auto' }}
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
                  width:'fit-content',
                  margin:'0 auto'
                }}>
                <FormControl margin="normal" required fullWidth>
                  <TextValidator
                    label="Password"
                    name="password"
                    type="password"
                    variant="filled"
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <LockIcon />
                        </InputAdornment>
                      ),
                    }}
                    value={password}
                    onChange={onChangePassword}
                    validators={['required']}
                    style={{ backgroundColor: '#F4F8F5', width: '20vw' }}
                    errorMessages={['Password is required.']}
                  />
                </FormControl>
                </div>
                
               <div
               style={{
                width:'fit-content',
                margin:'0 auto'
              }}>
              <LoadingButton
                  disabled= {email && password? false:true}
                  variant="contained"
                  type="submit"
                  sx={{ color: 'white' }}
                  onClick={()=>{
                    setIsLoading(true)
                    login()
                  }}
                  loading={isLoading}
                  style={{
                    borderRadius: '20px',
                    textAlign: 'center',
                    margin: '10px',
                    width: '15vw',
                    color: 'white,',
                    borderColor: 'white',
                    backgroundColor: '#07539F',
                  }}
                >
                  Sign In
                </LoadingButton>
              </div>
              <Box
              sx={{
                display: 'flex',
                justifyContent: 'right',
              }}>
                <Link
                  href="/register"
                  underline="none"
                  style={{ 
                    color: '#07539F', marginBottom: '20px' }}
                >
                  REGISTER
                </Link>
              </Box>
             
                
              </ValidatorForm>
      </Container>
    </Box>
    </div>
  )
} 

export default Login