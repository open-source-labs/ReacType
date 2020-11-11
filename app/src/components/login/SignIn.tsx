import React, { useState, useEffect } from 'react';
import { LoginInt } from '../../interfaces/Interfaces';
import {
  Link as RouteLink,
  withRouter,
  RouteComponentProps
} from 'react-router-dom';
import { sessionIsCreated } from '../../helperFunctions/auth';
import FacebookLogin from "react-facebook-login";
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import GitHubIcon from '@material-ui/icons/GitHub';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { newUserIsCreated } from '../../helperFunctions/auth';
import randomPassword from '../../helperFunctions/randomPassword';

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
    alignItems: 'center',
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
    margin: theme.spacing(1, 0, 1),
    cursor: 'pointer'
  },
  root: {
    '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderColor: '#3EC1AC'
    }
  },
}));

const SignIn: React.FC<LoginInt & RouteComponentProps> = props => {
  const classes = useStyles();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [invalidUserMsg, setInvalidUserMsg] = useState('');
  const [invalidPassMsg, setInvalidPassMsg] = useState('');
  const [invalidUser, setInvalidUser] = useState(false);
  const [invalidPass, setInvalidPass] = useState(false);
  const FBAPPID = process.env.REACT_APP_FB_APP_ID;

  // this useEffect will check for cookies and set an item in localstorage for github Oauth session validation
  useEffect(() => {
    const githubCookie = setInterval(() => {
      window.api.setCookie();
      window.api.getCookie(cookie => {
        // if a cookie exists, set localstorage item with cookie data, clear interval, go back to '/' route to load app
        console.log(cookie);
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

  // for users not wanting to make an account and use as guest
  const handleLoginGuest = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    // generate "cookie" in localStorage for guest users
    window.localStorage.setItem('ssid', 'guest');
    props.history.push('/');
  };

  const responseFacebook = response => {
    if (response.accessToken) {
      newUserIsCreated(response.email, response.email, randomPassword())
        .then(userCreated => {
          if (userCreated === 'Success') {
            props.history.push('/');
          } else {
            sessionIsCreated(response.email, randomPassword(), true)
              .then(loginStatus => {
                if (loginStatus === 'Success') {
                  props.history.push('/');
                }
              })
          }
        });
      }
  }
  const classBtn = 'MuiButtonBase-root MuiButton-root MuiButton-contained makeStyles-submit-4 MuiButton-fullWidth';
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
        <Button
          fullWidth
          variant="contained"
          color="default"
          className={classes.submit}
          onClick={() => {
            window.api.github();
          }}
        >
        <GitHubIcon />
        </Button>
        <FacebookLogin
          appId={FBAPPID} 
          autoLoad={false}
          fields="name, email, picture"
          callback={responseFacebook}
          icon="fa-facebook-square"
          cssClass={'oauth-btn'}
          textButton=' Login with Facebook'
        />
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
