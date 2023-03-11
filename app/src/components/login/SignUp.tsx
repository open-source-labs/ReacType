import React, { useState } from 'react';
import { LoginInt } from '../../interfaces/Interfaces';
import {
  Link as RouteLink,
  withRouter,
  RouteComponentProps
} from 'react-router-dom';
import { newUserIsCreated } from '../../helperFunctions/auth';

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import makeStyles from '@mui/styles/makeStyles';
import Container from '@mui/material/Container';
import { element } from 'prop-types';
import AssignmentIcon from '@mui/icons-material/Assignment';
// Imports for redux toolkit usage
import { toggleDarkMode } from '../../redux/reducers/slice/darkModeSlice';
import { useSelector, useDispatch } from 'react-redux';

import { ThemeProvider, Theme, StyledEngineProvider } from '@mui/material/styles';
import { SigninDark, SigninLight } from '../../../../app/src/public/styles/theme';


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
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: '#3EC1AC'
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  },
  root: {
    '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderColor: '#3EC1AC'
    }
  }
}));

const SignUp: React.FC<LoginInt & RouteComponentProps> = props => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVerify, setPasswordVerify] = useState('');
  const [invalidEmailMsg, setInvalidEmailMsg] = useState('');
  const [invalidUsernameMsg, setInvalidUsernameMsg] = useState('');
  const [invalidPasswordMsg, setInvalidPasswordMsg] = useState('');
  const [invalidVerifyPasswordMsg, setInvalidVerifyPasswordMsg] = useState('');
  const [invalidEmail, setInvalidEmail] = useState(false);
  const [invalidUsername, setInvalidUsername] = useState(false);
  const [invalidPassword, setInvalidPassword] = useState(false);
  const [invalidVerifyPassword, setInvalidVerifyPassword] = useState(false);
  const isDarkMode = useSelector(store => store.darkMode.isDarkMode);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let inputVal = e.target.value;
    switch (e.target.name) {
      case 'email':
        setEmail(inputVal);
        break;
      case 'username':
        setUsername(inputVal);
        break;
      case 'password':
        setPassword(inputVal);
        break;
      case 'passwordVerify':
        setPasswordVerify(inputVal);
        break;
    }
  };

  const handleSignUp = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();

    // Reset Error Validation
    setInvalidEmailMsg('');
    setInvalidUsernameMsg('');
    setInvalidPasswordMsg('');
    setInvalidVerifyPasswordMsg('');
    setInvalidEmail(false);
    setInvalidUsername(false);
    setInvalidPassword(false);
    setInvalidVerifyPassword(false);

    if (email === '') {
      setInvalidEmail(true);
      setInvalidEmailMsg('No Email Entered');
      return;
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) {
      setInvalidEmail(true);
      setInvalidEmailMsg('Invalid Email Format');
      return;
    } else {
      setInvalidEmail(false);
    }

    if (username === '') {
      setInvalidUsername(true);
      setInvalidUsernameMsg('No Username Entered');
      return;
    } else if (!/^[\w\s-]{4,15}$/i.test(username)) {
      setInvalidUsername(true);
      setInvalidUsernameMsg('Must Be 4 - 15 Characters Long');
      return;
    } else if (!/^[\w-]+$/i.test(username)) {
      setInvalidUsername(true);
      setInvalidUsernameMsg('Cannot Contain Spaces or Special Characters');
      return;
    } else {
      setInvalidUsername(false);
    }

    if (password === '') {
      setInvalidPassword(true);
      setInvalidPasswordMsg('No Password Entered');
      return;
    } else if (password.length < 8) {
      setInvalidPassword(true);
      setInvalidPasswordMsg('Minimum 8 Characters');
      return;
    } else if (
      !/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/i.test(
        password
      )
    ) {
      setInvalidPassword(true);
      setInvalidPasswordMsg('Minimum 1 Letter, Number, and Special Character');
      return;
    } else if (password !== passwordVerify) {
      setInvalidPassword(true);
      setInvalidVerifyPassword(true);
      setInvalidPasswordMsg('Verification Failed');
      setInvalidVerifyPasswordMsg('Verification Failed');
      setPasswordVerify('');
      return;
    } else {
      setInvalidPassword(false);
    }

    if (password !== passwordVerify) {
      setInvalidPassword(true);
      setInvalidVerifyPassword(true);
      setInvalidPasswordMsg('Verification Failed');
      setInvalidVerifyPasswordMsg('Verification Failed');
      setPasswordVerify('');
      return;
    } else {
      setInvalidVerifyPassword(false);
    }

    newUserIsCreated(username, email, password).then(userCreated => {
      if (userCreated === 'Success') {
        props.history.push('/');
      } else {
        switch (userCreated) {
          case 'Email Taken':
            setInvalidEmail(true);
            setInvalidEmailMsg('Email Taken');
            break;
          case 'Username Taken':
            setInvalidUsername(true);
            setInvalidUsernameMsg('Username Taken');
            break;
        }
      }
    });
  };

     //NEW DARK MODE
     const handleDarkModeToggle = () => {
      dispatch(toggleDarkMode());
      // Add your logic to update the style and theme based on darkMode
      // !isDarkMode ? setStyle(null) : setStyle({ backgroundColor: '#21262c' });
      // props.setTheme(!isDarkMode);
    };

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
              onClick={handleDarkModeToggle}
            >
              {`Dark Mode: ${isDarkMode}`}
            </Button>
            <Avatar className={classes.avatar}>
              <AssignmentIcon />
            </Avatar>
            <Typography component="h1" variant="h5" color="textPrimary">
              Sign up
            </Typography>
            <form className={classes.form} noValidate>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    className={classes.root}
                    variant="outlined"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    autoFocus
                    value={email}
                    onChange={handleChange}
                    helperText={invalidEmailMsg}
                    error={invalidEmail}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    className={classes.root}
                    variant="outlined"
                    required
                    fullWidth
                    id="username"
                    label="Username"
                    name="username"
                    autoComplete="username"
                    value={username}
                    onChange={handleChange}
                    helperText={invalidUsernameMsg}
                    error={invalidUsername}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    className={classes.root}
                    variant="outlined"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    value={password}
                    onChange={handleChange}
                    helperText={invalidPasswordMsg}
                    error={invalidPassword}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    className={classes.root}
                    variant="outlined"
                    required
                    fullWidth
                    name="passwordVerify"
                    label="Verify Password"
                    type="password"
                    id="passwordVerify"
                    autoComplete="verify-password"
                    value={passwordVerify}
                    onChange={handleChange}
                    helperText={invalidVerifyPasswordMsg}
                    error={invalidVerifyPassword}
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick={e => handleSignUp(e)}
              >
                Sign Up
              </Button>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <RouteLink style={{color: isDarkMode ? '#aaaaaa' : 'black'}} to={`/login`} className="nav_link">
                    Already have an account? Sign In
                  </RouteLink>
                </Grid>
              </Grid>
            </form>
          </div>
          <Box mt={5}>
            <Copyright />
          </Box>
        </Container>
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

export default withRouter(SignUp);