import * as React from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Container from '@mui/material/Container';
// import FormControl from '@mui/material/FormControl';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
// import Alert from '@mui/material/Alert';
// import Stack from '@mui/material/Stack';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import InputAdornment from '@mui/material/InputAdornment';
import * as yup from 'yup';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useSelector } from 'react-redux';
import { signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';
// import {styled} from "@mui/material";
import Popup from './recoveryPopup';
import 'reactjs-popup/dist/index.css';
import logo from '../images/FPblackLogo.png';
import Snackbar from './snackbar';
import { auth } from '../configs/firebase/firebaseConfig';
import { LoginDataInterface, RecoveryDataInterface } from '../types/index';
import { RootState } from '../store/store';
// import { useGetCustomerDataQuery } from '../api/openAPI';

const OutlinedCard = () => {
  const [type, setType] = React.useState<string>('Customer');
  const [open, setOpen] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string>('');
  const [errorType, setErrorType] = React.useState<string>('error');
  const [recoveryEmail, setRecoveryEmail] = React.useState<string>('');
  const [showPassword, changePasswordVisibility] = React.useState<boolean>(false);
  const navigate = useNavigate();
  const email = useSelector((state: RootState) => state.login.email);

  if (email) {
    navigate('/');
  }

  const handleClickShowPassword = () => {
    changePasswordVisibility(!showPassword);
  };

  const schema = yup.object().shape({
    email: yup
      .string()
      .email('Please enter a valid email address')
      .required('Please enter your email'),
    password: yup
      .string()
      .required('Please enter password')
      .min(8, 'Password must have minimum 8 characters')
      .max(24, 'Password may not exceed 24 characters')
      .matches(/(?=.*[a-z])/, 'Password must have atleast one small case letter')
      .matches(/(?=.*[A-Z])/, 'Password must have atleast one uppercase letter')
      .matches(/(?=.*\d)/, 'Password must have atleast one digit')
      .matches(/(?=.*[@$!%*#?&])/, 'Password must have atleast one special character'),
  });

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<LoginDataInterface>({
    mode: 'all',
    resolver: yupResolver(schema),
  });
  const handleLogin: SubmitHandler<LoginDataInterface> = (data) => {
    console.log('submitting the form');
    if (data.email !== '' && data.password !== '') {
      signInWithEmailAndPassword(auth, data.email, data.password)
        .then(() => {
          setError('Successfully logged in!');
          setErrorType('success');
          setOpen(true);
        })
        .catch((e) => {
          console.log(e);
          setError(e.message);
          setErrorType('error');
          setOpen(true);
        });
    } else {
      setError('Enter valid E-Mail and Password');
      setErrorType('error');
      setOpen(true);
    }
  };

  const handleRecovery: SubmitHandler<RecoveryDataInterface> = (data) => {
    console.log(data, 'RECOVERY');
    sendPasswordResetEmail(auth, data.email)
      .then(() => {
        setError('Mail Sent');
        setErrorType('success');
        setOpen(true);
      })
      .catch((e: any) => {
        console.log(e);
        setError(e.message);
        setErrorType('error');
        setOpen(true);
      });
  };

  const curr_uid = useSelector((state: RootState) => state.login.uid);
  return curr_uid ? (
    <Navigate to="/" replace={true} />
  ) : (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Snackbar open={open} setOpen={setOpen} error={error} type={errorType} />
        <Typography
          variant="h4"
          gutterBottom
          component="div"
          sx={{ display: 'flex', alignItems: 'center', gap: '15px', mb: '15px' }}
        >
          <img src={logo} alt="logo" width="40px" />
          FlexiProcessor
        </Typography>

        <Box component="form" onSubmit={handleSubmit(handleLogin)} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
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
            </Grid>
            <Grid item xs={12} sx={{ position: 'relative' }}>
              <Controller
                name="password"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    type={showPassword ? 'text' : 'password'}
                    label="Password*"
                    fullWidth
                    variant="outlined"
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={handleClickShowPassword}
                            aria-label="toggle password visibility"
                            edge="end"
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                    autoComplete="new-password"
                    sx={{ borderRadius: '30px', marginBottom: '10px' }}
                    error={Boolean(errors.password?.message)}
                    helperText={errors.password?.message}
                  />
                )}
              />
            </Grid>
            <Grid xs={12}>
              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
                value={type}
                onChange={(e) => setType(e.target.value)}
                sx={{ justifyContent: 'center' }}
              >
                <FormControlLabel value="Customer" control={<Radio />} label="Customer" />
                <FormControlLabel value="Vendor" control={<Radio />} label="Vendor" />
              </RadioGroup>
            </Grid>

            <Grid xs={12} justifyContent="center">
              <Button fullWidth size="large" type="submit">
                Login
              </Button>
            </Grid>
          </Grid>
        </Box>
        <CardActions sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <Popup
            open={open}
            setOpen={setOpen}
            setErrorType={setErrorType}
            handleRecovery={handleRecovery}
            recoveryEmail={recoveryEmail}
            setRecoveryEmail={setRecoveryEmail}
          />
          <Typography variant="h6">OR</Typography>
          <Link to="/register">
            <Button size="large">Registration</Button>
          </Link>
        </CardActions>
      </Box>
    </Container>
  );
};

export default OutlinedCard;
