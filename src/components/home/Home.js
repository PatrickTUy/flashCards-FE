import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { makeStyles } from '@mui/styles';
import 'animate.css';
import background from '../../Assets/Images/flashcardBG.jpg';


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


const Home = () => {
  const classes = useStyles();
  return (
    <div className={classes.home}>
       <Box
       sx={{
        display: 'flex',
        flexWrap: 'wrap',
        paddingTop: '10px',
        justifyContent: 'right',
      }}
      >
       <a
          href="/login"
          underline="hover"
          style={{ align: 'center', color: 'white', textDecoration: 'none',cursor: 'pointer',
          marginTop:'1rem',

          fontSize:'20px' }}
           >
          Login
          </a>
        <a
        href="/register"
          underline="hover"
          style={{ align: 'center', color: 'white', textDecoration: 'none',cursor: 'pointer',
          marginTop:'1rem',
          marginRight:'2rem',
          marginLeft:'2rem',
          fontSize:'20px' }}
        >
          Register
        </a>
       </Box>
        
      <Container className={classes.centerDiv}>
        <Typography
           variant="h2"
           gutterBottom
           className="animate__animated animate__bounceInDown"
           style={{color:'white',fontSize:'70px',fontFamily:'fantasy',
           fontWeight:600}}>
          Welcome to adventure FLASHCARDS
        </Typography>
        <Typography
          variant="h3"
          gutterBottom
          className="animate__animated animate__bounceInLeft"
          style={{ color: '#D5ECD1' }}>
          The fastest way to track your progress
        </Typography>
        <hr
          className="animate__animated animate__bounceInUp"
          style={{ color: 'black' }}/>
    </Container>
    </div>
  );
};

export default Home