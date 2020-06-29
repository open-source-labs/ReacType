import { State, Action } from '../interfaces/interfacesNew';

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    // Add a new component type
    // add component to the component array and increment our counter for the componentId
    // TODO: parse through name to any white spaces and camel case the name
    case 'ADD COMPONENT': {
      // if nonString value or empty string is passed in, then don't modify the original state
      if (
        typeof action.payload.componentName !== 'string' ||
        action.payload.componentName === ''
      )
        return state;
      const newComponent = {
        id: state.nextComponentId,
        name: action.payload.componentName,
        nextChildId: 1,
        style: {},
        children: []
      };
      const components = [...state.components];
      components.push(newComponent);

      const rootComponents = [...state.rootComponents];
      if (action.payload.root) rootComponents.push(newComponent.id);

      const nextComponentId = state.nextComponentId + 1;
      return { ...state, components, rootComponents, nextComponentId };
    }
    // Add child to a given root component
    case 'ADD CHILD': {
      const { type, typeId }: { type: string; typeId: number } = action.payload;
      // the parent of the new child is whichever component that is currently focused on
      const parentId: number = state.canvasFocus.componentId;

      // if type or typeId is null then return state
      if (
        !['Component', 'HTML Element'].includes(type) ||
        typeof typeId !== 'number'
        // (parentId === typeId && type === 'Component')
      )
        return state;

      // if we are adding a component as a child, first check whether the parent component is already a child of that component
      // this check is important so that we don't create infinite loops between react components referencing each other as children
      // if the componentId doesn't exist, return the state
      if (type === 'Component') {
        const originalComponent = state.components.find(
          elem => elem.id === typeId
        );
        try {
          let existingParentChildRelationship = originalComponent.children.find(
            child => child.typeId === parentId && child.type === 'Component'
          );
          if (existingParentChildRelationship) return state;
        } catch (err) {
          return state;
        }
      }
      // add child to last position of array
      const components = [...state.components];
      const parent = components.find(elem => elem.id === parentId);
      parent.children.push({
        type,
        typeId,
        childId: parent.nextChildId,
        style: {},
        children: []
      });
      parent.nextChildId = parent.nextChildId + 1;
      return { ...state, components };
    }
    // Change the focus component and child
    case 'CHANGE FOCUS': {
      const {
        componentId,
        childId
      }: { componentId: number; childId: number | null } = action.payload;
      const canvasFocus = { ...state.canvasFocus, componentId, childId };
      return { ...state, canvasFocus };
    }
    default:
      return state;
  }
};

export default reducer;
