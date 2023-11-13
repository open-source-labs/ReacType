import { Stack, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Button from '@mui/material/Button';
import React, { useState } from 'react';
import { RootState } from '../../redux/store';
import TextField from '@mui/material/TextField';
import { allCooperativeState } from '../../redux/reducers/slice/appStateSlice';
import {
  setRoomCode,
  setUserName,
  setUserJoined,
  setUserList
} from '../../redux/reducers/slice/roomSlice';
import { codePreviewCooperative } from '../../redux/reducers/slice/codePreviewSlice';
import config from '../../../../config';
import { cooperativeStyle } from '../../redux/reducers/slice/styleSlice';
// websocket front end starts here
import { io } from 'socket.io-client';
import store from '../../redux/store';
//pasted from navbarbuttons
import debounce from '../../../../node_modules/lodash/debounce.js';

// // for websockets
// // Part  - join room and room code functionality
let socket;
const { API_BASE_URL } = config;
const RoomsContainer = () => {
  const dispatch = useDispatch();
  const { roomCode, userName, userList, userJoined } = useSelector(
    (store: RootState) => ({
      roomCode: store.roomSlice.roomCode,
      userName: store.roomSlice.userName,
      userList: store.roomSlice.userList,
      //userIsHost: store.roomSlice.userIsHost,
      userJoined: store.roomSlice.userJoined
    })
  );
  // const [userIsHost, setUserIsHost] = useState(false);

  React.useEffect(() => {
    console.log('You Joined Room---:', roomCode);
  }, [roomCode]);

  // React.useEffect(() => {
  //   console.log('userName :', userName);
  //   if (userName === userList[0]) {
  //     console.log('setting isHost to true');
  //     setUserIsHost(true);
  //   } else {
  //     setUserIsHost(false);
  //   }
  //   console.log('User list updated:', userList);
  //   console.log('userList[0]-------', userList[0]);
  // }, [userList]);

  function initSocketConnection(roomCode) {
    if (socket) socket.disconnect(); //edge case check if socket connection existed

    socket = io(API_BASE_URL, {
      transports: ['websocket']
    });

    socket.on('connect', () => {
      console.log(`You Connected With Id: ${socket.id}`);
      console.log(`Your Nickname Is: ${userName}`);
      //passing current client nickname and room code to server
      socket.emit('joining', userName, roomCode);
    });

    //listening to back end for updating user list
    socket.on('updateUserList', (newUserList: object) => {
      dispatch(setUserList(Object.values(newUserList)));
    });
    //send state from host to room when new user joins
    socket.on('requesting state from host', () => {
      console.log('front received request for host state');
      console.log(`${userName} is host`);
      console.log('host is sending state');
      const newState = store.getState();
      socket.emit('state from host', JSON.stringify(newState));
    });
    // receiving the message from the back end
    socket.on('new state from back', (event) => {
      let currentStore: any = JSON.stringify(store.getState());
      if (currentStore !== event) {
        currentStore = JSON.parse(currentStore);
        event = JSON.parse(event);
        if (
          JSON.stringify(currentStore.appState) !==
          JSON.stringify(event.appState)
        ) {
          store.dispatch(allCooperativeState(event.appState));
        } else if (
          JSON.stringify(currentStore.codePreviewSlice) !==
          JSON.stringify(event.codePreviewCooperative)
        ) {
          store.dispatch(codePreviewCooperative(event.codePreviewCooperative));
        } else if (
          JSON.stringify(currentStore.styleSlice) !==
          JSON.stringify(event.styleSlice)
        ) {
          store.dispatch(cooperativeStyle(event.styleSlice));
        }
      }
    });
  }

  function handleUserEnteredRoom(roomCode) {
    initSocketConnection(roomCode);
  }

  let previousState = store.getState();
  // sending info to backend whenever the redux store changes
  const handleStoreChange = debounce(() => {
    const newState = store.getState();
    const roomCode = newState.roomSlice.roomCode;

    if (JSON.stringify(newState) !== JSON.stringify(previousState)) {
      // Send the current state to the server
      socket.emit('new state from front', JSON.stringify(newState), roomCode);
      previousState = newState;
    }
  }, 100);

  store.subscribe(() => {
    if (socket) {
      handleStoreChange();
    }
  });

  function joinRoom() {
    if (userList.length !== 0) dispatch(setUserList([])); //edge case check if userList not empty.
    handleUserEnteredRoom(roomCode); // Call handleUserEnteredRoom when joining a room
    dispatch(setRoomCode(roomCode));
    dispatch(setUserJoined(true)); //setting joined room to true for rendering leave room button
  }

  function leaveRoom() {
    if (socket) {
      socket.disconnect();
    } //disconnecting socket functionality
    dispatch(setRoomCode(''));
    dispatch(setUserName(''));
    dispatch(setUserList([]));
    dispatch(setUserJoined(false)); //setting joined to false so join button appear
  }

  //checking if both text field have any input (not including spaces)
  function checkInputField(...inputs) {
    let userName: string = inputs[0].trim();
    let roomCode: string = inputs[1].trim();
    return userName.length === 0 || roomCode.length === 0;
  }
  return (
    <div>
      <Stack //stack styling for container
        spacing={2}
        sx={{
          paddingTop: '20px',
          maxWidth: '230px',
          alignItems: 'center',
          margin: '0 auto 0 auto'
        }}
      >
        {' '}
        {/* live room display */}
        <Typography variant="h5" color={'white'}>
          Live Room: {roomCode}
        </Typography>
        {/*  Set up condition rendering depends on if user joined a room then render leave button if not render join button */}
        {userJoined ? (
          <>
            <Button
              variant="contained"
              onClick={() => leaveRoom()}
              sx={{
                backgroundColor: '#ffffff',
                color: '#000000',
                '&:hover': {
                  backgroundColor: '#C6C6C6',
                  borderColor: '#0062cc'
                }
              }}
            >
              {' '}
              Leave Room{' '}
            </Button>
            <Typography
              variant="body1"
              sx={{
                color: 'white' // Text color for the count
              }}
            >
              Users: {userList.length}
            </Typography>
            <Box
              sx={{
                width: '100%',
                height: 300,
                maxWidth: 200,
                bgcolor: '#333333',
                border: '3px solid white',
                borderRadius: '5%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center', // Center vertically
                alignItems: 'center',
                overflow: 'auto',
                color: 'white'
              }}
            >
              {/* User count inside the box */}
              <List sx={{ justifyContent: 'center', alignItems: 'flex-start' }}>
                {userList.map((user, index) => (
                  <ListItem key={index} sx={{ color: 'white' }}>
                    <ListItemText primary={user} />
                  </ListItem>
                ))}
              </List>
            </Box>
          </>
        ) : (
          //after joinning room
          <>
            <></>
            <TextField
              hiddenLabel={true}
              id="filled-hidden-label-small"
              variant="filled"
              size="small"
              value={userName}
              placeholder="Input Nickname"
              onChange={(e) => dispatch(setUserName(e.target.value))}
            />
            <TextField
              hiddenLabel={true}
              id="filled-hidden-label-small"
              variant="filled"
              size="small"
              value={roomCode}
              placeholder="Input Room Number"
              onChange={(e) => dispatch(setRoomCode(e.target.value))}
            />
            <Button
              variant="contained"
              disabled={checkInputField(userName, roomCode)}
              onClick={() => joinRoom()}
              sx={{
                backgroundColor: '#ffffff',
                color: '#000000',
                '&:hover': {
                  backgroundColor: '#C6C6C6',
                  borderColor: '#0062cc'
                }
              }}
            >
              {' '}
              Join Room{' '}
            </Button>
          </>
        )}
      </Stack>
    </div>
  );
};

export default RoomsContainer;
