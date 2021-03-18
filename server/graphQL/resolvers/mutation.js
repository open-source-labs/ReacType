const { UserInputError } = require('apollo-server-express');
const { Projects, Users } = require('../../models/reactypeModels');
/*
* resolvers are functions that handles graphQL requests. This file defines the logic for graphQL mutation requests
* Link to Apollo Mutations:
* https://www.apollographql.com/docs/apollo-server/data/resolvers/#defining-a-resolver
*/

const Project = {
  addLike: async (parent, { projId, likes }) => {
    const filter = { _id: projId };
    const update = { likes };
    const options = { new: true };
    const resp = await Projects.findOneAndUpdate(filter, update, options);
    if (resp) {
      console.log('resp, update', resp, update);
      return ({
        name: resp.name,
        id: resp._id,
        userId: resp.userId,
        likes: resp.likes,
        published: resp.published,
        createdAt: resp.createdAt,
      });
    }

    throw new UserInputError('Project is not found. Please try another project ID', {
      argumentName: 'projId',
    });
  },

  makeCopy: async (parent, { projId, userId, username }) => {
    const filter = { _id: projId };
    const target = await Projects.findOne(filter);

    if (!target) {
      throw new UserInputError('Project is not found. Please try another project ID', {
        argumentName: 'projId',
      });
    }

    // check if user account exists
    const user = await Users.findOne({ _id: userId });

    if (user) {
      // make a copy with the passed in userId
      const copy = {
        name: target.name,
        project: target.project,
        userId,
        username,
      };

      // Make a copy of the requested project
      const resp = await Projects.create(copy);
      if (resp) {
        return ({
          name: resp.name,
          id: resp._id,
          userId: resp.userId,
          username: resp.username,
          likes: resp.likes,
          published: resp.published,
        });
      }

      throw new UserInputError('Internal Server Error');
    }

    throw new UserInputError('User is not found. Please try another user ID', {
      argumentName: 'userId',
    });
  },

  deleteProject: async (parent, { projId }) => {
    const filter = { _id: projId };
    const options = { strict: true };
    const resp = await Projects.findOneAndDelete(filter, options);
  
    if (resp) {
      return ({
        name: resp.name,
        id: resp._id,
        userId: resp.userId,
        likes: resp.likes,
        published: resp.published,
        createdAt: resp.createdAt,
      });
    }

    throw new UserInputError('Project is not found. Please try another project ID', {
      argumentName: 'projId',
    });
  },

  publishProject: async (parent, { projId, published }) => {

    const filter = { _id: projId };
    const update = { published };
    const options = { new: true };
    const resp = await Projects.findOneAndUpdate(filter, update, options);
    if (resp) {
      return ({
        name: resp.name,
        id: resp._id,
        userId: resp.userId,
        likes: resp.likes,
        published: resp.published,
        createdAt: resp.createdAt,
      });
    }

    throw new UserInputError('Project is not found. Please try another project ID', {
      argumentName: 'projId',
    });
  },

};

module.exports = Project;
