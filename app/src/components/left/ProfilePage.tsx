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

const ProfilePage = () => {
  const classes = useStyles();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    const storedUsername = window.localStorage.getItem('username');
    const storedEmail = window.localStorage.getItem('email');
    console.log(localStorage);

    if (storedUsername) {
      setUsername(storedUsername);
    }

    if (storedUsername) {
      setEmail(storedEmail);
    }
  }, []);

  return (
    <div sx={{ minWidth: 275, color: 'white' }}>
      <CardContent>
        <Typography variant="h5" component="div" sx={{ color: '#019cde' }}>
          {username ? username : null}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
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
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          Create a web app or a native mobile app to build a custom internal
          tool for your business.
        </Typography>
      </CardContent>

      <Divider />

      <CardContent>
        <Typography variant="h6" component="div" sx={{ color: 'white' }}>
          Resources
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          Securely connect your data and display it inside of Reactype apps.
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          size="small"
          sx={{ color: '#0671e3' }}
          href="https://legacy.reactjs.org/tutorial/tutorial.html"
        >
          React docs
        </Button>
      </CardActions>

      <Divider />

      <CardContent>
        <Typography variant="h6" component="div" sx={{ color: 'white' }}>
          Database
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          Easily store data in a free SQL database and power your Reactype app.
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          size="small"
          sx={{ color: '#0671e3' }}
          href="https://www.mongodb.com/"
        >
          MongoDB
        </Button>
        <Button
          size="small"
          sx={{ color: '#0671e3' }}
          href="https://aws.amazon.com/what-is/sql/#:~:text=Structured%20query%20language%20(SQL)%20is,relationships%20between%20the%20data%20values."
        >
          AWS SQL
        </Button>
      </CardActions>
      <Divider />
    </div>
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
