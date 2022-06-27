import React from 'react';
import { Snackbar } from '@mui/material';
import Alert from '@mui/material/Alert';
import { useNavigate, useLocation } from 'react-router-dom';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import { makeStyles } from "@mui/styles";

const Logout = () => {
  const navigate = useNavigate();

  const handleClose = () => {
    setOpen(false);
  };


  const handleLogout = () => {
   
 
    localStorage.removeItem('userToken')
    window.location.replace('http://localhost:3000')
   
  };

  const [open, setOpen] = React.useState(true);


  const handleCloseModel = () => {
    setOpen(false);
    console.log('supposed to work')
    window.location.replace('http://localhost:3000/dashboard/flashcards')
    setOpen(false);
  };

  const useStyles= makeStyles({
    body:{
        textAlign: 'center',
    }
  });

  const classes = useStyles();

  return (
    
    <div className={classes.body}>    
      <Dialog
        open= { open }
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to log out of adventure flashcards?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={handleCloseModel}>No</Button>
          <Button variant="contained" onClick={handleLogout} autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Logout
