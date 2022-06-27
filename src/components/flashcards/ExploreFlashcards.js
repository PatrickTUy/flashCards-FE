import { gql, useLazyQuery } from '@apollo/client';
import AssignmentIcon from '@mui/icons-material/Assignment';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { explore } from '../../redux/actions/flashcardAction';
import Layout from './Layout';



const FEED_QUERY = gql`
query Feed {
  feed {
    description
    url
    createdAt
    addedBy{
      id
      name
    }
    
  }
}
`;

const ExploreFlashcards = ()=>{
  const userId = JSON.parse(localStorage.getItem('userId'))
 console.log(userId,'localstorage')

  const [getFlashCards,{ data }] = useLazyQuery(FEED_QUERY, {
    
   
  });
  const dispatch = useDispatch();

  React.useEffect(()=>{getFlashCards( {
    fetchPolicy: 'network-only',
    onCompleted: ( data ) => {
    console.log(data,'getFlashCards')
    console.log(data.feed[0].addedBy.id,'id')
    const filtered = data.feed.filter( (flashcards)=> flashcards.addedBy.id !== userId   ) 
  
     data && dispatch(
    explore(
      filtered
    )
  )
    // localStorage.setItem('userToken', login.token);
    // localStorage.setItem('userName',login.user.name)
    // localStorage.setItem('userId',login.user.id)
    // navigate('/dashboard/flashcards');
  },onError:(error)=>{
    console.log(error,'my error')
  }})},[])

  // data && console.log(data,'omoge for real')

 

  
  const flashCards = useSelector((state) => state.flashcards);

  console.log(flashCards.explore,'myflashcards here render')

  return (
    <div>
      <Layout/>
      <Typography style={{marginLeft:260, marginTop:'70px', fontSize:'30px', fontFamily:'helvetica', fontWeight:'bold'}}> Explore flashcards from other users to find inspiration. </Typography>
          <Grid style={{marginLeft:245, marginTop:'5px',width:"80%"}} container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
        
       {flashCards.explore && flashCards.explore.map((flashcard, index) => (
        <Grid item xs={6} sm={3} md={4} key={index}>
          <div style={{borderRadius:"20px",boxShadow:"10px 5px 5px blue",height:'500px'}}>
            <img src={flashcard.url} width="95%" height="50%"/>
            <div>
              <Typography style={{
                color:'blue',
                fontSize:"20px",
                fontFamily:"helvetica",
                fontWeight:700
              }}
               align='center'>DESCRIPTION</Typography>
              <hr/>
              <Typography style={{fontSize:"20px",marginBottom:'10px'}}>{flashcard.description}</Typography>
              <div style={{display:'flex',}}>
    
                <div>
                <Typography style={{fontSize:"15px",marginBottom:'10px',fontWeight:700,marginRight:'10px'}}>CREATED: </Typography>
                </div>
    
              <div>
              <Typography>{flashcard.createdAt.split('T')[0]}</Typography>
              </div>
             
              </div>
              <div style={{display:'flex',}}> 
    
              <div>
              <Typography style={{fontSize:"15px",marginBottom:'10px',fontWeight:700,marginRight:'10px'}}>STATUS :</Typography>
              </div>
    
              <div>
              <Typography>{flashcard.isDone ==="true"?<DoneAllIcon/>:<div style={{display:'flex', alignItems: 'center'}}>
               <AssignmentIcon /> <div style={{marginLeft:'10px'}}>IN PROGRESS</div>
                </div>}</Typography>
              </div>
    
              </div>


              <div style={{display:'flex',}}> 
    
                  <div>
                   <Typography style={{fontSize:"15px",marginBottom:'10px',fontWeight:700,marginRight:'10px'}}>OWNER :</Typography>
                  </div>

                  <div>
                   <Typography>{flashcard.addedBy.name}</Typography>
                  </div>

              </div>
              
            
    
            </div>
          </div>
        </Grid>
      ))}
    </Grid>
    </div>
  )
}

export default ExploreFlashcards