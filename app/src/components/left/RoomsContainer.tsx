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
import { BottomPanelObj } from '../../interfaces/Interfaces';
import {
  allCooperativeState,
  addChild,
  changeFocus,
  deleteChild,
  changePosition,
  resetState,
  updateStateUsed,
  updateUseContext,
  updateCss,
  updateAttributes,
  updateEvents,
  addComponent,
  addElement,
  addState,
  deleteState,
  addPassedInProps,
  deletePassedInProps,
  deleteElement,
  resetAllState,
  updateStylesheet
} from '../../redux/reducers/slice/appStateSlice';
import {
  addContext,
  deleteContext,
  addContextValues
} from '../../redux/reducers/slice/contextReducer';
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
  emitEvent,
  disconnectSocket
} from '../../helperFunctions/socket';
import {
  AddContextPayload,
  AddContextValuesPayload,
  DeleteContextPayload,
  addComponentToContext
} from '../../../src/redux/reducers/slice/contextReducer';

const RoomsContainer = () => {
  const dispatch = useDispatch();
  //roomCode/userName for emiting to socket io, userList for displaying user List receiving from back end, userJoined fo conditional rendering between join and leave room.
  const roomCode = useSelector((store: RootState) => store.roomSlice.roomCode);
  const userName = useSelector((store: RootState) => store.roomSlice.userName);
  const userList = useSelector((store: RootState) => store.roomSlice.userList);
  const userJoined = useSelector(
    (store: RootState) => store.roomSlice.userJoined
  );

  // for websockets - initialize socket connection passing in roomCode
  function initSocketConnection(roomCode: string) {
    // helper function to create socket connection
    initializeSocket();
    // assign socket to result of helper function to return socket created
    const socket = getSocket();
    // if socket was created correctly and exists
    if (socket) {
      //run everytime when a client connects to server
      socket.on('connect', () => {
        socket.emit('joining', userName, roomCode);
        // console.log(`${userName} Joined room ${roomCode} from RoomsContainer`);
      });

      //If you are the host: send current state to server when a new user joins
      socket.on('requesting state from host', (callback) => {
        const newState = store.getState(); //pull the current state
        callback(newState); //send it to backend server
      });

      //If you are the new user: receive the state from the host
      socket.on('server emitting state from host', (state, callback) => {
        //dispatching new state to change user current state
        // console.log('state received by new join:', state);
        store.dispatch(allCooperativeState(state.appState));
        store.dispatch(codePreviewCooperative(state.codePreviewCooperative));
        store.dispatch(cooperativeStyle(state.styleSlice));
        callback({ status: 'confirmed' });
      });

      // update user list when there's a change: new join or leave the room
      socket.on('updateUserList', (newUserList) => {
        //console.log('user list received from server');
        dispatch(setUserList(newUserList));
      });

      // dispatch add child to local state when element has been added by another user
      socket.on('child data from server', (childData: object) => {
        // console.log('child data received by users', childData);
        store.dispatch(addChild(childData));
      });

      // dispatch changeFocus to local state when another user has changed focus by selecting element on canvas
      socket.on('focus data from server', (focusData: object) => {
        // console.log('focus data received from server', focusData);
        store.dispatch(changeFocus(focusData));
      });

      // dispatch deleteChild to local state when another user has deleted an element
      socket.on('delete data from server', (deleteData: object) => {
        // console.log('delete data received from server', deleteData);
        store.dispatch(deleteChild(deleteData));
      });

      // dispatch delete element to local state when another user has deleted an element
      socket.on(
        'delete element data from server',
        (deleteElementData: object) => {
          // console.log('delete element data received from server', deleteElementData);
          store.dispatch(deleteElement(deleteElementData));
        }
      );

      // dispatch clear canvas action to local state when the host of the room has clear canvas
      socket.on('clear canvas from server', () => {
        store.dispatch(resetAllState());
      });

      // dispatch all updates to local state when another user has saved from Bottom Panel
      socket.on('update data from server', (updateData: BottomPanelObj) => {
        // console.log('update data received from server', updateData);
        store.dispatch(
          updateStateUsed({
            stateUsedObj: updateData.stateUsedObj,
            contextParam: updateData.contextParam
          })
        );
        store.dispatch(
          updateUseContext({
            useContextObj: updateData.useContextObj,
            contextParam: updateData.contextParam
          })
        );
        store.dispatch(
          updateCss({
            style: updateData.style,
            contextParam: updateData.contextParam
          })
        );
        store.dispatch(
          updateAttributes({
            attributes: updateData.attributes,
            contextParam: updateData.contextParam
          })
        );
        store.dispatch(
          updateEvents({
            events: updateData.events,
            contextParam: updateData.contextParam
          })
        );
      });

      // dispatch update style in local state when CSS panel is updated on their side
      socket.on('update css data from server', (cssData: object) => {
        // console.log('CSS data received from server', cssData);
        store.dispatch(updateStylesheet(cssData));
      });

      // dispatch new item position in local state when item position is changed by another user
      socket.on(
        'item position data from server',
        (itemPositionData: object) => {
          // console.log(
          //   'item position data received from server',
          //   itemPositionData
          // );
          store.dispatch(changePosition(itemPositionData));
        }
      );

      // dispatch addComponent to local state when new component is created by another user
      socket.on('new component data from server', (newComponent: object) => {
        store.dispatch(addComponent(newComponent));
      });

      // dispatch addElement to local state when new element is created by another user
      socket.on('new element data from server', (newElement: object) => {
        store.dispatch(addElement(newElement));
      });

      // dispatch addState to local state when component state has been changed by another user
      socket.on(
        'new component state data from server',
        (componentState: object) => {
          store.dispatch(addState(componentState));
        }
      );

      // dispatch deleteState to local state when component state has been deleted by another user
      socket.on(
        'delete component state data from server',
        (componentStateDelete: object) => {
          store.dispatch(deleteState(componentStateDelete));
        }
      );

      // dispatch addPassedInProps to local state when p.I.P have been added by another user
      socket.on(
        'new PassedInProps data from server',
        (passedInProps: object) => {
          store.dispatch(addPassedInProps(passedInProps));
        }
      );

      // dispatch deletePassedInProps to local state when p.I.P have been deleted by another user
      socket.on(
        'PassedInProps delete data from server',
        (passedInProps: object) => {
          store.dispatch(deletePassedInProps(passedInProps));
        }
      );

      // dispatch addContext to local state when context has been changed by another user
      socket.on('new context from server', (context: AddContextPayload) => {
        store.dispatch(addContext(context));
      });

      // dispatch addContextValues to local state when context values are added by another user
      socket.on(
        'new context value from server',
        (contextVal: AddContextValuesPayload) => {
          store.dispatch(addContextValues(contextVal));
        }
      );

      // dispatch deleteContext to local state when context is deleted by another user
      socket.on(
        'delete context data from server',
        (context: DeleteContextPayload) => {
          store.dispatch(deleteContext(context));
        }
      );

      // dispatch addComponentToContext to local state when context is assigned to component by another user
      socket.on('assign context data from server', (data) => {
        store.dispatch(
          addComponentToContext({
            context: data.context,
            component: data.component
          })
        );
        store.dispatch(
          deleteElement({ id: 'FAKE_ID', contextParam: data.contextParam })
        );
      });
    }
  }

  // invoked when join room in invoked passing in room code to init socket for that room
  function handleUserEnteredRoom(roomCode) {
    initSocketConnection(roomCode);
  }

  //joining room function
  function joinRoom() {
    //edge case: if userList is not empty, reset it to empty array
    if (userList.length !== 0) dispatch(setUserList([]));
    handleUserEnteredRoom(roomCode);
    dispatch(setRoomCode(roomCode)); // setting state to roomCode input
    dispatch(setUserJoined(true)); //setting joined room to true for rendering leave room button
  }

  // leave room function
  function leaveRoom() {
    let socket = getSocket(); // assigning socket var to get socket helper func
    if (socket) {
      socket.disconnect(); //disconnecting socket from server
      // console.log('user leaves the room');
    }
    //reset all state values
    dispatch(setRoomCode(''));
    dispatch(setUserName(''));
    dispatch(setUserList([]));
    dispatch(setUserJoined(false)); //setting joined to false so join room UI appear
    dispatch(resetState(''));
  }

  //checking empty input field (not including spaces)
  function checkInputField(...inputs) {
    let userName: string = inputs[0].trim();
    let roomCode: string = inputs[1].trim();
    return userName.length === 0 || roomCode.length === 0;
  }

  // handle keydown enter to join room rather than click if room code has been entered
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && e.target.id === 'filled-hidden-label-small') {
      e.preventDefault();
      joinRoom();
    }
  };

  // color array for live cursor tracking - if more than six users join, cursor defaults to black currently
  const userColors = [
    '#FC00BD',
    '#D0FC00',
    '#00DBFC',
    '#FD98B8',
    '#FCAA00',
    '#9267FF'
  ];

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
        <Typography variant="h5" color={'#f2fbf8'}>
          Live Room: {roomCode}
        </Typography>
        {/*  Set up condition rendering depends on if user joined a room then render leave button if not render join button */}
        {userJoined ? (
          <>
            <Typography
              variant="h6"
              color={userColors[userList.indexOf(userName)]}
            >
              Nickname: {userName}
            </Typography>
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
                border: '3px solid #f2fbf8',
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
                      textAlign: 'center',
                      width: '100%',
                      color: '#f2fbf8'
                    }}
                  >
                    <ListItemText
                      primary={`${index + 1}. ${
                        index === 0 ? `${user} (host)` : user
                      }`}
                      style={{ color: userColors[userList.indexOf(user)] }}
                    />
                  </ListItem>
                ))}
              </List>
            </Box>
            <Button
              variant="contained"
              onClick={() => leaveRoom()}
              sx={{
                backgroundColor: '#f2fbf8',
                color: '#092a26',
                '&:hover': {
                  backgroundColor: '#a5ead6',
                  borderColor: '#0062cc'
                }
              }}
            >
              {' '}
              Leave Room{' '}
            </Button>
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
              className="enterRoomInput"
              onKeyDown={handleKeyDown}
            />
            <Button
              variant="contained"
              disabled={checkInputField(userName, roomCode)}
              onClick={() => joinRoom()}
              sx={{
                backgroundColor: '#f2fbf8',
                color: '#092a26',
                '&:hover': {
                  backgroundColor: '#a5ead6',
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
          For optimal collaboration experience, limit to 6 users per room
        </Typography>
      </Stack>
    </div>
  );
};

export default RoomsContainer;
