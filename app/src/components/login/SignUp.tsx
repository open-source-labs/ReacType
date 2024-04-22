import React, { useState } from 'react';
import {
  RouteComponentProps,
  Link as RouteLink,
  withRouter,
  useHistory
} from 'react-router-dom';
import { SigninDark } from '../../../../app/src/public/styles/theme';
import {
  StyledEngineProvider,
  Theme,
  ThemeProvider
} from '@mui/material/styles';
import {
  Box,
  Avatar,
  Button,
  Container,
  CssBaseline,
  Grid,
  TextField,
  Typography
} from '@mui/material';

import AssignmentIcon from '@mui/icons-material/Assignment';
import { LoginInt } from '../../interfaces/Interfaces';

import makeStyles from '@mui/styles/makeStyles';
import {
  newUserIsCreated,
  handleChange,
  resetErrorValidation,
  validateInputs,
  setErrorMessages
} from '../../helperFunctions/auth';

declare module '@mui/styles/defaultTheme' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface DefaultTheme extends Theme {}
}

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © ReacType '}
      {new Date().getFullYear()}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  avatar: {
    backgroundColor: 'white'
  },
  form: {
    width: '100%' // Fix IE 11 issue.
  },
  submit: {},
  root: {
    '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderColor: 'white'
    }
  }
}));

