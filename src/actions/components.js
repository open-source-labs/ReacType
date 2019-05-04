import {
  LOAD_INIT_DATA,
  ADD_COMPONENT,
  ADD_CHILD,
  DELETE_CHILD,
  UPDATE_COMPONENT,
  DELETE_COMPONENT,
  CHANGE_FOCUS_COMPONENT,
  CHANGE_FOCUS_CHILD,
  CHANGE_COMPONENT_FOCUS_CHILD,
  UPDATE_CHILDREN,
  REASSIGN_PARENT,
  SET_SELECTABLE_PARENTS,
  EXPORT_FILES,
  EXPORT_FILES_SUCCESS,
  EXPORT_FILES_ERROR,
  HANDLE_CLOSE,
  HANDLE_TRANSFORM,
  CREATE_APPLICATION,
  CREATE_APPLICATION_SUCCESS,
  CREATE_APPLICATION_ERROR,
  MOVE_TO_BOTTOM,
  MOVE_TO_TOP,
  OPEN_EXPANSION_PANEL,
  DELETE_PROP,
  ADD_PROP,
  DELETE_ALL_DATA,
  CHANGE_IMAGE_PATH,
  UPDATE_HTML_ATTR,
} from '../actionTypes/index';

import { loadState } from '../localStorage';

import createFiles from '../utils/createFiles.util';
import createApplicationUtil from '../utils/createApplication.util';

export const loadInitData = () => dispatch => {
  loadState().then(data =>
    dispatch({
      type: LOAD_INIT_DATA,
      payload: {
        data: data ? data.workspace : {},
      },
    }),
  );
};

// export const updateChildren = ({ parentIds, childIndex, childId }) => ({
//   type: UPDATE_CHILDREN,
//   payload: {
//     parentIds,
//     childIndex,
//     childId,
//   },
// });

// export const parentReassignment = ({ index, id, parentIds }) => ({
//   type: REASSIGN_PARENT,
//   payload: {
//     index,
//     id,
//     parentIds,
//   },
// });

export const addComponent = ({ title }) => dispatch => {
  dispatch({ type: ADD_COMPONENT, payload: { title } });
};

export const addChild = ({ title, childType, HTMLInfo }) => dispatch => {
  dispatch({ type: ADD_CHILD, payload: { title, childType, HTMLInfo } });
};

export const deleteChild = ({}) => dispatch => {
  // with no payload, it will delete focusd child
  dispatch({ type: DELETE_CHILD, payload: {} });
};

export const deleteComponent = ({ componentId, stateComponents }) => dispatch => {
  console.log('Hello from component.js delete component.componentId= ', componentId);

  // find all places where the "to be delted" is a child and do what u gotta do
  stateComponents.forEach(parent => {
    parent.childrenArray
      .filter(child => child.childComponentId == componentId)
      .forEach(child => {
        // console.log(`Should delete ${child.childId} from component id:${parent.id} ${parent.title}`)
        dispatch({
          type: DELETE_CHILD,
          payload: {
            parentId: parent.id,
            childId: child.childId,
            calledFromDeleteComponent: true,
          },
        });
      });
  });

  // change focus to APp
  dispatch({ type: CHANGE_FOCUS_COMPONENT, payload: { title: 'App' } });
  // after taking care of the children delete the component
  dispatch({ type: DELETE_COMPONENT, payload: { componentId } });
};

// export const updateComponent = ({
//   id,
//   index,
//   newParentId = null,
//   color = null,
//   stateful = null,
// }) => (dispatch) => {
//   dispatch({
//     type: UPDATE_COMPONENT,
//     payload: {
//       id,
//       index,
//       newParentId,
//       color,
//       stateful,
//     },
//   });

//   if (newParentId) {
//     dispatch(
//       updateChildren({
//         parentIds: [newParentId],
//         childId: id,
//         childIndex: index,
//       }),
//     );
//   }

//   dispatch({ type: SET_SELECTABLE_PARENTS });
// };

export const changeFocusComponent = ({ title }) => dispatch => {
  dispatch({ type: CHANGE_FOCUS_COMPONENT, payload: { title } });
};

// make sure childId is being sent in
export const changeFocusChild = ({ title, childId }) => dispatch => {
  dispatch({ type: CHANGE_FOCUS_CHILD, payload: { title, childId } });
};

export const changeComponentFocusChild = ({ componentId, childId }) => dispatch => {
  dispatch({
    type: CHANGE_COMPONENT_FOCUS_CHILD,
    payload: { componentId, childId },
  });
};

export const exportFiles = ({ components, path }) => dispatch => {
  dispatch({
    type: EXPORT_FILES,
  });

  createFiles(components, path)
    .then(dir =>
      dispatch({
        type: EXPORT_FILES_SUCCESS,
        payload: { status: true, dir: dir[0] },
      }),
    )
    .catch(err =>
      dispatch({
        type: EXPORT_FILES_ERROR,
        payload: { status: true, err },
      }),
    );
};

export const handleClose = () => ({
  type: HANDLE_CLOSE,
  payload: false,
});

export const handleTransform = (componentId, childId, { x, y, width, height }) => ({
  type: HANDLE_TRANSFORM,
  payload: {
    componentId,
    childId,
    x,
    y,
    width,
    height,
  },
});

export const createApplication = ({ path, components = [], genOption, appName = 'proto_app', repoUrl }) => dispatch => {
  if (genOption === 0) {
    dispatch(exportFiles({ path, components }));
  } else if (genOption) {
    dispatch({
      type: CREATE_APPLICATION,
    });
    createApplicationUtil({
      path,
      appName,
      genOption,
      repoUrl,
    })
      .then(() => {
        dispatch({
          type: CREATE_APPLICATION_SUCCESS,
        });
        dispatch(exportFiles({ path: `${path}/${appName}`, components }));
      })
      .catch(err =>
        dispatch({
          type: CREATE_APPLICATION_ERROR,
          payload: { status: true, err },
        }),
      );
  }
};

export const openExpansionPanel = component => ({
  type: OPEN_EXPANSION_PANEL,
  payload: { component },
});

// export const deleteAllData = () => ({
//   type: DELETE_ALL_DATA,
// });

export const deleteProp = propId => dispatch => {
  dispatch({ type: DELETE_PROP, payload: propId });
};

export const addProp = prop => ({
  type: ADD_PROP,
  payload: { ...prop },
});

export const updateHtmlAttr = ({ attr, value }) => dispatch => {
  dispatch({
    type: UPDATE_HTML_ATTR,
    payload: { attr, value },
  });
};
