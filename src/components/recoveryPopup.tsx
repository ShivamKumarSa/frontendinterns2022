import React from 'react';
import Box from '@mui/material/Box';
import Popup from 'reactjs-popup';
import '../styles/popup.css';
import { Typography, Button } from '@mui/material';
import TextField from '@mui/material/TextField';
import * as yup from 'yup';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { RecoveryDataInterface } from '../types/index';

const SinglePopup = ({ handleRecovery }: any) => {
  const schema = yup.object().shape({
    email: yup
      .string()
      .email('Please enter a valid email address')
      .required('Please enter your email'),
  });
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<RecoveryDataInterface>({
    mode: 'all',
    resolver: yupResolver(schema),
  });

  return (
    <Popup
      trigger={
        <Typography variant="body1" component="a">
          Forgot Password?
        </Typography>
      }
      modal
      nested
    >
      {(close: any) => (
        <div className="modal">
          <button type="submit" className="close" onClick={close}>
            &times;
          </button>
          <div className="header"> Reset Password </div>
          <Box component="form" onSubmit={handleSubmit(handleRecovery)}>
            {' '}
            <Controller
              name="email"
              control={control}
              defaultValue=""
              rules={{ required: true }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Email Address*"
                  variant="outlined"
                  fullWidth
                  error={Boolean(errors.email?.message)}
                  helperText={errors.email?.message}
                  autoComplete="email"
                />
              )}
            />
            <Button size="small" type="submit">
              Send Recovery Mail
            </Button>
          </Box>
        </div>
      )}
    </Popup>
  );
};

export default SinglePopup;
