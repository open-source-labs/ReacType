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
  setUserList,
  setPassword
} from '../../redux/reducers/slice/roomSlice';
import { codePreviewCooperative } from '../../redux/reducers/slice/codePreviewSlice';
import { cooperativeStyle } from '../../redux/reducers/slice/styleSlice';
import store from '../../redux/store';
import { initializeSocket, getSocket } from '../../helperFunctions/socket';
import {
  AddContextPayload,
  AddContextValuesPayload,
  DeleteContextPayload,
  addComponentToContext
} from '../../../src/redux/reducers/slice/contextReducer';

const RoomsContainer = () => {
  const dispatch = useDispatch();
  const roomCode = useSelector((store: RootState) => store.roomSlice.roomCode);
  const userName = useSelector((store: RootState) => store.roomSlice.userName);
  const userList = useSelector((store: RootState) => store.roomSlice.userList);
  const roomPassword = useSelector(
    (store: RootState) => store.roomSlice.password
  );

  const userJoined = useSelector(
    (store: RootState) => store.roomSlice.userJoined
  );

  const initSocketConnection = (roomCode: string) => {
    initializeSocket();
    const socket = getSocket();
    if (socket) {
      socket.on('connect', () => {
        socket.emit('joining', userName, roomCode);
      });

      socket.on('requesting state from host', (callback) => {
        const newState = store.getState();
        callback(newState);
      });

      socket.on('server emitting state from host', (state, callback) => {
        store.dispatch(allCooperativeState(state.appState));
        store.dispatch(codePreviewCooperative(state.codePreviewCooperative));
        store.dispatch(cooperativeStyle(state.styleSlice));
        callback({ status: 'confirmed' });
      });

      socket.on('updateUserList', (newUserList) => {
        dispatch(setUserList(newUserList));
      });

      socket.on('child data from server', (childData: object) => {
        store.dispatch(addChild(childData));
      });

      socket.on('focus data from server', (focusData: object) => {
        store.dispatch(changeFocus(focusData));
      });

      socket.on('delete data from server', (deleteData: object) => {
        store.dispatch(deleteChild(deleteData));
      });

      socket.on(
        'delete element data from server',
        (deleteElementData: object) => {
          store.dispatch(deleteElement(deleteElementData));
        }
      );

      // dispatch clear canvas action to local state when the host of the room has clear canvas
      socket.on('clear canvas from server', () => {
        store.dispatch(resetAllState());
      });

      // dispatch all updates to local state when another user has saved from Bottom Panel
      socket.on('update data from server', (updateData: BottomPanelObj) => {
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

      socket.on('update css data from server', (cssData: object) => {
        store.dispatch(updateStylesheet(cssData));
      });

      socket.on(
        'item position data from server',
        (itemPositionData: object) => {
          store.dispatch(changePosition(itemPositionData));
        }
      );

      socket.on('new component data from server', (newComponent: object) => {
        store.dispatch(addComponent(newComponent));
      });

      socket.on('new element data from server', (newElement: object) => {
        store.dispatch(addElement(newElement));
      });

      socket.on(
        'new component state data from server',
        (componentState: object) => {
          store.dispatch(addState(componentState));
        }
      );

      socket.on(
        'delete component state data from server',
        (componentStateDelete: object) => {
          store.dispatch(deleteState(componentStateDelete));
        }
      );

      socket.on(
        'new PassedInProps data from server',
        (passedInProps: object) => {
          store.dispatch(addPassedInProps(passedInProps));
        }
      );

      socket.on(
        'PassedInProps delete data from server',
        (passedInProps: object) => {
          store.dispatch(deletePassedInProps(passedInProps));
        }
      );

      socket.on('new context from server', (context: AddContextPayload) => {
        store.dispatch(addContext(context));
      });

      socket.on(
        'new context value from server',
        (contextVal: AddContextValuesPayload) => {
          store.dispatch(addContextValues(contextVal));
        }
      );

      socket.on(
        'delete context data from server',
        (context: DeleteContextPayload) => {
          store.dispatch(deleteContext(context));
        }
      );

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
  };

  const handleUserEnteredRoom = (roomCode) => {
    initSocketConnection(roomCode);
  };

  const joinRoom = () => {
    if (userList.length !== 0) dispatch(setUserList([]));
    handleUserEnteredRoom(roomCode);
    dispatch(setRoomCode(roomCode));
    dispatch(setPassword(roomPassword));
    dispatch(setUserJoined(true));
  };

  const leaveRoom = () => {
    let socket = getSocket();
    if (socket) {
      socket.disconnect();
    }
    dispatch(setRoomCode(''));
    dispatch(setUserName(''));
    dispatch(setUserList([]));
    dispatch(setUserJoined(false));
    dispatch(resetState(''));
    dispatch(setPassword(''));
  };

  const checkInputField = (...inputs) => {
    let userName: string = inputs[0].trim();
    let roomCode: string = inputs[1].trim();
    return userName.length === 0 || roomCode.length === 0;
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && e.target.id === 'filled-hidden-label-small') {
      e.preventDefault();
      joinRoom();
    }
  };

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
      <Stack
        spacing={2}
        sx={{
          paddingTop: '20px',
          maxWidth: '230px',
          alignItems: 'center',
          margin: '0 auto 0 auto'
        }}
      >
        {' '}
        <Typography variant="h5" color={'#f2fbf8'}>
          Live Room: {roomCode}
        </Typography>
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
                color: 'white'
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
                border: '3px solid #f2fbf8',
                borderRadius: '5%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                overflow: 'auto',
                color: 'white'
              }}
            >
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
          <>
            <TextField
              fullWidth
              hiddenLabel={true}
              id="filled-hidden-label-small"
              variant="standard"
              size="small"
              value={userName}
              placeholder="Nickname"
              onChange={(e) => dispatch(setUserName(e.target.value))}
            />
            <TextField
              fullWidth
              hiddenLabel={true}
              id="filled-hidden-label-small"
              variant="standard"
              size="small"
              value={roomCode}
              placeholder="Room Name"
              onChange={(e) => dispatch(setRoomCode(e.target.value))}
              className="enterRoomInput"
              onKeyDown={handleKeyDown}
            />
            <TextField
              fullWidth
              hiddenLabel={true}
              id="filled-hidden-label-small"
              variant="standard"
              size="small"
              value={roomCode}
              placeholder="Password"
              onChange={(e) => dispatch(setPassword(e.target.value))}
              // className="enterRoomInput"
            />
            <Button
              variant="contained"
              disabled={checkInputField(userName, roomCode)}
              fullWidth
              onClick={() => joinRoom()}
              sx={{
                backgroundColor: '#e9e9e9',
                color: '#253b80',
                '&:hover': {
                  backgroundColor: '#99d7f2'
                }
              }}
            >
              Join Room
            </Button>
          </>
        )}
      </Stack>
    </div>
  );
};

export default RoomsContainer;
