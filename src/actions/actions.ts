import { createComponent } from '../utils/reducer.util';
import { ComponentState, ChildState } from '../types/types';
import * as types from '../types/actionTypes';
import { loadState } from '../localStorage.js';
import createFiles from '../utils/createFiles.util';
import createApplicationUtil from '../utils/createApplication.util';

// ** ACTION CREATORS ** \\

// ! Redux thunk action
export const loadInitData = () => {
  return (dispatch: any) => {
    loadState().then((data: any) => dispatch({
      type: types.LOAD_INIT_DATA,
      payload: {
        data: data ? data.application : {},
      },
    }));
  }
};

// ** openExpansionPanel just takes the id of the current component and toggles the expanded value to either true or false
export const toggleExpansionPanel = (id: number) => ({
  type: types.TOGGLE_EXPANSION_PANEL,
  payload: { id },
});

export const changeImagePath = (imageSource: string) => ({
  type: types.CHANGE_IMAGE_SOURCE,
  payload: { imageSource },
})

// ! Redux thunk action
// ** addComponent waits for createComponent to dispatch then createComponent returns a promise with the new component object created
export const addComponent = (title: string) => {
  return (dispatch, getState) => {
    // ** grab state from our reducer to see how many components currently exist in our array
    const app = getState().application;
    const componentId = app.nextComponentId;
    const components = app.components;
    dispatch(createComponent(componentId, title, components))
    .then((component: ComponentState) => {
      // ** the dispatch to createComponent will return a promise. The promise will return either the new createdComponent.
      dispatch({ 
        type: types.ADD_COMPONENT, 
        payload: { component } 
      });
    })
    .catch((err: Error) => console.log(err));
  };
}

// ** updateComponent updates one of the values that can be updated from a component
export const updateComponent = (id: number, update: {}) => ({
  type: types.UPDATE_COMPONENT,
  payload: {
    id,
    ...update
  }
});

// ** deleteComponent deletes a component from our global state component array
export const deleteComponent = (id: number) => {
  return (dispatch, getState) => {
    const appComponents = getState().application.components;
    appComponents.forEach((parent: ComponentState) => {
      parent.children
      .filter((child: ChildState) => child.childComponentId === id)
      .forEach((child: ChildState) => {
        dispatch({
          type: types.DELETE_CHILD,
          payload: {
            parentId: parent.id,
            childId: child.childId,
            // calledFromDeleteComponent: true,
          },
        });
      });
    });
    dispatch({
      type: types.DELETE_COMPONENT,
      payload: { id }
    });
  }
};

export const addChild = (title: string, childType: string, HTMLInfo?: {}) => ({
  type: types.ADD_CHILD, 
  payload: { title, childType, HTMLInfo } 
});

export const deleteChild = (id: number) => { 
  return (dispatch, getState) => {
    const parent = getState().application.focusComponent;
    const child = parent.children.find((currentChild: ChildState) => id === currentChild.childComponentId);
    dispatch({
      type: types.DELETE_CHILD,
      payload: {
        parentId: parent.id,
        childId: child.childId,
      },
    });
  }
};

export const changeFocusComponent = ({ title }: { title: string }) => (dispatch: any) => {
  dispatch({ type: types.CHANGE_FOCUS_COMPONENT, payload: { title } });
};

// make sure childId is being sent in
export const changeFocusChild = ({ childId }: { childId: number }) => (dispatch: any) => {
  dispatch({ type: types.CHANGE_FOCUS_CHILD, payload: { childId } });
};

export const changeComponentFocusChild = ({
  componentId,
  childId,
}: {
componentId: number;
childId: number;
}) => (dispatch: any) => {
  dispatch({
    type: types.CHANGE_COMPONENT_FOCUS_CHILD,
    payload: { componentId, childId },
  });
};

export const exportFiles = ({
  components,
  path,
  appName,
  exportAppBool,
}: {
components: ComponentState;
path: string;
appName: string;
exportAppBool: boolean;
}) => (dispatch: any) => {
  // this dispatch sets the global state property 'loading' to true until the createFiles call resolves below
  dispatch({
    type: types.EXPORT_FILES,
  });

  createFiles(components, path, appName, exportAppBool)
    .then(dir => dispatch({
      type: types.EXPORT_FILES_SUCCESS,
      payload: { status: true, dir: dir[0] },
    }))
    .catch(err => dispatch({
      type: types.EXPORT_FILES_ERROR,
      payload: { status: true, err },
    }));
};

export const handleClose = () => ({
  type: types.HANDLE_CLOSE,
  payload: false,
});

export const handleTransform = (
  componentId: number,
  childId: number,
  {
    x, y, width, height,
  }: { x: number; y: number; width: number; height: number },
) => ({
  type: types.HANDLE_TRANSFORM,
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
components: ComponentState;
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
      type: types.CREATE_APPLICATION,
    });
    createApplicationUtil({
      path,
      appName,
      genOption,
      // exportAppBool
    })
      .then(() => {
        dispatch({
          type: types.CREATE_APPLICATION_SUCCESS,
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
        type: types.CREATE_APPLICATION_ERROR,
        payload: { status: true, err },
      }));
  }
};

// export const openExpansionPanel = (component: ComponentInt) => ({
//   type: OPEN_EXPANSION_PANEL,
//   payload: { component },
// });

export const deleteAllData = () => ({
  type: types.DELETE_ALL_DATA,
});

export const deleteProp = (propId: number) => (dispatch: any) => {
  dispatch({ type: types.DELETE_PROP, payload: propId });
};

export const addProp = (prop: PropInt) => ({
  type: types.ADD_PROP,
  payload: { ...prop },
});

export const updateHtmlAttr = ({ attr, value }: { attr: string; value: string }) => (
  dispatch: any,
) => {
  dispatch({
    type: types.UPDATE_HTML_ATTR,
    payload: { attr, value },
  });
};

export const updateChildrenSort = ({ newSortValues }: { newSortValues: any }) => (
  dispatch: any,
) => {
  dispatch({
    type: types.UPDATE_CHILDREN_SORT,
    payload: { newSortValues },
  });
};
