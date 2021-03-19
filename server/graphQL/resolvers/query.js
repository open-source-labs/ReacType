const { UserInputError } = require('apollo-server-express');
const { Projects } = require('../../models/reactypeModels');
// Link to Apollo Query Types:
// https://www.apollographql.com/docs/apollo-server/data/resolvers/#defining-a-resolver


const Project = {
  getProject: async (parent, { projId }) => {
    const resp = await Projects.findOne({ _id: projId });
    // console.log('getProject return >>> ', resp);
    if (resp) {
      return ({
        name: resp.name,
        id: resp._id,
        userId: resp.userId,
        username: resp.username,
        likes: resp.likes,
        published: resp.published,
        createdAt: resp.createdAt,
        comments: resp.comments,
      });
    }

    // resp is null if nothing is found based on the project ID
    throw new UserInputError('Project is not found. Please try another project ID', {
      argumentName: 'projId',
    });
  },

  getAllProjects: async (parent, { userId }) => {
    let resp = await Projects.find({});
    // console.log('getAllProjects resp >>> ', resp);
    if (userId) {
      // use loosely equal for the callback because there are some discrepancy between the type of userId from the db vs from the mutation query
      resp = resp.filter(proj => proj.userId == userId);
      // if resp = [] after the filtering, this means the userId doesnt exisit in the database, throw error as follow
      if (resp.length === 0) {
        throw new UserInputError(`Project for userId: "${userId}". Please try another id`, {
          argumentName: 'userId',
        });
      }
    }

    if (resp) {
      return resp.map(proj => ({
        name: proj.name,
        id: proj._id,
        userId: proj.userId,
        username: proj.username,
        likes: proj.likes,
        published: proj.published,
        createdAt: proj.createdAt,
        comments: proj.comments,
      }));
    }

    // resp is null, return error message
    throw new UserInputError('Internal Server Error');
  },
};

module.exports = Project;
