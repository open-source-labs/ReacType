const { UserInputError } = require('apollo-server-express');
const { Projects, Comments } = require('../../models/reactypeModels');
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
        comments: resp.comments, // here we should retrive the comments from the Comments collection and  returns the array of comments here 
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
    // The nested query in the Apollo Server example only works if we nest the comment document directly inside the project document, not applicable in to our
    // implementation. Since we can just retrieve the comments for each project using the projectId as the filter, we just need to retrive all the comments and parse them to each
    // project in the return statement
    
    // First step is to retrieve all the Comments using await and save them to an array
    // Next, in the map loop below, filter our the comments for each project
    // NOTE: There is probably better way to do this, but this will work for now and we can improve it later on
    const comCollection = await Comments.find({});
    // console.log('comCollection', comCollection);

    if (resp) {
      return resp.map(proj => ({
        name: proj.name,
        id: proj._id,
        userId: proj.userId,
        username: proj.username,
        likes: proj.likes,
        published: proj.published,
        createdAt: proj.createdAt,
        comments: comCollection.filter(commentDoc => commentDoc.projectId.toString() === proj._id.toString()), // here we should filter the comments for each proj and return it here 
      }));
    }
    // resp is null, return error message
    throw new UserInputError('Internal Server Error');
  },
};

module.exports = Project;
