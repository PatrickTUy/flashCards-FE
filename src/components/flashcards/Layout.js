import { gql } from '@apollo/client';
import ExploreIcon from '@mui/icons-material/Explore';
import LogoutIcon from '@mui/icons-material/Logout';
import SubjectOutlinedIcon from '@mui/icons-material/SubjectOutlined';
import AppBar from '@mui/material/AppBar';
import Avatar from '@mui/material/Avatar';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { makeStyles } from '@mui/styles';
import { format } from 'date-fns';
import { useLocation, useNavigate } from 'react-router-dom';


const drawerWidth = 240;
const useStyles = makeStyles((theme) => {
  return {
    page: {
      '&&': {
        background: '#f9f9f9',
        width: '100%',
        padding: '30px',
        marginTop:50
      },
    },
    drawer: {
      '&&': {
        width: drawerWidth,
      },
    },
    drawerPaper: {
      '&&': {
        width: drawerWidth,
      },
    },
    root: {
      '&&': {
        display: 'flex',
      },
    },
    active: {
      '&&': {
        background: '#00FFFF',
      },
    },
    title: {
      // padding:'30px',
    },
    appbar: {
      '&&': {
        width: `calc(100% - 240px)`,       
      },
    },
    date:{
      '&&':{
        color:'white',
        flexGrow:2,
       }
    },
    avatar:{
      '&&':{
        marginLeft :'30px'
      }
     
    }
    
    // toolbar:theme.mixins.toolbar,
     
  };
});
// const ALL_FLASH_CARDS = gql`
// query Feed {
//   feed {
//     url
//     description
//   }
// }
// `

const FEED_QUERY = gql`
query MyFeed {
  myFeed {
    description
    url
    createdAt
    addedBy{
      name
    }
    
  }
}
`;



const Layout = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const location = useLocation();
  const name = localStorage.getItem('userName');
  console.log(name,'name')


  // React.useEffect(()=>{
  //   login()
  // },[])
 
  // login()

  

  const flashcards = [
    1,2,3,4
  ]
  
  const menuItems = [
    {
      text: 'My Flashcards',
      icon: <SubjectOutlinedIcon color="secondary" />,
      path: '/dashboard/flashcards',
    },
    {
      text: 'Explore flash cards',
      icon: <ExploreIcon color="secondary" />,
      path: '/dashboard/explore',
    },
    {
      text: 'Log out',
      icon: <LogoutIcon color="secondary" />,
      path: '/logout',
    },
  ];
  return (
    <div className={classes.root}>
      <AppBar className={classes.appbar} elevation={3} style={{backgroundColor: '#b134eb'}}>
        <Toolbar>
          <Typography className={classes.date}>
          Today is the { format(new Date(),'do MMMM Y')}
          </Typography>
          <Typography color="white">
            { name }
          </Typography>
          <Avatar alt= { name } src="/static/images/avatar/3.jpg" className={classes.avatar}/>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        anchor="left"
        classes={{ paper: classes.drawerPaper }}
      >
        <div>
          <Typography 
           variant="h5"
           className={classes.title}
           style={{
            color:'blue',
            fontSize:"40px",
            fontFamily:"cursive",
            fontWeight:700
          }}
           align='center'>
            A.F.C
          </Typography>
        </div>
        {/* list/links */}
        <List >
          {menuItems.map((item) => (
            <ListItem
              button
              key={item.text}
              onClick={() => navigate(item.path)}
              className={location.pathname == item.path ? classes.active : null}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text}></ListItemText>
            </ListItem>
          ))}
        </List>
      </Drawer>
    
      </div>
  );
};

export default Layout;

