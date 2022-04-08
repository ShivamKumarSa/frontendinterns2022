import * as React from 'react';
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  updateProfile,
} from 'firebase/auth';
// import {useNavigate} from 'react-router-dom'
import Box from '@mui/material/Box';
import { Link, useNavigate } from 'react-router-dom';
// import Card from '@mui/material/Card';
import FormGroup from '@mui/material/FormGroup';
import { useDispatch } from 'react-redux';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
// import Alert from '@mui/material/Alert';
// import Stack from '@mui/material/Stack';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import InputAdornment from '@mui/material/InputAdornment';
// import FormControl from '@mui/material/FormControl';
import * as yup from 'yup';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// import {styled} from "@mui/material";
import 'reactjs-popup/dist/index.css';
import logo from '../images/FPblackLogo.png';
import Snackbar from './snackbar';
import { auth } from '../configs/firebase/firebaseConfig';
import { FormDataInterface, ICustomer } from '../types/index';
import { useSendUserDataQuery } from '../api/openAPI';
import { setUserType } from '../slices/slices';
// import { ICustomer } from '../types/index';

// ^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,24}$
// (?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&]){8,24}$
// (?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*#?&]){8,24}
const SignUp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [open, setOpen] = React.useState<boolean>(false);
  const [type, setType] = React.useState<string>('Customer');
  const [errorType, setErrorType] = React.useState<string>('error');
  const [error, setError] = React.useState<string>('');
  const [showPassword, changePasswordVisibility] = React.useState<boolean>(false);
  const [sendData, triggerSendData] = React.useState<boolean>(false);
  const [body, setBody] = React.useState<ICustomer>({
    firebaseId: '',
    email: '',
    firstName: '',
    lastName: '',
    mobileNum: '',
    emailVerified: false,
  });
  useSendUserDataQuery(body, { skip: sendData });

  const handleClickShowPassword = () => {
    changePasswordVisibility(!showPassword);
  };
  const schema = yup.object().shape(
    {
      firstName: yup
        .string()
        .required('Please enter first name')
        .trim('The contact name cannot include leading and trailing spaces')
        .matches(/^[A-Za-z ]*$/, 'Please enter valid name')
        .min(1, 'The contact name needs to be at least 1 char')
        .max(50, 'The contact name cannot exceed 50 char'),
      lastName: yup
        .string()
        .required('Please enter last name')
        .matches(/^[A-Za-z ]*$/, 'Please enter valid name')
        .trim('The contact name cannot include leading and trailing spaces')
        .min(1, 'The contact name needs to be at least 1 char')
        .max(50, 'The contact name cannot exceed 50 char'),
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
      confirmPassword: yup
        .string()
        .oneOf([yup.ref('password'), null], 'Passwords do not match')
        .required('Please enter password'),
      mobileNumber: yup
        .string()
        .nullable()
        .notRequired()
        .when('mobileNumber', {
          is: (value: string) => value?.length,
          then: (rule) =>
            rule
              .matches(
                /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
                'Enter a valid phone number',
              )
              .length(10, 'Phone number must be 10 digits'),
        }),
      terms: yup.boolean().oneOf([true], 'Please accept the terms'),
    },
    [['mobileNumber', 'mobileNumber']],
  );
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormDataInterface>({
    mode: 'all',
    resolver: yupResolver(schema),
  });
  const handleCopy = (e: any) => {
    e.preventDefault();
  };
  const handlePaste = (e: any) => {
    e.preventDefault();
  };
  const handleSignUp: SubmitHandler<FormDataInterface> = async (data) => {
    setError('Registering user please wait.....');
    setErrorType('success');
    setOpen(true);
    const userCreds = await createUserWithEmailAndPassword(auth, data.email, data.password);
    if (userCreds) {
      dispatch(setUserType({ userType: type }));
      await updateProfile(userCreds.user, {
        displayName: `${data.firstName} ${data.lastName}`,
      });
      console.log('display name is ', userCreds.user.displayName);
      setBody({
        firebaseId: userCreds.user.uid,
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
        mobileNum: data.mobileNumber,
        emailVerified: userCreds.user.emailVerified,
      });
      triggerSendData(true);
      setError(
        'Successfully registered! Please Check your email. You received a verification link',
      );
      await sendEmailVerification(userCreds.user);
      navigate('/');
    } else {
      setError('Email already exists');
      setErrorType('error');
      setOpen(true);
    }
  };
  // const navigate = useNavigate()
  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography
          variant="h4"
          gutterBottom
          component="div"
          sx={{ display: 'flex', alignItems: 'center', gap: '15px', mb: '15px' }}
        >
          <img src={logo} alt="logo" width="40px" />
          FlexiProcessor
        </Typography>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <Snackbar open={open} setOpen={setOpen} error={error} type={errorType} />
        <Box component="form" onSubmit={handleSubmit(handleSignUp)} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              {/* First Name Input */}
              <Controller
                name="firstName"
                control={control}
                defaultValue=""
                rules={{ required: true }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    autoComplete="given-name"
                    name="firstName"
                    fullWidth
                    label="First Name*"
                    variant="outlined"
                    sx={{ borderRadius: '30px', marginBottom: '10px' }}
                    error={Boolean(errors.firstName?.message)}
                    helperText={errors.firstName?.message}
                  />
                )}
              />{' '}
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name="lastName"
                control={control}
                defaultValue=""
                rules={{ required: true }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    autoComplete="family-name"
                    label="Last Name*"
                    variant="outlined"
                    sx={{ borderRadius: '30px', marginBottom: '10px' }}
                    error={Boolean(errors.lastName?.message)}
                    helperText={errors.lastName?.message}
                  />
                )}
              />
            </Grid>
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
                    onCopy={handleCopy}
                    onPaste={handlePaste}
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
            <Grid item xs={12}>
              <Controller
                name="confirmPassword"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Renter your password*"
                    variant="outlined"
                    onCopy={handleCopy}
                    onPaste={handlePaste}
                    type={showPassword ? 'text' : 'password'}
                    fullWidth
                    sx={{ borderRadius: '30px', marginBottom: '10px' }}
                    error={Boolean(errors.confirmPassword?.message)}
                    helperText={errors.confirmPassword?.message}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                name="mobileNumber"
                control={control}
                defaultValue=""
                rules={{ required: true }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Phone Number (optional)"
                    fullWidth
                    variant="outlined"
                    sx={{ borderRadius: '30px', marginBottom: '10px' }}
                    error={Boolean(errors.mobileNumber?.message)}
                    helperText={errors.mobileNumber?.message}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                name="terms"
                control={control}
                defaultValue={false}
                rules={{ required: true }}
                render={({ field }) => (
                  <FormGroup>
                    <FormControlLabel
                      control={<Checkbox {...field} />}
                      label="I accept the terms and conditions"
                    />
                  </FormGroup>
                )}
              />
            </Grid>
            <Grid item xs={12}>
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

            <Grid item xs={12} justifyContent="center">
              <Button fullWidth size="large" type="submit">
                Register
              </Button>
            </Grid>
          </Grid>
        </Box>
        <CardActions sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <Typography variant="h6">OR</Typography>
          <Link to="/login">
            <Button size="large">Login</Button>
          </Link>
        </CardActions>
        <Typography
          variant="body1"
          component="div"
          gutterBottom
          sx={{ pl: '16px', fontSize: '14px', position: 'absolute', left: '65%', top: '35%' }}
        >
          Password should follow the pattern:
          <ul style={{ paddingLeft: '25px', fontSize: '14px' }}>
            <li>Must be atleast 8 characters long</li>
            <li> Must have atmost 24 characters</li>
            <li>Atleast one small case letter</li>
            <li>Atleast one upper case letter</li>
            <li>Must contain one of the symbols @,$,!,%,*,#,?,&</li>
          </ul>
        </Typography>
      </Box>
    </Container>
  );
};
export default SignUp;
