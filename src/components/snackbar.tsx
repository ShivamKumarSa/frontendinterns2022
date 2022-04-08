import * as React from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const CustomizedSnackbars = ({ open, setOpen, error, type }: any) => {
  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  return (
    <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
      <MuiAlert onClose={handleClose} severity={type} sx={{ width: '100%' }}>
        {error}
      </MuiAlert>
    </Snackbar>
  );
};

export default CustomizedSnackbars;
