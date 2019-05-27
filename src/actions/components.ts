import {
  ComponentInt, ComponentsInt, PropInt, ChildInt,
} from '../utils/Interfaces.ts';

import {
  LOAD_INIT_DATA,
  ADD_COMPONENT,
  ADD_CHILD,
  DELETE_CHILD,
  DELETE_COMPONENT,
  CHANGE_FOCUS_COMPONENT,
  CHANGE_FOCUS_CHILD,
  CHANGE_COMPONENT_FOCUS_CHILD,
  EXPORT_FILES,
  EXPORT_FILES_SUCCESS,
  EXPORT_FILES_ERROR,
  HANDLE_CLOSE,
  HANDLE_TRANSFORM,
  CREATE_APPLICATION,
  CREATE_APPLICATION_SUCCESS,
  CREATE_APPLICATION_ERROR,
  OPEN_EXPANSION_PANEL,
  DELETE_PROP,
  ADD_PROP,
  DELETE_ALL_DATA,
  UPDATE_HTML_ATTR,
  UPDATE_CHILDREN_SORT,
} from '../actionTypes/index.js';

import { loadState } from '../localStorage';
import createFiles from '../utils/createFiles.util.ts';
import createApplicationUtil from '../utils/createApplication.util.ts';

export const loadInitData = () => (dispatch: any) => {
  loadState().then((data: any) => dispatch({
    type: LOAD_INIT_DATA,
    payload: {
      data: data ? data.workspace : {},
    },
  }));
};

export const addComponent = ({ title }: { title: string }) => (dispatch: any) => {
  dispatch({ type: ADD_COMPONENT, payload: { title } });
};

export const addChild = ({
  title,
  childType,
  HTMLInfo,
}: {
title: string;
childType: string;
HTMLInfo: object;
}) => (dispatch: any) => {
  dispatch({ type: ADD_CHILD, payload: { title, childType, HTMLInfo } });
};

export const deleteChild = ({}) => (dispatch: any) => {
  // with no payload, it will delete focusd child
  dispatch({ type: DELETE_CHILD, payload: {} });
};

export const deleteComponent = ({
  componentId,
  stateComponents,
}: {
componentId: number;
stateComponents: ComponentsInt;
}) => (dispatch: any) => {
  // find all places where the "to be deleted" is a child and do what u gotta do
  stateComponents.forEach((parent: ComponentInt) => {
    parent.childrenArray
      .filter((child: ChildInt) => child.childComponentId === componentId)
      .forEach((child: ChildInt) => {
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

  // change focus to app
  dispatch({ type: CHANGE_FOCUS_COMPONENT, payload: { title: 'App' } });
  // after taking care of the children delete the component
  dispatch({ type: DELETE_COMPONENT, payload: { componentId } });
};

export const changeFocusComponent = ({ title }: { title: string }) => (dispatch: any) => {
  dispatch({ type: CHANGE_FOCUS_COMPONENT, payload: { title } });
};

// make sure childId is being sent in
export const changeFocusChild = ({ childId }: { childId: number }) => (dispatch: any) => {
  dispatch({ type: CHANGE_FOCUS_CHILD, payload: { childId } });
};

export const changeComponentFocusChild = ({
  componentId,
  childId,
}: {
componentId: number;
childId: number;
}) => (dispatch: any) => {
  dispatch({
    type: CHANGE_COMPONENT_FOCUS_CHILD,
    payload: { componentId, childId },
  });
};

export const exportFiles = ({
  components,
  path,
  appName,
  exportAppBool,
}: {
components: ComponentsInt;
path: string;
appName: string;
exportAppBool: boolean;
}) => (dispatch: any) => {
  // this dispatch sets the global state property 'loading' to true until the createFiles call resolves below
  dispatch({
    type: EXPORT_FILES,
  });

  createFiles(components, path, appName, exportAppBool)
    .then(dir => dispatch({
      type: EXPORT_FILES_SUCCESS,
      payload: { status: true, dir: dir[0] },
    }))
    .catch(err => dispatch({
      type: EXPORT_FILES_ERROR,
      payload: { status: true, err },
    }));
};

export const handleClose = () => ({
  type: HANDLE_CLOSE,
  payload: false,
});

export const handleTransform = (
  componentId: number,
  childId: number,
  {
    x, y, width, height,
  }: { x: number; y: number; width: number; height: number },
) => ({
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

export const createApplication = ({
  path,
  components = [],
  genOption,
  appName = 'reactype_app',
  exportAppBool,
}: {
path: string;
components: ComponentsInt;
genOption: number;
appName: string;
exportAppBool: boolean;
}) => (dispatch: any) => {
  if (genOption === 0) {
    exportAppBool = false;
    dispatch(
      exportFiles({
        appName,
        path,
        components,
        exportAppBool,
      }),
    );
  } else if (genOption) {
    exportAppBool = true;
    dispatch({
      type: CREATE_APPLICATION,
    });
    createApplicationUtil({
      path,
      appName,
      genOption,
      // exportAppBool
    })
      .then(() => {
        dispatch({
          type: CREATE_APPLICATION_SUCCESS,
        });
        dispatch(
          exportFiles({
            appName,
            path,
            components,
            exportAppBool,
          }),
        );
      })
      .catch(err => dispatch({
        type: CREATE_APPLICATION_ERROR,
        payload: { status: true, err },
      }));
  }
};

export const openExpansionPanel = (component: ComponentInt) => ({
  type: OPEN_EXPANSION_PANEL,
  payload: { component },
});

export const deleteAllData = () => ({
  type: DELETE_ALL_DATA,
});

export const deleteProp = (propId: number) => (dispatch: any) => {
  dispatch({ type: DELETE_PROP, payload: propId });
};

export const addProp = (prop: PropInt) => ({
  type: ADD_PROP,
  payload: { ...prop },
});

export const updateHtmlAttr = ({ attr, value }: { attr: string; value: string }) => (
  dispatch: any,
) => {
  dispatch({
    type: UPDATE_HTML_ATTR,
    payload: { attr, value },
  });
};

export const updateChildrenSort = ({ newSortValues }: { newSortValues: any }) => (
  dispatch: any,
) => {
  dispatch({
    type: UPDATE_CHILDREN_SORT,
    payload: { newSortValues },
  });
};
