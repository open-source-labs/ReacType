const { UserInputError } = require('apollo-server-express');
const { Projects, Users, Comments } = require('../../models/reactypeModels');
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

  addComment: async (parent, { projId, comment, username }) => {
    const filter = { _id: projId };
    const options = { new: true };

    // data for the new Comments document
    const commentDocument = {
      projectId: projId,
      text: comment,
      username,
    };
    // creating the new Comments document
    const newCommentDoc = await Comments.create(commentDocument);

    // target Projects document to add comment _id to
    const targetProject = await Projects.findOne(filter);
    // pushing the new Comments documents _id into the targetProject comments array
    targetProject.comments.push(newCommentDoc._id);
    // updating the target Projects document in the database
    const updatedProj = await Projects.findOneAndUpdate(filter, targetProject, options)

    if (updatedProj) {
      return ({
        name: updatedProj.name,
        id: updatedProj._id,
        userId: updatedProj.userId,
        likes: updatedProj.likes,
        published: updatedProj.published,
        createdAt: updatedProj.createdAt,
      });
    }

    throw new UserInputError('Project cannot be found. Please try another project ID', {
      argumentName: 'projId',
    });
  },

};

module.exports = Project;
