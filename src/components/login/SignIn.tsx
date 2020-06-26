import React, { Component, useState } from 'react';
//import { connect } from 'react';
import { LoginInt } from '../../interfaces/Interfaces';
import { setLoginState } from '../../actions/actionCreators';
import { useSelector, useDispatch } from 'react-redux';
import { Link as RouteLink, withRouter, useHistory } from 'react-router-dom';

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
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { render } from 'enzyme';

/*
const mapStateToProps = (store: any) => ({
  username: store.credentials.username,
  password: store.credentials.password
});

const mapDispatchToProps = (dispatch: any) => ({
  setUsername: (username: string) => dispatch(setUsername(username)),
  setPassword: (password: string) => dispatch(setPassword(password))
  // login: (username: string, password: string) => dispatch(login(username, password)),
  // signup: (username: string, password: string) => dispatch(signup(username, password)),
});

interface LoginProps extends LoginInt {
  setUsername(username: string): void;
  setPassword(username: string): void;
}
*/

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

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}));

const SignIn: React.FC<LoginInt> = props => {
  const classes = useStyles();
  const s = useSelector(state => state);
  const dispatch = useDispatch();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const history = useHistory();

  console.log('state on load: ', s.auth)

  const handleChange = e => {
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

  const handleLogin = e => {
    console.log('click fired on handleLogin');
    console.log('state: ', s);
    dispatch(setLoginState());
    /*
    e.preventDefault();
    const body = JSON.stringify({
      username,
      password
    });
    fetch('http://localhost:8080/login', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body
    })
      .then(res => {
        return res.json();
      })
      .then(data => {
        if (typeof data === 'string') {
          alert(data);
        } else {
          props.history.push('/app');
          alert('Login successful!');
          //console.log('Data is', data);
        }
      })
      .catch(err => console.log(err));
    */
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <TextField
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
        />
        <TextField
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
        />
        <FormControlLabel
          control={<Checkbox value="remember" color="primary" />}
          label="Remember me"
        />

        <Button
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
          onClick={handleLogin}
        >
          Sign In
        </Button>

        <Grid container>
          <Grid item xs>
            <Link href="#" variant="body2">
              Forgot password?
            </Link>
          </Grid>
          <Grid item>
            <RouteLink to={`/signup`}>Don't have an account? Sign Up</RouteLink>
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
