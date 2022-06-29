import { gql, useLazyQuery } from '@apollo/client';
import AssignmentIcon from '@mui/icons-material/Assignment';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { explore } from '../../redux/actions/flashcardAction';
import Layout from './Layout';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';
import { Button, MenuItem, TextField } from '@mui/material';



const FEED_QUERY = gql`
query Feed {
  feed {
    description
    url
    isDone
    createdAt
    addedBy{
      id
      name
    }
    
  }
}
`;

const SORT_FEED_QUERY = gql`
query Feed($orderBy: [LinkOrderByInput!]) {
  feed(orderBy: $orderBy) {
    description
    url
    isDone
    createdAt
    addedBy {
      id
      name
    }
  }
}
`


const ExploreFlashcards = ()=>{
  const userId = JSON.parse(localStorage.getItem('userId'));
  const[sort, setSort] = React.useState('desc');
  
  const sortArray = [
    {
      value: 'asc',
      label: 'ASCENDING',
    },
    {
      value: 'desc',
      label: 'DESCENDING',
    },
  ];
  const handleSortChange = (e)=>{
   setSort(e.target.value)
  };

 
 
  const [getFlashCards,{ data }] = useLazyQuery(FEED_QUERY, {
  });
  const [getSortedFlashCards,{ data: data1 }] = useLazyQuery(SORT_FEED_QUERY, {

  });
  const dispatch = useDispatch();

  React.useEffect(()=>{getFlashCards( {
    fetchPolicy: 'network-only',
    onCompleted: ( data ) => {
    const filtered = data.feed.filter( (flashcards)=> flashcards.addedBy.id !== userId   ) 
  
     data && dispatch(
    explore(
      filtered
    )
  )
  },onError:(error)=>{
    console.log(error,'my error')
  }})},[])

  const fetchSortedFlashCards = ()=>{
    getSortedFlashCards({
      fetchPolicy: 'network-only',
      variables: {
        "orderBy": [
          {
            "description": sort,
          }
        ]
      },
      onCompleted: ( data1 ) => {
      const filtered = data1.feed.filter( (flashcards)=> flashcards.addedBy.id !== userId   ) 
    
       data && dispatch(
      explore(
        filtered
      )
    )
    },onError:(error)=>{
      console.log(error,'my error')
    }})
  }

  const flashCards = useSelector((state) => state.flashcards);

  return (
    <div>
      <Layout/>
      <Typography style={{marginLeft:260, marginTop:'70px', fontSize:'30px', fontFamily:'helvetica', fontWeight:'bold'}}> Explore flashcards from other users to find inspiration. </Typography>
        <div style={{marginLeft:260, display:"flex", alignItems: 'center'}}>
          
        <TextField
              id="outlined-select-sort"
              select
              variant="outlined"
              color="secondary"
              value={sort}
              onChange={handleSortChange}
              sx={{
                fontWeight: 600,
                margin: 2,
                textAlign: 'left',
                width: '30%',
                alignSelf: 'center',
                
              }}
            >
              {sortArray.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
            <Button variant="contained" color="secondary" style={{width:"fit-content", height:"fit-content"}}onClick={fetchSortedFlashCards}> SORT</Button>
        </div>
      

          <Grid style={{marginLeft:245, marginTop:'5px',width:"80%",marginBottom:'15px'}} container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
        
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
                      {flashcard.isDone === 'true' ? (
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                          <DoneAllIcon /> <SentimentSatisfiedAltIcon />
                        </div>
                      ) : (
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                          <AssignmentIcon />{' '}
                          <div style={{ marginLeft: '10px' }}>IN PROGRESS</div>
                        </div>
                      )}
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