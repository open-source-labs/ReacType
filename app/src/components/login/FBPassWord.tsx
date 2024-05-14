import React, { useState, MouseEvent } from 'react';
import { LoginInt } from '../../interfaces/Interfaces';
import { SigninDark } from '../../../../app/src/public/styles/theme';
import {
  Link as RouteLink,
  withRouter,
  RouteComponentProps,
  useHistory
} from 'react-router-dom';
import {
  validateInputs,
  handleChange,
  resetErrorValidation,
  updatePassword
} from '../../helperFunctions/auth';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import Container from '@mui/material/Container';
import AssignmentIcon from '@mui/icons-material/Assignment';
import {
  StyledEngineProvider,
  Theme,
  ThemeProvider
} from '@mui/material/styles';

declare module '@mui/styles/defaultTheme' {
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

const StyledPaper = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(8),
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center'
}));

const StyledAvatar = styled(Avatar)(({ theme }) => ({
  margin: theme.spacing(1),
  backgroundColor: 'white'
}));

const StyledForm = styled('form')(({ theme }) => ({
  width: '100%', // Fix IE 11 issue.
  marginTop: theme.spacing(3)
}));

const StyledButton = styled(Button)(({ theme }) => ({
  margin: theme.spacing(3, 0, 2)
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
    borderColor: '#white'
  }
}));

const FBPassWord: React.FC<LoginInt & RouteComponentProps> = () => {
  const history = useHistory();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVerify, setPasswordVerify] = useState('');

  const [invalidUserMsg, setInvalidUserMsg] = useState('');
  const [invalidPasswordMsg, setInvalidPasswordMsg] = useState('');
  const [invalidVerifyPasswordMsg, setInvalidVerifyPasswordMsg] = useState('');

  const [invalidUser, setInvalidUser] = useState(false);
  const [invalidPassword, setInvalidPassword] = useState(false);
  const [invalidVerifyPassword, setInvalidVerifyPassword] = useState(false);

  // define error setters to pass to resetErrorValidation function
  const errorSetters = {
    setInvalidUser,
    setInvalidUserMsg,
    setInvalidPassword,
    setInvalidPasswordMsg,
    setInvalidVerifyPassword,
    setInvalidVerifyPasswordMsg
  };
  // define handle change setters to pass to handleChange function
  const handleChangeSetters = {
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
   * Handles the form submission for user password change. Prevents the default form submission behavior,
   * resets any previous validation errors, and, if the input validation passes, attempts to update the user's password.
   * Upon successful password update, the user is redirected to the login page. If the update fails or validation fails,
   * appropriate error messages are displayed.
   * @param {React.FormEvent<HTMLFormElement>} e - The event object that triggered the form submission,
   *        used to prevent the default form behavior.
   * @returns {void} Nothing is returned from this function as it handles redirection or error display internally.
   */
  const handleUpdatePassword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    resetErrorValidation(errorSetters); // Reset validation errors before a new password update attempt.
    const isValid = validateInputs({
      username,
      password,
      passwordVerify,
      errorSetters
    }); // Validate Inputs using Auth helper function
    if (!isValid) {
      console.log('Validation failed, not updating password.');
      return;
    }
    try {
      const isUpdated = await updatePassword(username, password);
      console.log(isUpdated);
      if (isUpdated === 'Success') {
        history.push('/login');
      } else {
        console.log(
          'Update password failed: Unknown or unhandled error',
          isUpdated
        );
      }
    } catch (err) {
      console.error(
        'Error during password updating in handleUpdatePassword:',
        err
      );
    }
  };

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={SigninDark}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <StyledPaper>
            <StyledAvatar>
              <AssignmentIcon />
            </StyledAvatar>
            <Typography component="h1" variant="h5" color="textPrimary">
              Please Enter In Your New Password
            </Typography>
            <StyledForm noValidate onSubmit={handleUpdatePassword}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <StyledTextField
                    variant="outlined"
                    margin="normal"
                    required
                    id="username"
                    label="Username"
                    name="username"
                    autoComplete="username"
                    value={username}
                    onChange={handleInputChange}
                    helperText={invalidUserMsg}
                    error={invalidUser}
                    data-testid="username-input"
                    sx={{ width: '100%' }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <StyledTextField
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
                  <StyledTextField
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
              <StyledButton
                type="submit"
                color="primary"
                variant="contained"
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
                Update Password
              </StyledButton>
              <Grid container justifyContent="center">
                <Grid item>
                  <RouteLink
                    style={{ color: '#aaaaaa' }}
                    to={`/login`}
                    className="nav_link"
                  >
                    <span>
                      Already have an account?
                      <span className="blue-accent-text"> Sign In</span>
                    </span>
                  </RouteLink>
                </Grid>
              </Grid>
            </StyledForm>
          </StyledPaper>
          <Box mt={5}>
            <Copyright />
          </Box>
        </Container>
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

export default withRouter(FBPassWord);
