import React, { Component, useState, useEffect } from 'react';
import { LoginInt } from '../../interfaces/Interfaces';
import { setLoginState } from '../../actions/actionCreators';
import { useSelector, useDispatch } from 'react-redux';
import { Link as RouteLink, withRouter, useHistory, RouteComponentProps } from 'react-router-dom';
import { newUserIsCreated } from '../../helperFunctions/auth';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        ReacType
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const SignUp: React.FC<LoginInt & RouteComponentProps> = props => {
  const classes = useStyles();

  const dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [invalidEmailMsg, setInvalidEmailMsg] = useState('');
  const [invalidUsernameMsg, setInvalidUsernameMsg] = useState(''); 
  const [invalidPasswordMsg, setInvalidPasswordMsg] = useState(''); 
  const [invalidEmail, setInvalidEmail] = useState(false); 
  const [invalidUsername, setInvalidUsername] = useState(false); 
  const [invalidPassword, setInvalidPassword] = useState(false);

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
    }
  };

  const handleSignUp = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    console.log('click fired on handleSignup');
    // console.log('email', email);
    // console.log('username', username);
    // console.log('password', password);

    // Reset Error Validation
    setInvalidEmailMsg('');
    setInvalidUsernameMsg(''); 
    setInvalidPasswordMsg(''); 
    setInvalidEmail(false); 
    setInvalidUsername(false); 
    setInvalidPassword(false);
    // setUsername('');
    // setEmail('');
    // setPassword('');

    // console.log('--email--', email);
    // console.log('username', username);
    // console.log('password', password);

    if(email === '') {
      console.log(1);
      setInvalidEmail(true);
      setInvalidEmailMsg('No Email Entered')
    } else if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) {
      console.log(2);
      setInvalidEmail(true);
      setInvalidEmailMsg('Invalid Email Format')
    }

    if(username === '') {
      console.log(1);
      setInvalidUsername(true);
      setInvalidUsernameMsg('No Username Entered');
    } else if(!/^[\w\s-]{4,15}$/i.test(username)) {
      console.log(2);
      setInvalidUsername(true);
      setInvalidUsernameMsg('Must Be 4 - 15 Characters Long');
    } else if(!/^[\w-]+$/i.test(username)) {
      console.log(3);
      setInvalidUsername(true);
      setInvalidUsernameMsg('Cannot Contain Spaces or Special Characters');
    }

    if(password === '') {
      setInvalidPassword(true);
      setInvalidPasswordMsg('No Password Entered');
    } else if(password.length < 8) {
      setInvalidPassword(true);
      setInvalidPasswordMsg('Minimum 8 Characters');
    } else if(!/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/i.test(password)) {
      setInvalidPassword(true);
      setInvalidPasswordMsg('Minimum 1 Letter, Number, and Special Character');
    }

    console.log('invalidUsername', invalidUsername); 
    console.log('invalidEmail', invalidEmail);
    console.log('invalidPassword', invalidPassword);
    if (!invalidUsername && !invalidEmail && !invalidPassword) {
      console.log('fired validation')
      newUserIsCreated(username, email, password).then(userCreated => {
        if (userCreated === 'Success') {
          console.log('user created')
          dispatch(setLoginState()); // changes login state to true
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
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
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
          <Grid container justify="flex-end">
            <Grid item>
              <RouteLink to={`/login`} className="nav_link">Already have an account? Sign In</RouteLink>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
}

export default withRouter(SignUp);
