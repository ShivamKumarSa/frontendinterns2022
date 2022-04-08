const InputController = () => <div>InputController</div>;

export default InputController;

// import { Controller, Control, Field } from 'react-hook-form';
// import { TextField, TextFieldProps } from '@mui/material';

// type InputControllerTypes = TextFieldProps & {
//   control: Control;
// };

// const InputController: React.FC<InputControllerTypes> = ({ name, control, ...props }) => (
//   <Controller
//     name={name}
//     control={control}
//     defaultValue=""
//     render={({ field }) => (
//       <TextField
//         {...field}
//         autoComplete="given-name"
//         name="firstName"
//         fullWidth
//         label="First Name*"
//         variant="outlined"
//         sx={{ borderRadius: '30px', marginBottom: '10px' }}
//         error={Boolean(errors.firstName?.message)}
//         helperText={errors.firstName?.message}
//       />
//     )}
//   />
// );

// export default InputController;
