import { Button, Typography, Box } from '@mui/material';
import { NavLink } from 'react-router-dom';
import PreDefinedConfigurations from '../components/PreDefinedConfigurations/preDefinedConfigurations';

const LandingPage = () => (
  <Box sx={{ display: 'flex', flexDirection: 'column' }}>
    <Box
      sx={{
        paddingY: '40px',
        display: 'flex',
        background: '#ddd',
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'center',
      }}
    >
      <Typography variant="h1">FlexiProcessor</Typography>
      <Typography variant="h4">Single market place for custom CPU design</Typography>
      <NavLink to="/login" style={{ textDecoration: 'none' }}>
        <Button
          disableElevation
          variant="contained"
          color="info"
          size="large"
          sx={{ margin: '15px' }}
        >
          Customize your own
        </Button>
      </NavLink>
    </Box>
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
        margin: '40px',
      }}
    >
      <PreDefinedConfigurations />
    </Box>
  </Box>
);

export default LandingPage;
