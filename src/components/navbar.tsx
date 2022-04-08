import * as React from 'react';
import { Avatar, Toolbar, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import { NavLink, Outlet } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { useSelector } from 'react-redux';
import Popup from 'reactjs-popup';
import Box from '@mui/material/Box';
import LogoutIcon from '@mui/icons-material/Logout';
import { RootState } from '../store/store';
import logo from '../images/FPblackLogo.png';
import { auth } from '../configs/firebase/firebaseConfig';

const Navbar: React.FC = () => {
  const name = useSelector((state: RootState) => state.login.name);
  const email = useSelector((state: RootState) => state.login.email);
  const emailVerified = useSelector((state: RootState) => state.login.emailVerified);

  const handleLogout = () => {
    signOut(auth);
  };
  return (
    <Box>
      <Toolbar
        sx={{
          backgroundColor: '#0288d1',
          display: 'flex',
          justifyContent: 'space-between',
          color: 'white',
        }}
      >
        <Box>
          <img src={logo} alt="logo" width="45px" />
        </Box>
        <Box sx={{ display: 'flex' }}>
          {email ? (
            <>
              <Popup trigger={<Avatar />} position="bottom center" nested>
                <span>
                  {name} <br />
                  {emailVerified ? 'Email Verified' : 'Email Not Verified'}
                  <Button>Profile Settings</Button>
                </span>
              </Popup>
              <Button onClick={handleLogout}>
                <LogoutIcon sx={{ color: 'white' }} />{' '}
              </Button>
            </>
          ) : (
            <>
              <NavLink to="/login" style={{ textDecoration: 'none' }}>
                <Typography
                  variant="h1"
                  component="div"
                  sx={{ color: '#fff', fontWeight: '700', fontSize: '22px', paddingRight: '50px' }}
                >
                  Login
                </Typography>
              </NavLink>
              <NavLink to="/register" style={{ textDecoration: 'none' }}>
                <Typography
                  variant="h1"
                  component="div"
                  sx={{ color: '#fff', fontWeight: '700', fontSize: '22px', paddingRight: '50px' }}
                >
                  Registration
                </Typography>
              </NavLink>
            </>
          )}
        </Box>
      </Toolbar>
      <Outlet />
    </Box>
  );
};

export default Navbar;
