import { Stack, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Button from '@mui/material/Button';
import React from 'react';
import { RootState } from '../../redux/store';
import TextField from '@mui/material/TextField';
import {
  allCooperativeState,
  addChild,
  changeFocus,
  deleteChild,
  changePosition
} from '../../redux/reducers/slice/appStateSlice';
import {
  setRoomCode,
  setUserName,
  setUserJoined,
  setUserList
} from '../../redux/reducers/slice/roomSlice';
import { codePreviewCooperative } from '../../redux/reducers/slice/codePreviewSlice';
import { cooperativeStyle } from '../../redux/reducers/slice/styleSlice';
// websocket front end starts here
import store from '../../redux/store';
//pasted from navbarbuttons
import {
  initializeSocket,
  getSocket,
  disconnectSocket
} from '../../helperFunctions/socket';

//Websocket

const RoomsContainer = () => {
  const dispatch = useDispatch();
  //roomCode/userName for emiting to socket io, userList for displaying user List receiving from back end, userJoined fo conditional rendering between join and leave room.
  const roomCode = useSelector((store: RootState) => store.roomSlice.roomCode);
  const userName = useSelector((store: RootState) => store.roomSlice.userName);
  const userList = useSelector((store: RootState) => store.roomSlice.userList);
  const userJoined = useSelector(
    (store: RootState) => store.roomSlice.userJoined
  );

  function initSocketConnection(roomCode: string) {
    // if (socket) socket.disconnect(); //edge case: disconnect previous socket connection
    // // establishing client and server connection
    // socket = io(API_BASE_URL, {
    //   transports: ['websocket']
    // });

    initializeSocket();
    const socket = getSocket();
    // only create a new connection if not already connected
    if (socket) {
      //run everytime when a client connects to server
      socket.on('connect', () => {
        socket.emit('joining', userName, roomCode);
        console.log(`${userName} Joined room ${roomCode} from RoomsConatiner`);
      });

      //If you are the host: send current state to server when a new user joins
      socket.on('requesting state from host', (callback) => {
        const newState = store.getState(); //pull the current state
        callback(newState); //send it to backend server
      });

      //If you are the new user: receive the state from the host
      socket.on('server emitting state from host', (state, callback) => {
        //dispatching new state to change user current state
        console.log('state recieved by new join:', state);
        store.dispatch(allCooperativeState(state.appState));
        store.dispatch(codePreviewCooperative(state.codePreviewCooperative));
        store.dispatch(cooperativeStyle(state.styleSlice));
        callback({ status: 'confirmed' });
      });

      // update user list when there's a change: new join or leave the room
      socket.on('updateUserList', (newUserList) => {
        console.log('user list received from server');
        dispatch(setUserList(newUserList));
      });

      socket.on('child data from server', (childData: object) => {
        console.log('child data received by users', childData);
        store.dispatch(addChild(childData));
      });

      socket.on('focus data from server', (focusData: object) => {
        console.log('focus data received from server', focusData);
        store.dispatch(changeFocus(focusData));
      });

      socket.on('delete data from server', (deleteData: object) => {
        console.log('delete data received from server', deleteData);
        store.dispatch(deleteChild(deleteData));
      });

      socket.on(
        'item position data from server',
        (itemPositionData: object) => {
          console.log(
            'item position data received from server',
            itemPositionData
          );
          store.dispatch(changePosition(itemPositionData));
        }
      );
    }
  }

  function handleUserEnteredRoom(roomCode) {
    initSocketConnection(roomCode);
  }

  //joining room function
  function joinRoom() {
    //edge case: if userList is not empty, reset it to empty array
    if (userList.length !== 0) dispatch(setUserList([]));
    handleUserEnteredRoom(roomCode);

    dispatch(setRoomCode(roomCode)); //?
    dispatch(setUserJoined(true)); //setting joined room to true for rendering leave room button
  }

  function leaveRoom() {
    let socket = getSocket();
    if (socket) {
      socket.disconnect(); //disconnecting socket from server
      socket = null;
      console.log('user leaves the room');
    }
    //reset all state values
    dispatch(setRoomCode(''));
    dispatch(setUserName(''));
    dispatch(setUserList([]));
    dispatch(setUserJoined(false)); //setting joined to false so join room UI appear
  }

  //checking empty input field (not including spaces)
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
            {/* User count inside the box */}
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
                alignItems: 'center',
                overflow: 'auto',
                color: 'white'
              }}
            >
              {/* User count inside the box */}
              <List
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  padding: 0
                }}
              >
                {userList.map((user, index) => (
                  <ListItem
                    key={index}
                    sx={{
                      color: 'white',
                      textAlign: 'center',
                      width: '100%'
                    }}
                  >
                    <ListItemText
                      primary={`${index + 1}. ${
                        index === 0 ? `${user} (host)` : user
                      }`}
                    />
                  </ListItem>
                ))}
              </List>
            </Box>
          </>
        ) : (
          //after joinning room
          <>
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
              Join Room
            </Button>
            {/* Note about Collab room feature */}
          </>
        )}
        <Typography
          variant="body2"
          color="white" // Use a color that signifies a warning or important information
          sx={{
            marginTop: '10px',
            textAlign: 'center',
            fontStyle: 'italic',
            fontSize: 'smaller'
          }}
        >
          Note: For the best experience, limit Collab room occupancy to 3
          people. Exceeding this limit may lead to app performance issues.
        </Typography>
      </Stack>
    </div>
  );
};

export default RoomsContainer;
