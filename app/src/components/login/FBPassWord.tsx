import React, {  useState, MouseEvent} from 'react';
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
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import makeStyles from '@mui/styles/makeStyles';
import Container from '@mui/material/Container';

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
  const [password, setPassword] = useState('');
  const [passwordVerify, setPasswordVerify] = useState('');

  const [invalidPasswordMsg, setInvalidPasswordMsg] = useState('');
  const [invalidVerifyPasswordMsg, setInvalidVerifyPasswordMsg] = useState('');

  const [invalidPassword, setInvalidPassword] = useState(false);
  const [invalidVerifyPassword, setInvalidVerifyPassword] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let inputVal = e.target.value;
    switch (e.target.name) {
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
    const email = props.location.state.email;
    // Reset Error Validation
    setInvalidPasswordMsg('');
    setInvalidVerifyPasswordMsg('');
    setInvalidPassword(false);
    setInvalidVerifyPassword(false);

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

    // get username and email from FB
    newUserIsCreated(email, email, password).then(userCreated => {
      if (userCreated === 'Success') {
        props.history.push('/');
      } else {
    
      }
    });
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <AssignmentIcon />
        </Avatar>
        <Typography component="h1" variant="h5" color="textPrimary">
          Please enter in your new password
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
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
            className={classes.submit}
            onClick={e => handleSignUp(e)}>
            Sign Up
          </Button>+
          <Grid container justifyContent="flex-end">
            <Grid item>
              <RouteLink to={`/login`} className="nav_link">
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
  );
};

export default withRouter(SignUp);
