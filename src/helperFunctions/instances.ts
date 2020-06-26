import {
  NewComponentInstance,
  Context,
  ComponentInstance,
  PageInstanceTree
} from '../interfaces/InterfacesNew';

const componentInstanceGenerator = (newComponentData: NewComponentInstance) => {
  // if component already exists then reuse the existing ID
  //  otherwise, create a new ID
  // TODO: pull the nextId value from context
  console.log('In the new component generator');
  let id;
  if (newComponentData.newInstance) {
    id = Math.floor(1000 * Math.random());
  } else {
    id = newComponentData.id;
  }

  return {
    id,
    style: { border: '5px solid orange' },
    children: []
  };
};

// Find nested instance in instance object
const findInstance = (
  instanceId: Number,
  instanceStateOfPage: PageInstanceTree
) => {
  // if childId is null, return the root of the instance heirarchy
  if (instanceId === null) return instanceStateOfPage;
  // find the curent page
  let currentNode = instanceStateOfPage;
  // using a breadth first search to search through instance tree
  // We're going to keep track of the nodes we need to search through with an Array
  //  Initialize this array with the top level node
  const nodeArr = [instanceStateOfPage];

  // iterate through each node in the array as long as there are elements in the array
  while (nodeArr.length > 0) {
    // shift off the first value and assign to an element
    currentNode = nodeArr.shift();
    // check if that value has an id equal to the id you're searching for
    //  if so, return the object
    if (currentNode.id === instanceId) return currentNode;
    // add each of the objects children to the search array
    currentNode.children.forEach((node:ComponentInstance) => nodeArr.push(node));
  }
  // if no search is found return -1
  return -1;
};

// function searches through instance heirarchy of a given page from the root node and returns
const findParentInstance = (
  childId: Number,
  instanceStateOfPage: PageInstanceTree
) => {
  // search through children starting at the root node
  // using a breadth first search to search through instance tree
  const nodeArr = [instanceStateOfPage];
  // iterate through each node in the array as long as there are elements in the array
  while (nodeArr.length > 0) {
    // shift off the first value and assign to an element
    const currentNode = nodeArr.shift();
    // try to find id of childnode in children
    const childNode = currentNode.children.find(elem => elem.id === childId);
    // if child is found, return the currentNode
    if (childNode) return currentNode;
    // add each of the objects children to the search array
    currentNode.children.forEach(node => nodeArr.push(node));
  }
  // if no search is found return -1
  return -1;
};

const deleteInstance = (
  instanceId: Number,
  instanceStateOfPage: PageInstanceTree
) => {
  //   we need to find the parent object so we can delete the child from its original position
  const originalParent = findParentInstance(instanceId, instanceStateOfPage);

  //   if the parent of the component is found, then delete the component from the children array
  if (originalParent === -1) return -1;

  //   find index of the child we're trying to remove
  let targetChildIndex;
  originalParent.children.forEach((child, index) => {
    if (child.id === instanceId) targetChildIndex = index;
  });
  // remove the child from the array
  originalParent.children.splice(targetChildIndex, 1);
};

const updateInstance = (
  newParentId: Number,
  newComponentData: NewComponentInstance,
  instanceState: Context,
  pageNum: Number
) => {
  console.log('newComponentData ', newComponentData);
  console.log('IN UPDATE INSTANCE');
  // copy state so we don't directly mutate state
  const state = { ...instanceState };
  // find instance heirarchy of the current page
  const currentPage = state.pages.find(page => page.pageId === pageNum);
  // create a new instance object w/ newComponentData. This is the component we're going to add to state
  // if we're going to move an existing instance
  const newComponent = componentInstanceGenerator(
    newComponentData
  );
  //  if moved component isn't a new isntance, delete the original istance
  if (!newComponentData.newInstance)
    deleteInstance(newComponentData.id, currentPage);
  // find the new parent for the new component
  const newParent = findInstance(newParentId, currentPage);
  // add new component to its new parent
  newParent.children.push(newComponent);
  console.log('New state is ', state);
  // return updated state
  return state;
};

export { updateInstance };
