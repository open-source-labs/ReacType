const mockObj = {
  //these user credentials were created via the signup page
  //once connecting to new mongo cluster, you must create new login credentials to test
  user: {
    username: 'test',
    email: 'test@gmail.com',
    password: 'password1!',
    userId: '645034c673b402f5eb58f9a1'
  },

  state: {
    name: 'test',
    isLoggedIn: false,
    components: [
      {
        id: 1,
        name: 'index',
        style: {},
        code: '<div>Drag in a component or HTML element into the canvas!</div>',
        children: []
      }
    ],
    projectType: 'Next.js',
    rootComponents: [1],
    canvasFocus: { componentId: 1, childId: null },
    nextComponentId: 2,
    nextChildId: 1
  },

  projectToSave: {
    name: 'super test project',
    userId: '60469fc6c435891422b3a84c',
    username: 'test',
    project: {
      name: 'test',
      isLoggedIn: false,
      components: [
        {
          id: 1,
          name: 'index',
          style: {},
          code: '<div>Drag in a component or HTML element into the canvas!</div>',
          children: []
        }
      ],
      projectType: 'Next.js',
      rootComponents: [1],
      canvasFocus: { componentId: 1, childId: null },
      nextComponentId: 2,
      nextChildId: 1
    }
  },

  GET_PROJECTS: `query GetAllProjects($userId: ID) {
    getAllProjects(userId: $userId) { 
      name 
      likes 
      id
      userId
      username
      published 
    }
  }`,

  ADD_LIKE: `mutation AddLike($projId: ID!, $likes: Int!) {
    addLike(projId: $projId, likes: $likes) 
    {
      id
      likes
    }
  }`,

  PUBLISH_PROJECT: `mutation Publish($projId: ID!, $published: Boolean!) {
    publishProject(projId: $projId, published: $published) 
    {
      id
      published
    }
  }`,

  MAKE_COPY: `mutation MakeCopy ($userId: ID!, $projId: ID!, $username: String!) {
    makeCopy(userId: $userId, projId: $projId, username: $username) 
    {
      id
      userId
      username
    }
  }`,

  DELETE_PROJECT: `mutation DeleteProject($projId: ID!) {
    deleteProject(projId: $projId) 
    {
      id
    }
  }`
};

export default mockObj;