const SignUp: React.FC<LoginInt & RouteComponentProps> = () => {
  const classes = useStyles();
  const history = useHistory();
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVerify, setPasswordVerify] = useState('');
  const [invalidEmailMsg, setInvalidEmailMsg] = useState('');
  const [invalidUsernameMsg, setInvalidUserMsg] = useState('');
  const [invalidPasswordMsg, setInvalidPasswordMsg] = useState('');
  const [invalidVerifyPasswordMsg, setInvalidVerifyPasswordMsg] = useState('');
  const [invalidEmail, setInvalidEmail] = useState(false);
  const [invalidUsername, setInvalidUser] = useState(false);
  const [invalidPassword, setInvalidPassword] = useState(false);
  const [invalidVerifyPassword, setInvalidVerifyPassword] = useState(false);

  // define error setters to pass to resetErrorValidation function
  const errorSetters = {
    setInvalidEmail,
    setInvalidEmailMsg,
    setInvalidUser,
    setInvalidUserMsg,
    setInvalidPassword,
    setInvalidPasswordMsg,
    setInvalidVerifyPassword,
    setInvalidVerifyPasswordMsg
  };
  // define handle change setters to pass to handleChange function
  const handleChangeSetters = {
    setEmail,
    setUsername,
    setPassword,
    setPasswordVerify
  };

  /**
   * Handles input changes for form fields and updates the state accordingly.
   * This function delegates to the `handleChange` function, passing the event
   * and the `handleChangeSetters` for updating the specific state tied to the input fields.
   * @param {React.ChangeEvent<HTMLInputElement>} e - The event object that triggered the change.
   */
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    handleChange(e, handleChangeSetters);
  };

  /**
   * Handles the form submission for user registration. Prevents default form behavior,
   * validates user inputs, and attempts to register a new user. Redirects to home on success,
   * otherwise displays error messages based on the response.
   * @param {React.MouseEvent<HTMLButtonElement, MouseEvent>} e - The event object that triggered the submission.
   */
  const handleSignUp = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    resetErrorValidation(errorSetters); // Reset validation errors before a new signup attempt.
    const isValid = validateInputs({
      email,
      username,
      password,
      passwordVerify,
      errorSetters
    }); // Validate Inputs using Auth helper function

    if (!isValid) {
      console.log('Validation failed, account not created.');
      return;
    }
    try {
      const userCreated = await newUserIsCreated(username, email, password);
      if (userCreated === 'Success') {
        console.log('Account creation successful, redirecting...');
        history.push('/');
      } else {
        switch (userCreated) {
          case 'Email Taken':
            setErrorMessages('email', 'Email Taken', errorSetters);
            break;
          case 'Username Taken':
            setErrorMessages('username', 'Username Taken', errorSetters);
            break;
          default:
            console.log(
              'Signup failed: Unknown or unhandled error',
              userCreated
            );
        }
      }
    } catch (error) {
      console.error('Error during signup in handleSignUp:', error);
    }
  };

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={SigninDark}>
        <Container
          component="main"
          maxWidth="xs"
          sx={{
            marginTop: '10vh'
          }}
        >
          <CssBaseline />
          <div className={classes.paper}>
            <Avatar className={classes.avatar} sx={{ margin: '2vh' }}>
              <AssignmentIcon />
            </Avatar>
            <Typography
              component="h1"
              variant="h5"
              color="textPrimary"
              sx={{ marginBottom: '2rem' }}
            >
              Sign up
            </Typography>
            <form className={classes.form} noValidate>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    className={classes.root}
                    variant="outlined"
                    required
                    id="email"
                    label="Email"
                    name="email"
                    autoComplete="email"
                    value={email}
                    onChange={handleInputChange}
                    helperText={invalidEmailMsg}
                    error={invalidEmail}
                    sx={{ width: '100%' }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    className={classes.root}
                    variant="outlined"
                    required
                    id="username"
                    label="Username"
                    name="username"
                    autoComplete="username"
                    value={username}
                    onChange={handleInputChange}
                    helperText={invalidUsernameMsg}
                    error={invalidUsername}
                    sx={{ width: '100%' }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    className={classes.root}
                    variant="outlined"
                    required
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    value={password}
                    onChange={handleInputChange}
                    helperText={invalidPasswordMsg}
                    error={invalidPassword}
                    sx={{ width: '100%' }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    className={classes.root}
                    variant="outlined"
                    required
                    name="passwordVerify"
                    label="Verify Password"
                    type="password"
                    id="passwordVerify"
                    autoComplete="verify-password"
                    value={passwordVerify}
                    onChange={handleInputChange}
                    helperText={invalidVerifyPasswordMsg}
                    error={invalidVerifyPassword}
                    sx={{ width: '100%' }}
                  />
                </Grid>
              </Grid>
              <Typography
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  textAlign: 'center',
                  color: '#aaaaaa',
                  margin: '2rem',
                  padding: '0 4rem 0 0',
                  width: '100%'
                }}
              >
                <span>
                  By signing up, you agree to our
                  <span className="blue-accent-text">
                    {' '}
                    Terms , Privacy Policy
                  </span>{' '}
                  and <span className="blue-accent-text">
                    {' '}
                    Cookies Policy
                  </span>{' '}
                </span>
              </Typography>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick={(e) => handleSignUp(e)}
                sx={{
                  backgroundColor: '#2997ff',
                  marginBottom: '5px',
                  marginTop: '20px',
                  textTransform: 'none',
                  fontSize: '1rem',
                  '$:hover': {
                    cursor: 'pointer'
                  },
                  width: '100%'
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-person-add"
                  viewBox="0 0 16 16"
                  style={{ marginLeft: '5px' }}
                >
                  <path d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Zm.5-5v1h1a.5.5 0 0 1 0 1h-1v1a.5.5 0 0 1-1 0v-1h-1a.5.5 0 0 1 0-1h1v-1a.5.5 0 0 1 1 0Zm-2-6a3 3 0 1 1-6 0 3 3 0 0 1 6 0ZM8 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" />
                  <path d="M8.256 14a4.474 4.474 0 0 1-.229-1.004H3c.001-.246.154-.986.832-1.664C4.484 10.68 5.711 10 8 10c.26 0 .507.009.74.025.226-.341.496-.65.804-.918C9.077 9.038 8.564 9 8 9c-5 0-6 3-6 4s1 1 1 1h5.256Z" />
                </svg>
                Sign Up
              </Button>

              <RouteLink
                style={{ color: '#aaaaaa' }}
                to={`/login`}
                className="nav_link"
              >
                <span>
                  Already have an account?
                  <span className="blue-accent-text"> Log in</span>{' '}
                </span>
              </RouteLink>
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
