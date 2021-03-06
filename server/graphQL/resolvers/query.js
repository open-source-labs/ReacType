const { Tests, Projects } = require('../../models/reactypeModels');

// Link to Apollo Query Types:
// https://www.apollographql.com/docs/apollo-server/data/resolvers/#defining-a-resolver

const Test = {

  readTest: async (parent, args) => {
    const resp = await Tests.findOne({ _id: args.id });
    if (resp) return { description: resp.name, id: resp._id, likes: resp.likes };
    return { description: 'Error reading', id: '0', likes: '0' };
  },

  readAllTests: async () => {
    const resp = await Tests.find({});
    // console.log('resp', resp);
    if (resp) {
      return resp.map(elem => ({ description: elem.name, id: elem._id, likes: elem.likes }));
    }
    // TODO: Go back to this to see how to handle error later
    return [{ description: 'Error reading all tests', id: '0', likes: '0' }];
  },

};


const Project = {
  getProject: async (parent, { projId }) => {
    const resp = await Projects.findOne({ _id: projId });
    if (resp) {
      return ({
        name: resp.name,
        projId: resp._id,
        userId: resp.userId,
        likes: resp.likes,
      })}

    // TODO: Go back to this to see how to handle error later
    return { 
      name: 'Error',
      projId: 'Error',
      userId: 'Error',
      likes: -1,
    };
  },

  getAllProjects: async () => {
    const resp = await Projects.find({});
    if (resp) {
      return resp.map(proj => ({
        name: proj.name,
        projId: proj._id,
        userId: proj.userId,
        likes: proj.likes,
      }));
    }
    // TODO: Go back to this to see how to handle error later
    return [{ 
      name: 'Error',
      projId: 'Error',
      userId: 'Error',
      likes: -1,
    }];
  },

};

module.exports = {
  TestQuery: Test,
  ProjectQuery: Project,
};
