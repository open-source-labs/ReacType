import React, { Component, useState, useEffect } from 'react';
import { LoginInt } from '../../interfaces/Interfaces';
import {
  Link as RouteLink,
  withRouter,
  useHistory,
  RouteComponentProps
} from 'react-router-dom';
import { sessionIsCreated } from '../../helperFunctions/auth';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import GitHubIcon from '@material-ui/icons/GitHub';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { ipcRenderer } from 'electron';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © ReacType '}
      {/* <Link color="inherit" href="https://reactype.io/#fullCarousel">
        ReacType
      </Link>{' '} */}
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
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(1, 0, 1)
    // width: '240px',
    // height: '60px'
  },
  root: {
    // "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
    //   borderColor: "green"
    // },
    // "&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
    //   borderColor: "red"
    // },
    '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderColor: '#3EC1AC'
    }
  }
}));

const SignIn: React.FC<LoginInt & RouteComponentProps> = props => {
  const classes = useStyles();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [invalidUserMsg, setInvalidUserMsg] = useState('');
  const [invalidPassMsg, setInvalidPassMsg] = useState('');
  const [invalidUser, setInvalidUser] = useState(false);
  const [invalidPass, setInvalidPass] = useState(false);

  // this useEffect will check for cookies and set an item in localstorage for github Oauth session validation
  useEffect(() => {
    const githubCookie = setInterval(() => {
      window.api.setCookie();
      window.api.getCookie(cookie => {
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

  /*
    Response Options:
    Success
    Error
    No Username Input
    No Password Input
    Incorrect Password
    Invalid Username
  */
  const handleLogin = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    setInvalidUser(false);
    setInvalidUserMsg('');
    setInvalidPass(false);
    setInvalidPassMsg('');
    sessionIsCreated(username, password).then(loginStatus => {
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

  // for users not wanting to make an account and use as guest
  const handleLoginGuest = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    // generate "cookie" in localStorage for guest users
    window.localStorage.setItem('ssid', 'guest');
    props.history.push('/');
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
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
        {/* **TODO** Make 'Remember Me' functional
        <FormControlLabel
          control={<Checkbox value="remember" color="primary" />}
          label="Remember me"
        /> */}

        <Button
          fullWidth
          variant="contained"
          color="default"
          className={classes.submit}
          onClick={e => handleLogin(e)}
        >
          Sign In
        </Button>
        {/* Hiding github oauth button as it's still buggy and not fully working */}
        <Button
          fullWidth
          variant="contained"
          color="default"
          className={classes.submit}
          onClick={() => {
            // messages the main proces to open new window for github oauth
            console.log('open github');
            console.log(window.api);
            // ipcRenderer.send('github-oauth', 'getToken');
            window.api.github();
          }}
        >
          <GitHubIcon />
        </Button>

        <Button
          fullWidth
          variant="contained"
          color="default"
          className={classes.submit}
          onClick={e => handleLoginGuest(e)}
        >
          Continue as Guest
        </Button>

        <Grid container>
          <Grid item xs>
            <RouteLink to={`/signup`} className="nav_link">
              Forgot password?
            </RouteLink>
          </Grid>
          <Grid item>
            <RouteLink to={`/signup`} className="nav_link">
              Don't have an account? Sign Up
            </RouteLink>
          </Grid>
        </Grid>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
};

export default withRouter(SignIn);
