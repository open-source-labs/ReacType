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
  Divider
} from '@mui/material';

const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
);

/**
 * The ProfilePage component displays user-related information, such as the username and email,
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
const ProfilePage = (): JSX.Element => {
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

  return (
    <Card
      sx={{ minWidth: 275, color: 'white', backgroundColor: '#1E2024' }}
      variant="outlined"
    >
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Hello,
        </Typography>
        <Typography variant="h5" component="div" sx={{ color: '#0671E3' }}>
          {username ? username : 'Guest'}
        </Typography>
        <Typography sx={{ mb: 1.5, marginTop: '7px' }} color="text.secondary">
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

      <Divider />

      <CardContent>
        <Typography variant="h6" component="div" sx={{ color: 'white' }}>
          Apps
        </Typography>
        <Typography sx={{ mb: 1.5, marginTop: '8px' }} color="text.secondary">
          Create a web app or a native mobile app to build a custom internal
          tool for your business.
        </Typography>
      </CardContent>

      <Divider />

      <CardContent>
        <Typography variant="h6" component="div" sx={{ color: 'white' }}>
          Resources
        </Typography>
        <Typography sx={{ mb: 1.5, marginTop: '8px' }} color="text.secondary">
          Securely connect your data and display it inside of Reactype apps.
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          size="small"
          sx={{
            color: '#0671E3',
            textTransform: 'capitalize',
            fontSize: '14px'
          }}
          href="https://react.dev/learn"
        >
          React docs
        </Button>
      </CardActions>

      <Divider />

      <CardContent>
        <Typography variant="h6" component="div" sx={{ color: 'white' }}>
          Database
        </Typography>
        <Typography sx={{ mb: 1.5, marginTop: '8px' }} color="text.secondary">
          Easily store data in a free SQL database and power your Reactype app.
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          size="small"
          sx={{
            color: '#0671E3',
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
            color: '#0671E3',
            textTransform: 'capitalize',
            fontSize: '14px'
          }}
          href="https://aws.amazon.com/what-is/sql/#:~:text=Structured%20query%20language%20(SQL)%20is,relationships%20between%20the%20data%20values."
        >
          AWS SQL
        </Button>
      </CardActions>
      <Divider />
    </Card>
  );
};

const useStyles = makeStyles({
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

export default ProfilePage;
