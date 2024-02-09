import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { BottomPanelObj } from '../../interfaces/Interfaces';
import {
  allCooperativeState,
  addChild,
  changeFocus,
  deleteChild,
  changePosition,
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
import { setUserList } from '../../redux/reducers/slice/roomSlice';
import { codePreviewCooperative } from '../../redux/reducers/slice/codePreviewSlice';
import { cooperativeStyle } from '../../redux/reducers/slice/styleSlice';
import store from '../../redux/store';
import { initializeSocket, getSocket } from '../../helperFunctions/socket';
import {
  AddContextPayload,
  AddContextValuesPayload,
  DeleteContextPayload,
  addComponentToContext
} from '../../redux/reducers/slice/contextReducer';

export const initSocketConnection = (roomCode: string) => {
  const userName = useSelector((store: RootState) => store.roomSlice.userName);
  const dispatch = useDispatch();

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

    socket.on('item position data from server', (itemPositionData: object) => {
      store.dispatch(changePosition(itemPositionData));
    });

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

    socket.on('new PassedInProps data from server', (passedInProps: object) => {
      store.dispatch(addPassedInProps(passedInProps));
    });

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
