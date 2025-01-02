import React, { useState, useEffect } from 'react';
import { RootState } from '../../redux/store';
import makeStyles from '@mui/styles/makeStyles';
import { useSelector } from 'react-redux';
import {
  Box,
  Card,
  CardActions,
  CardContent,
  Button,
  Typography,
  Divider,
  Grid
} from '@mui/material';
import { ThemeProvider, Theme, StyledEngineProvider } from '@mui/material/styles';
import NavBar from '../components/top/NavBar';
import { theme1 } from '../public/styles/theme';


declare module '@mui/styles/defaultTheme' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface DefaultTheme extends Theme {}
}


const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
);

/**
 * The ProfileContainer
 *  component displays user-related information, such as the username and email,
 * fetched from the local storage. It also provides links to resources like React documentation,
 * MongoDB, and AWS SQL. The component is styled to fit a dark theme and includes several
 * informational sections separated by dividers.
 *
 * This component is a part of a larger application that seems to provide users with resources
 * to build and manage React applications, potentially integrating different databases and
 * services.
 *
 * @returns {JSX.Element} A styled card containing user information, resource links, and
 *                         descriptions of application capabilities.
 */
const ProfileContainer = (): JSX.Element => {
  const classes = useStyles();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    const storedUsername = window.localStorage.getItem('username');
    const storedEmail = window.localStorage.getItem('email');

    if (storedUsername) {
      setUsername(storedUsername);
    }

    if (storedUsername) {
      setEmail(storedEmail);
    }
  }, []);

  const lightTheme = theme1;

  return (<>
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={lightTheme}>
        <div>
          <NavBar />
        </div>
      </ThemeProvider>
    </StyledEngineProvider>
    <CardContent sx={{ textAlign: 'center' }}>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Typography
          variant="h5"
          component="div"
          sx={{ color: 'white', marginRight: '8px' }}
        >
          {'Hello, '}
        </Typography>
        <Typography variant="h5" component="div" sx={{ color: '#f88e16' }}>
          {`${username || ' Guest'}`}
        </Typography>
      </div>
      <Typography
        sx={{ mb: 1.5, marginTop: '7px' }}
        color="rgba(255, 255, 255, 0.7);"
      >
        Welcome to Reactype!
      </Typography>
      {email ? (
        <Typography variant="body2">
          Email:
          <br />
          {email}
        </Typography>
      ) : null}
    </CardContent>
    <div className={classes.gridContainer}>
      <Grid
        container
        spacing={3}
        sx={{ minWidth: 275, color: 'white', backgroundColor: '#1E2024' }}
      >
        {/* Card 1 */}
        {/* <Card> */}
        {/* BACK BUTTON
          <p
            onClick={() => window.history.back()}
            style={{
              position: 'absolute',
              right: '50px',
              border: '1px solid rgba(255, 255, 255, 0.7)',
              padding: '7px 10px'
            }}
          >
            X
          </p> */}

        <Divider />
        <Grid item xs={12} sm={6} md={4}>
          <CardContent>
            <Typography variant="h6" component="div" sx={{ color: 'white' }}>
              Apps
            </Typography>
            <Typography
              sx={{ mb: 1.5, marginTop: '8px' }}
              color="rgba(255, 255, 255, 0.7);
"
            >
              Create a web app or a native mobile app to build a custom
              internal tool for your business.
            </Typography>
          </CardContent>
        </Grid>

        <Divider sx={{ marginBottom: '16px' }} />
        <Grid item xs={12} sm={6} md={4}>
          <CardContent>
            <Typography variant="h6" component="div" sx={{ color: 'white' }}>
              Resources
            </Typography>
            <Typography
              sx={{ mb: 1.5, marginTop: '8px' }}
              color="rgba(255, 255, 255, 0.7);
"
            >
              Securely connect your data and display it inside of Reactype
              apps.
            </Typography>
          </CardContent>
          <CardActions>
            <Button
              size="small"
              sx={{
                color: '#f88e16',
                textTransform: 'capitalize',
                fontSize: '14px'
              }}
              href="https://react.dev/learn"
            >
              React docs
            </Button>
          </CardActions>
        </Grid>
        <Divider />
        <Grid item xs={12} sm={6} md={4}>
          <CardContent>
            <Typography variant="h6" component="div" sx={{ color: 'white' }}>
              Database
            </Typography>
            <Typography
              sx={{ mb: 1.5, marginTop: '8px' }}
              color="rgba(255, 255, 255, 0.7);
"
            >
              Easily store data in a free SQL database and power your Reactype
              app.
            </Typography>
          </CardContent>
          <CardActions>
            <Button
              size="small"
              sx={{
                color: '#f88e16',
                textTransform: 'capitalize',
                fontSize: '14px'
              }}
              href="https://www.mongodb.com/"
            >
              MongoDB
            </Button>
            <Button
              size="small"
              sx={{
                color: '#f88e16',
                textTransform: 'capitalize',
                fontSize: '14px'
              }}
              href="https://aws.amazon.com/what-is/sql/#:~:text=Structured%20query%20language%20(SQL)%20is,relationships%20between%20the%20data%20values."
            >
              AWS SQL
            </Button>
          </CardActions>
          <Divider />
          {/* </Card> */}
        </Grid>
      </Grid>
    </div>
  </>);
};

const useStyles = makeStyles({
  gridContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    // gap: '20px',
    padding: '20px'
  },
  panelWrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    flexGrow: 1,
    overflow: 'auto'
  },
  panelWrapperList: {
    minHeight: '120px'
  },
  lightThemeFontColor: {
    color: '#fff'
  },
  darkThemeFontColor: {
    color: '#fff'
  }
});

export default ProfileContainer;
