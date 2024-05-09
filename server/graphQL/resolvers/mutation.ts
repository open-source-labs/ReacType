const { ApolloServerErrorCode } = require('@apollo/server/errors');

import { Projects, Users, Comments } from '../../models/reactypeModels';

/*
 * resolvers are functions that handles graphQL requests. This file defines the logic for graphQL mutation requests
 * Link to Apollo Mutations:
 * https://www.apollographql.com/docs/apollo-server/data/resolvers/#defining-a-resolver
 */

const Project = {
  /**
   * Resolver function for adding likes to a project.
   *
   * @param {object} parent - The parent object.
   * @param {object} args - The arguments passed to the resolver.
   * @param {string} args.projId - The ID of the project to add likes to.
   * @param {number} args.likes - The number of likes to add.
   * @returns {Promise<object>} The updated project object.
   * @throws {ApolloServerErrorCode} Throws an error if the project is not found.
   */
  addLike: async (parent, { projId, likes }) => {
    const filter = { _id: projId };
    const update = { likes };
    const options = { new: true };
    const resp = await Projects.findOneAndUpdate(filter, update, options);
    if (resp) {
      return {
        name: resp.name,
        id: resp._id,
        userId: resp.userId,
        likes: resp.likes,
        published: resp.published,
        createdAt: resp.createdAt
      };
    }

    throw new ApolloServerErrorCode.BAD_USER_INPUT(
      'Project is not found. Please try another project ID',
      {
        argumentName: 'projId'
      }
    );
  },
  /**
   * Resolver function for making a copy of a project.
   *
   * @param {object} parent - The parent object.
   * @param {object} args - The arguments passed to the resolver.
   * @param {string} args.projId - The ID of the project to copy.
   * @param {string} args.userId - The ID of the user making the copy.
   * @param {string} args.username - The username of the user making the copy.
   * @returns {Promise<object>} The copied project object.
   * @throws {ApolloServerErrorCode} Throws an error if the project or user is not found.
   */
  makeCopy: async (parent, { projId, userId, username }) => {
    const filter = { _id: projId };
    const target = await Projects.findOne(filter);

    if (!target) {
      throw new ApolloServerErrorCode.BAD_USER_INPUT(
        'Project is not found. Please try another project ID',
        {
          argumentName: 'projId'
        }
      );
    }

    // check if user account exists
    const user = await Users.findOne({ _id: userId });

    if (user) {
      // make a copy with the passed in userId
      const copy = {
        name: target.name,
        project: target.project,
        userId,
        username
      };

      // Make a copy of the requested project
      const resp = await Projects.create(copy);
      if (resp) {
        return {
          name: resp.name,
          id: resp._id,
          userId: resp.userId,
          username: resp.username,
          likes: resp.likes,
          published: resp.published
        };
      }

      throw new ApolloServerErrorCode.BAD_USER_INPUT('Internal Server Error');
    }

    throw new ApolloServerErrorCode.BAD_USER_INPUT(
      'User is not found. Please try another user ID',
      {
        argumentName: 'userId'
      }
    );
  },
  /**
   * Resolver function for deleting a project.
   *
   * @param {object} parent - The parent object.
   * @param {object} args - The arguments passed to the resolver.
   * @param {string} args.projId - The ID of the project to delete.
   * @returns {Promise<object>} The deleted project object.
   * @throws {ApolloServerErrorCode} Throws an error if the project is not found.
   */
  deleteProject: async (parent, { projId }) => {
    const filter = { _id: projId };
    const options = { strict: true };
    const resp = await Projects.findOneAndDelete(filter, options);

    if (resp) {
      return {
        name: resp.name,
        id: resp._id,
        userId: resp.userId,
        likes: resp.likes,
        published: resp.published,
        createdAt: resp.createdAt
      };
    }

    throw new ApolloServerErrorCode.BAD_USER_INPUT(
      'Project is not found. Please try another project ID',
      {
        argumentName: 'projId'
      }
    );
  },
  /**
   * Resolver function for publishing/unpublishing a project.
   *
   * @param {object} parent - The parent object.
   * @param {object} args - The arguments passed to the resolver.
   * @param {string} args.projId - The ID of the project to publish/unpublish.
   * @param {boolean} args.published - The status indicating whether the project should be published or unpublished.
   * @returns {Promise<object>} The updated project object.
   * @throws {ApolloServerErrorCode} Throws an error if the project is not found.
   */
  publishProject: async (parent, { projId, published }) => {
    const filter = { _id: projId };
    const update = { published };
    const options = { new: true };
    const resp = await Projects.findOneAndUpdate(filter, update, options);
    if (resp) {
      return {
        name: resp.name,
        id: resp._id,
        userId: resp.userId,
        likes: resp.likes,
        published: resp.published,
        createdAt: resp.createdAt
      };
    }

    throw new ApolloServerErrorCode.BAD_USER_INPUT(
      'Project is not found. Please try another project ID',
      {
        argumentName: 'projId'
      }
    );
  },
  /**
   * Resolver function for adding a comment to a project.
   *
   * @param {object} parent - The parent object.
   * @param {object} args - The arguments passed to the resolver.
   * @param {string} args.projId - The ID of the project to add the comment to.
   * @param {string} args.comment - The comment text.
   * @param {string} args.username - The username of the user adding the comment.
   * @returns {Promise<object>} The updated project object with added comment.
   * @throws {ApolloServerErrorCode} Throws an error if the project is not found.
   */
  addComment: async (parent, { projId, comment, username }) => {
    const filter = { _id: projId };
    const options = { new: true };

    // data for the new Comments document
    const commentDocument = {
      projectId: projId,
      text: comment,
      username
    };
    // creating the new Comments document
    const newCommentDoc = await Comments.create(commentDocument);

    // target Projects document to add comment _id to
    const targetProject = await Projects.findOne(filter);
    // pushing the new Comments documents _id into the targetProject comments array
    targetProject.comments.push(newCommentDoc._id);
    // updating the target Projects document in the database
    const updatedProj = await Projects.findOneAndUpdate(
      filter,
      targetProject,
      options
    );
    if (updatedProj) {
      return {
        name: updatedProj.name,
        id: updatedProj._id,
        userId: updatedProj.userId,
        likes: updatedProj.likes,
        published: updatedProj.published,
        createdAt: updatedProj.createdAt,
        comments: updatedProj.comments
      };
    }

    throw new ApolloServerErrorCode.BAD_USER_INPUT(
      'Project cannot be found. Please try another project ID',
      {
        argumentName: 'projId'
      }
    );
  }
};

export default Project;
