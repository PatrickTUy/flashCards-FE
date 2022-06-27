import { gql, useLazyQuery, useMutation } from '@apollo/client';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import AssignmentIcon from '@mui/icons-material/Assignment';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import EditIcon from '@mui/icons-material/Edit';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import Grid from '@mui/material/Grid';
import MenuItem from '@mui/material/MenuItem';
import {
  default as CreateModal,
  default as EditModal,
  default as Modal,
} from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  ownFlashcards,
  setFlashcardDescription,
  setFlashcardIsDone,
  setFlashcardUrl,
} from '../../redux/actions/flashcardAction';
import Layout from './Layout';

const FEED_QUERY = gql`
  query MyFeed {
    myFeed {
      id
      description
      url
      isDone
      createdAt
      addedBy {
        name
      }
    }
  }
`;

const EDIT_MUTATION = gql`
  mutation EditFlashCard(
    $description: String
    $url: String
    $isDone: String
    $editFlashCardId: Int!
  ) {
    editFlashCard(
      description: $description
      url: $url
      isDone: $isDone
      id: $editFlashCardId
    ) {
      id
    }
  }
`;

const DELETE_MUTATION = gql`
  mutation DeleteFlashCard($deleteFlashCardId: Int!) {
    deleteFlashCard(id: $deleteFlashCardId) {
      id
    }
  }
`;

const CREATE_MUTATION = gql`
  mutation AddFlashCard($description: String!, $url: String!) {
    addFlashCard(description: $description, url: $url) {
      id
    }
  }
`;

