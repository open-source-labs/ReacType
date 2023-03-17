import React, { useState, useCallback, useEffect } from 'react';
import { LoginInt } from '../../interfaces/Interfaces';
import {
  Link as RouteLink,
  RouteComponentProps
} from 'react-router-dom';
import { sessionIsCreated } from '../../helperFunctions/auth';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import makeStyles from '@mui/styles/makeStyles';
import Container from '@mui/material/Container';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { newUserIsCreated } from '../../helperFunctions/auth';
import randomPassword from '../../helperFunctions/randomPassword';
// Imports for redux toolkit usage
import { toggleDarkMode } from '../../redux/reducers/slice/darkModeSlice';
import { useSelector, useDispatch } from 'react-redux';

import { ThemeProvider, Theme, StyledEngineProvider } from '@mui/material/styles';
import { SigninDark, SigninLight } from '../../../../app/src/public/styles/theme';
import Brightness3Icon from '@mui/icons-material/Brightness3';
import Brightness5Icon from '@mui/icons-material/Brightness5';


declare module '@mui/styles/defaultTheme' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface DefaultTheme extends Theme {}
}

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © ReacType '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles(theme => ({
  paper: {
    // marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  avatar: {
    // margin: theme.spacing(1),
    backgroundColor: '#3EC1AC'
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    // marginTop: theme.spacing(1)
  },
  submit: {
    // margin: theme.spacing(1, 0, 1),
    cursor: 'pointer'
  },
  root: {
    '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderColor: '#3EC1AC'
    }
  }
}));

const SignIn: React.FC<LoginInt & RouteComponentProps> = props => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const isDarkMode = useSelector(store => store.darkMode.isDarkMode);

  const [invalidUserMsg, setInvalidUserMsg] = useState('');
  const [invalidPassMsg, setInvalidPassMsg] = useState('');
  const [invalidUser, setInvalidUser] = useState(false);
  const [invalidPass, setInvalidPass] = useState(false);

  useEffect(() => {
    const githubCookie = setInterval(() => {
      window.api?.setCookie();
      window.api?.getCookie(cookie => {
        // if a cookie exists, set localstorage item with cookie data, clear interval, go back to '/' route to load app
        if (cookie[0]) {
          window.localStorage.setItem('ssid', cookie[0].value);
          clearInterval(githubCookie);
          props.history.push('/');
          // if an item is already set in localstorage (guest option or normal login) clear interval needs to be run or else this will constantly run
        } else if (window.localStorage.getItem('ssid')) {
          clearInterval(githubCookie);
        }
      }); 
    }, 2000);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let inputVal = e.target.value;
  
    switch (e.target.name) {
      case 'username':
        setUsername(inputVal);
        break;
      case 'password':
        setPassword(inputVal);
        break;
    }
  };

  const handleLogin = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    setInvalidUser(false);
    setInvalidUserMsg('');
    setInvalidPass(false);
    setInvalidPassMsg('');
    sessionIsCreated(username, password, false).then(loginStatus => {
      if (loginStatus === 'Success') {
        props.history.push('/');
      } else {
        switch (loginStatus) {
          case 'No Username Input':
            setInvalidUser(true);
            setInvalidUserMsg(loginStatus);
            break;
          case 'No Password Input':
            setInvalidPass(true);
            setInvalidPassMsg(loginStatus);
            break;
          case 'Invalid Username':
            setInvalidUser(true);
            setInvalidUserMsg(loginStatus);
            break;
          case 'Incorrect Password':
            setInvalidPass(true);
            setInvalidPassMsg(loginStatus);
            break;
        }
      }
    });
  };

  const keyBindSignIn = useCallback((e) => {
    if(e.key === 'Enter') {
      e.preventDefault();
      document.getElementById('SignIn').click();
    }
  }, []);
  
  useEffect(() => {
    document.addEventListener('keydown', keyBindSignIn);
    return () => {
      document.removeEventListener('keydown', keyBindSignIn)
    }
  }, []);

  // for users not wanting to make an account and use as guest
  const handleLoginGuest = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    // generate "cookie" in localStorage for guest users
    window.localStorage.setItem('ssid', 'guest');
    props.history.push('/');
  };
  
  const handleGithubLogin = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
      e.preventDefault();
        // window.api.github();
        window.location.assign('http://localhost:5656/auth/github');
    }
  const responseFacebook = response => {
    if (response.accessToken) {
      newUserIsCreated(response.email, response.email, randomPassword()).then(
        userCreated => {
          if (userCreated === 'Success') {
            props.history.push('/');
          } else {
            sessionIsCreated(response.email, randomPassword(), true).then(
              loginStatus => {
                if (loginStatus === 'Success') {
                  props.history.push('/');
                }
              }
            );
          }
        }
      );
    }
  };

  //  NEW DARK MODE
   const handleDarkModeToggle = () => {
    dispatch(toggleDarkMode());
  };

  const classBtn =
    'MuiButtonBase-root MuiButton-root MuiButton-contained makeStyles-submit-4 MuiButton-fullWidth';

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={!isDarkMode ? SigninLight : SigninDark}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <div className={classes.paper}>
            <Button
              color="primary"
              style={{ 
                minWidth: '113.97px',
                top: 10,
                right: 20,
                position: "absolute"
              }}
              // variant="contained"
              endIcon={
                !isDarkMode ? <Brightness3Icon /> : <Brightness5Icon />
              }
              onClick={handleDarkModeToggle}
            >
              {isDarkMode ? `Light Mode`: `Dark Mode`}
            </Button>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5" color="textPrimary">
              Sign in
            </Typography>
            <TextField
              className={classes.root}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              autoFocus
              value={username}
              onChange={handleChange}
              helperText={invalidUserMsg}
              error={invalidUser}
            />
            <TextField
              className={classes.root}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={handleChange}
              helperText={invalidPassMsg}
              error={invalidPass}
            />

            <Button
              fullWidth
              id="SignIn"
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={e => handleLogin(e)}
            >
              Sign In
            </Button>
            <Button
              fullWidth
              id="SignInWithGithub"
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={e => handleGithubLogin(e)}
            >
              Sign In With Github
            </Button>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              id="SignInWithGoogle"
              onClick={(e)=>{
                e.preventDefault();
                window.location.assign('http://localhost:5656/auth/google');
              }}
            >
              Sign in With Google
            </Button>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={e => handleLoginGuest(e)}
            >
              Continue as Guest
            </Button>
            <Grid container>
              <Grid item xs>
                <RouteLink style={{color: isDarkMode ? '#aaaaaa' : 'black'}} to={`/signup`} className="nav_link">
                  Forgot password?
                </RouteLink>
              </Grid>
              <Grid item>
                <RouteLink style={{color: isDarkMode ? '#aaaaaa' : 'black'}} to={`/signup`} className="nav_link">
                  Don't have an account? Sign Up
                </RouteLink>
              </Grid>
            </Grid>
          </div>
          <Box mt={8}>
            <Copyright />
          </Box>
        </Container>
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

export default SignIn;
