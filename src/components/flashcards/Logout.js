import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import { makeStyles } from '@mui/styles';

const Logout = () => {
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(true);

  const handleClose = () => {
    setOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('userToken');
    // navigate('/', { replace: true });
    window.location.pathname = '/';
  };

  const handleCloseModel = () => {
    setOpen(false);
    console.log('supposed to work');
    // navigate('/dashboard/flashcards', { replace: true });
    window.location.pathname = '/dashboard/flashcards';
  };

  const useStyles = makeStyles({
    body: {
      textAlign: 'center',
    },
  });

  const classes = useStyles();

  return (
    <div className={classes.body}>
      <Dialog
        open={open}
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
          <Button variant="contained" onClick={handleCloseModel}>
            No
          </Button>
          <Button variant="contained" onClick={handleLogout} autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Logout;
