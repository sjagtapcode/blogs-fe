import { useState } from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import SearchIcon from '@mui/icons-material/Search';
import Tooltip from '@mui/material/Tooltip';
import { useAuth } from '../../contexts/auth';
import LoginPopup from './LoginPopup';
import SignUpPopup from './SignUpPopup';
import SignedUpSuccessPopup from './SignedUpSuccessPopup';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

const popups = {
  CLOSED: 0,
  LOGIN: 1,
  SIGNUP: 2,
  SIGNEDUP: 3,
};

export default function PrimarySearchAppBar() {
  const [popup, setPopup] = useState(popups.CLOSED);
  const { isAuthenticated, login, logout, user } = useAuth();
  const handleAuth = () => {
    if (isAuthenticated) {
      logout();
      return;
    }
    setPopup(popups.LOGIN);
  };
  const handleSignUp = () => {
    setPopup(popups.SIGNUP);
  };

  const handleSignedUp = () => {
    setPopup(popups.SIGNEDUP);
  };
  const handleLoginPopup = () => {
    setPopup(popups.LOGIN);
  };

  const handleClosePopup = () => setPopup('closed');

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position='static'>
        <Toolbar>
          <Typography
            variant='h6'
            noWrap
            component='div'
            sx={{ display: { xs: 'none', sm: 'block' } }}
          >
            Blogs
          </Typography>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder='Search…'
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search>
          <Box sx={{ flexGrow: 1 }} />
          <Typography
            variant='h6'
            noWrap
            component='div'
            sx={{ display: { xs: 'none', sm: 'block' }, mr: 1 }}
          >
            {isAuthenticated ? `Hello ${user?.name},` : `Welcome, login here`}
          </Typography>
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            <Tooltip title={isAuthenticated ? 'Logout' : 'Login'}>
              <Button
                size='large'
                edge='end'
                aria-haspopup='true'
                onClick={handleAuth}
                style={{
                  // backgroundColor: isAuthenticated ? '#ff0000' : '#00ff00',
                  backgroundColor: 'white',
                }}
              >
                {/* {isAuthenticated ? <LogoutIcon /> : <LoginIcon />} */}
                {isAuthenticated ? 'Logout' : 'Login'}
              </Button>
            </Tooltip>
          </Box>
        </Toolbar>
      </AppBar>
      <LoginPopup
        open={popup === popups.LOGIN}
        onClose={handleClosePopup}
        onLogin={login}
        handleSignUp={handleSignUp}
      />
      <SignUpPopup
        open={popup === popups.SIGNUP}
        onClose={handleClosePopup}
        onLogin={login}
        handleSignedUp={handleSignedUp}
      />
      <SignedUpSuccessPopup
        open={popup === popups.SIGNEDUP}
        onClose={handleClosePopup}
        handleLogin={handleLoginPopup}
      />
    </Box>
  );
}