const MyFlashcards = () => {
  const [showModal, setShowModal] = React.useState(false);

  const [showEditModal, setShowEditModal] = React.useState(false);

  const [showCreateModal, setShowCreateModal] = React.useState(false);
  const [description, setDescription] = React.useState(' ');
  const [createCard, setCreateCard] = React.useState(false);
  const [deleteCard, setDeleteCard] = React.useState(false);
  const [editCard, setEditCard] = React.useState(false);

  const urls = [
    {
      value: 'https://i.imgflip.com/3oevdk.jpg',
      label: 'OLD MAN ',
    },

    {
      value: 'http://i.imgflip.com/1bij.jpg',
      label: 'ON CALL ',
    },
    {
      value: 'https://i.imgflip.com/28j0te.jpg',
      label: 'GYM ',
    },
    {
      value: 'https://i.imgflip.com/39t1o.jpg',
      label: 'CELEBRATING ',
    },
    {
      value: 'https://i.imgflip.com/4acd7j.png',
      label: 'LAUGHING ',
    },
    {
      value: 'https://i.imgflip.com/265k.jpg',
      label: 'SKEPTICAL KID ',
    },
    {
      value: 'https://i.imgflip.com/9iz9.jpg',
      label: 'MAN READING ',
    },
    {
      value: 'https://i.imgflip.com/wxica.jpg',
      label: ' FINE ',
    },
    {
      value: 'https://i.imgflip.com/gk5el.jpg',
      label: 'LAPTOP ',
    },
    {
      value: 'https://i.imgflip.com/1h7in3.jpg',
      label: 'THINK ',
    },
    {
      value: 'https://i.imgflip.com/1bhw.jpg',
      label: ' OLD WOMAN',
    },
  ];

  const progressArray = [
    {
      value: 'false',
      label: 'IN PROGRESS',
    },
    {
      value: 'true',
      label: 'FINISHED',
    },
  ];
  const [url, setUrl] = React.useState('https://i.imgflip.com/3oevdk.jpg');
  const [flashcardId, setFlashcardId] = React.useState(null);
  const [editId, setEditId] = React.useState(null);

  const [deleteBox, setDeleteBox] = React.useState(' ');

  const [open, setOpen] = React.useState(true);

  const [getMyFlashCards] = useLazyQuery(FEED_QUERY, {});
  const dispatch = useDispatch();

  const flashCards = useSelector((state) => state.flashcards);
  const editedFlashcard = useSelector((state) => state.flashcards.editContent);

  React.useEffect(() => {
    getMyFlashCards({
      fetchPolicy: 'network-only',
      onCompleted: (data) => {
        console.log(data, 'getMyFlashCards');
        data && dispatch(ownFlashcards(data.myFeed));
        // localStorage.setItem('userToken', login.token);
        // localStorage.setItem('userName',login.user.name)
        // localStorage.setItem('userId',login.user.id)
        // navigate('/dashboard/flashcards');
      },
      onError: (error) => {
        console.log(error, 'my error');
      },
    });
  }, [editCard, deleteCard, createCard]);

  // data && console.log(data,'omoge for real')

  React.useEffect(() => {
    if (flashCards.myFlashcards.length > 0 && editId) {
      console.log(flashCards.myFlashcards.id, 'yooooooooooo');

      const fetchFlashcard = flashCards.myFlashcards.filter(
        (flashcard) => flashcard.id === editId
      );
      dispatch(setFlashcardDescription(fetchFlashcard[0].description));

      dispatch(setFlashcardUrl(fetchFlashcard[0].url));

      dispatch(setFlashcardIsDone(fetchFlashcard[0].isDone));
      // dispatch(cardToEdit({description:fetchFlashcard[0].description,isDone:fetchFlashcard[0].isDone,url:fetchFlashcard[0].url}))
      console.log(fetchFlashcard[0], 'jijii');
    }
  }, [editId]);

  //  setEditFlashcard({description:fetchFlashcard.description,
  //   isDone:fetchFlashcard.isDone})

  console.log(flashCards.myFlashcards, 'myflashcards here render');

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [deleteflashcard] = useMutation(DELETE_MUTATION, {
    variables: {
      deleteFlashCardId: flashcardId,
    },
    onCompleted: () => {
      setDeleteCard((state) => !state);
    },
  });

  const [createFlashcard] = useMutation(CREATE_MUTATION, {
    variables: {
      description: description,
      url: url,
    },
    onCompleted: () => {
      setCreateCard((state) => !state);
    },
  });

  const [editChosenFlashcard] = useMutation(EDIT_MUTATION, {
    variables: {
      editFlashCardId: editId,
      description: editedFlashcard.description,
      url: editedFlashcard.url,
      isDone: editedFlashcard.isDone,
    },
    onCompleted: () => {
      setEditCard((state) => !state);
      // navigate('/dashboard/flashcards');
      // window.location.reload();
    },
    onError: (err) => {
      console.log(
        editId,
        editedFlashcard.description,
        editedFlashcard.url,
        editedFlashcard.isDone
      );
      console.log(err, 'my beautiful error');
    },
  });

  const handleurlChange = (e) => {
    setUrl(e.target.value);
  };

  const handleEditUrlChange = (e) => {
    dispatch(setFlashcardUrl(e.target.value));
  };

  const handleProgress = (e) => {
    dispatch(setFlashcardIsDone(e.target.value));
  };
  const handleCLose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setShowCreateModal(false);
  };

  // const [delete] = useMutation(DELETE_MUTATION, {
  //   variables: {
  //     id:
  //   },
  //   onCompleted: ({ signup }) => {
  //     localStorage.setItem('userToken', signup.token);
  //     navigate('/dashboard/flashcards');
  //   }
  // });

  // deleteFlashcard

  console.log(flashcardId, 'id to be deleted');
  return (
    <div>
      <Layout />

      <div
        style={{
          display: 'block',
          height: 'fit-content',
          marginLeft: 245,
          marginTop: '70px',
        }}
      >
        <div
          style={{
            display: flashCards.myFlashcards.length > 0 ? 'flex' : 'none',
            alignItems: 'center',
            height: 'fit-content',
          }}
        >
          <Typography style={{ marginRight: '10px', fontWeight: 600 }}>
            {' '}
            Add flash Card
          </Typography>
          <AddCircleOutlineIcon
            cursor="pointer"
            onClick={() => setShowCreateModal(true)}
          />
        </div>
      </div>
      <Grid
        style={{ marginLeft: 245, marginTop: '5px', width: '80%' }}
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
      >
        {flashCards.myFlashcards.length > 0 ? (
          flashCards.myFlashcards.map((flashcard, index) => (
            <Grid item xs={6} sm={3} md={4} key={index}>
              <div
                style={{
                  borderRadius: '20px',
                  boxShadow: '10px 5px 5px blue',
                  height: '500px',
                }}
              >
                <img src={flashcard.url} width="95%" height="50%" />
                <div>
                  <Typography
                    style={{
                      color: 'blue',
                      fontSize: '20px',
                      fontFamily: 'helvetica',
                      fontWeight: 700,
                    }}
                    align="center"
                  >
                    DESCRIPTION
                  </Typography>
                  <hr />
                  <Typography
                    style={{ fontSize: '20px', marginBottom: '10px' }}
                  >
                    {flashcard.description}
                  </Typography>
                  <div style={{ display: 'flex' }}>
                    <div>
                      <Typography
                        style={{
                          fontSize: '15px',
                          marginBottom: '10px',
                          fontWeight: 700,
                          marginRight: '10px',
                        }}
                      >
                        CREATED :{' '}
                      </Typography>
                    </div>

                    <div>
                      <Typography>
                        {flashcard.createdAt.split('T')[0]}
                      </Typography>
                    </div>
                  </div>
                  <div style={{ display: 'flex' }}>
                    <div>
                      <Typography
                        style={{
                          fontSize: '15px',
                          marginBottom: '10px',
                          fontWeight: 700,
                          marginRight: '10px',
                        }}
                      >
                        STATUS{' '}
                      </Typography>
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

                  <div style={{ display: 'flex' }}>
                    <div
                      style={{
                        backgroundColor: 'lightblue',
                        margin: '10px',
                        cursor: 'pointer',
                      }}
                      onClick={() => {
                        console.log('im clicked');
                        setEditId(flashcard.id);
                        setDeleteBox('block');
                        setShowEditModal(true);
                      }}
                    >
                      <EditIcon />
                    </div>

                    <div
                      style={{
                        backgroundColor: 'lightblue',
                        margin: '10px',
                        cursor: 'pointer',
                      }}
                      onClick={() => {
                        setFlashcardId(flashcard.id);
                        setDeleteBox('block');
                        setShowModal(true);
                      }}
                    >
                      <DeleteIcon />
                    </div>
                  </div>
                </div>
              </div>
            </Grid>
          ))
        ) : (
          <div style={{ display: 'flex', alignItems: 'center' }}>
            {' '}
            <Typography style={{ marginRight: '10px' }}>
              YOU DO NOT HAVE ANY FLASH CARD , CREATE ONE!
            </Typography>
            <AddCircleOutlineIcon
              cursor="pointer"
              onClick={() => setShowCreateModal(true)}
            />
          </div>
        )}
      </Grid>

      <CreateModal
        open={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{
          marginLeft: 260,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '20px',
          width: '100vw',
          height: '100vh',
        }}
      >
        <div
          style={{
            backgroundColor: 'white',
            textAlign: 'center',
            padding: '20px',
          }}
        >
          <Dialog
            style={{ display: 'block' }}
            open={true}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <CloseIcon
              sx={{
                cursor: 'pointer',
                backgroundColor: 'red',
                alignSelf: 'end',
              }}
              onClick={() => setShowCreateModal(false)}
            />

            <Typography
              align="center"
              style={{ margin: '10px', fontSize: '20px', fontWeight: 600 }}
            >
              CREATE FLASH CARD{' '}
            </Typography>
            <hr />

            <TextField
              label="description"
              variant="filled"
              value={description}
              sx={{
                fontWeight: 600,
                margin: 2,
                textAlign: 'left',
                width: '60%',
                alignSelf: 'center',
                backgroundColor: '#D3D3D3',
              }}
              onChange={(e) => {
                setDescription(e.target.value);
              }}
            />
            <Typography style={{ margin: '20px' }}>
              {' '}
              Down below select an image that matches your description{' '}
            </Typography>

            <TextField
              id="outlined-select-image-url"
              select
              variant="filled"
              label="url"
              value={url}
              onChange={handleurlChange}
              sx={{
                fontWeight: 600,
                margin: 2,
                textAlign: 'left',
                width: '60%',
                alignSelf: 'center',
                backgroundColor: '#D3D3D3',
              }}
            >
              {urls.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>

            {/* <TextField
                label="Image url"
                variant="filled"
                value= {url}
                sx={{
                  fontWeight: 600,
                  margin: 2,
                  textAlign: 'left',
                  width:'60%',
                  alignSelf:'center',
                  backgroundColor:'#D3D3D3'
                }}
                onChange={(e) => {
                   setUrl(e.target.value);
                }}
                
              /> */}

            <div
              style={{
                backgroundColor: 'lightblue',
                width: 'fit-content',
                alignSelf: 'center',
                borderRadius: '5px',
                cursor: 'pointer',
                marginBottom: '10px',
              }}
              onClick={() => {
                createFlashcard();
                setShowCreateModal(false);
              }}
            >
              <Typography style={{ margin: '7px' }}>CREATE</Typography>
            </div>
          </Dialog>
        </div>
      </CreateModal>

      <EditModal
        open={showEditModal}
        onClose={() => setShowEditModal(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{
          marginLeft: 260,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '20px',
          width: '100vw',
          height: '100vh',
        }}
      >
        <div
          style={{
            backgroundColor: 'white',
            textAlign: 'center',
            padding: '20px',
          }}
        >
          <Dialog
            style={{ display: deleteBox }}
            open={true}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <CloseIcon
              sx={{
                cursor: 'pointer',
                backgroundColor: 'red',
                alignSelf: 'end',
              }}
              onClick={() => setShowEditModal(false)}
            />
            <Typography
              align="center"
              style={{ margin: '10px', fontSize: '20px', fontWeight: 600 }}
            >
              EDIT FLASH CARD{' '}
            </Typography>
            <hr />
            <TextField
              label="description"
              variant="filled"
              value={editedFlashcard.description}
              sx={{
                fontWeight: 600,
                margin: 2,
                textAlign: 'left',
                width: '30vw',
                alignSelf: 'center',
                backgroundColor: '#D3D3D3',
              }}
              onChange={(e) => {
                dispatch(setFlashcardDescription(e.target.value));
              }}
            />

            <TextField
              id="outlined-select-image-url"
              select
              variant="filled"
              label="url"
              value={editedFlashcard.url}
              onChange={handleEditUrlChange}
              sx={{
                fontWeight: 600,
                margin: 2,
                textAlign: 'left',
                width: '30vw',
                alignSelf: 'center',
                backgroundColor: '#D3D3D3',
              }}
            >
              {urls.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>

            <TextField
              id="outlined-select-progress"
              select
              variant="filled"
              label="status"
              value={editedFlashcard.isDone}
              onChange={handleProgress}
              sx={{
                fontWeight: 600,
                margin: 2,
                textAlign: 'left',
                width: '30vw',
                alignSelf: 'center',
                backgroundColor: '#D3D3D3',
              }}
            >
              {progressArray.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>

            <div
              style={{
                backgroundColor: 'lightblue',
                width: 'fit-content',
                alignSelf: 'center',
                borderRadius: '5px',
                cursor: 'pointer',
                marginBottom: '10px',
              }}
              onClick={() => {
                editChosenFlashcard();
                setShowEditModal(false);
              }}
            >
              <Typography style={{ margin: '7px' }}>EDIT</Typography>
            </div>
          </Dialog>
        </div>
      </EditModal>

      <Modal
        open={showModal}
        onClose={() => setShowModal(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{
          marginLeft: 260,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '20px',
          width: '100vw',
          height: '100vh',
        }}
      >
        <div
          style={{
            backgroundColor: 'white',
            textAlign: 'center',
            padding: '20px',
          }}
        >
          <Dialog
            style={{ display: deleteBox }}
            open={true}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Are you sure you want to delete this flashcard
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button variant="contained" onClick={handleCloseModal} autoFocus>
                No
              </Button>
              <Button
                variant="contained"
                onClick={() => {
                  deleteflashcard();
                  setShowModal(false);
                  // window.location.reload()
                }}
              >
                Yes
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      </Modal>
    </div>
  );
};

export default MyFlashcards;
