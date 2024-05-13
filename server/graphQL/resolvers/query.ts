// const { UserInputError } = require('apollo-server-express');//v3 syntax
const { ApolloServerErrorCode } = require('@apollo/server/errors');
// import { ApolloServerErrorCode } from '@apollo/server/errors'; // v4 syntax
// const ApolloServerErrorCode = require('@apollo/server/errors')
//now using ApolloServerErrorCode.BAD_USER_INPUT in place of UserInputError

import { Projects, Comments } from '../../models/reactypeModels';
// Link to Apollo Query Types:
// https://www.apollographql.com/docs/apollo-server/data/resolvers/#defining-a-resolver

const Project = {
  /**
   * Resolver function for retrieving a single project by ID.
   *
   * @param {object} parent - The parent object.
   * @param {object} args - The arguments passed to the resolver.
   * @param {string} args.projId - The ID of the project to retrieve.
   * @returns {Promise<object>} The project object.
   * @throws {ApolloServerErrorCode} Throws an error if the project is not found.
   */
  getProject: async (parent, { projId }) => {
    const resp = await Projects.findOne({ _id: projId });
    if (resp) {
      return {
        name: resp.name,
        id: resp._id,
        userId: resp.userId,
        username: resp.username,
        likes: resp.likes,
        published: resp.published,
        createdAt: resp.createdAt,
        comments: resp.comments // here we should retrive the comments from the Comments collection and  returns the array of comments here
      };
    }

    // resp is null if nothing is found based on the project ID
    throw new ApolloServerErrorCode.BAD_USER_INPUT(
      'Project is not found. Please try another project ID',
      {
        argumentName: 'projId'
      }
    );
  },
  /**
   * Resolver function for retrieving all projects, optionally filtered by user ID.
   *
   * @param {object} parent - The parent object.
   * @param {object} args - The arguments passed to the resolver.
   * @param {string} args.userId - (Optional) The ID of the user to filter projects by.
   * @returns {Promise<Array<object>>} An array of project objects.
   * @throws {ApolloServerErrorCode} Throws an error if the user or projects are not found.
   */
  getAllProjects: async (parent, { userId }) => {
    let resp = await Projects.find({});
    if (userId) {
      // use loosely equal for the callback because there are some discrepancy between the type of userId from the db vs from the mutation query
      resp = resp.filter((proj) => proj.userId == userId);
      // if resp = [] after the filtering, this means the userId doesnt exisit in the database, throw error as follow
      if (resp.length === 0) {
        throw new ApolloServerErrorCode.BAD_USER_INPUT(
          `Project for userId: "${userId}". Please try another id`,
          {
            argumentName: 'userId'
          }
        );
      }
    }

    const comCollection = await Comments.find({});

    if (resp) {
      return resp.map((proj) => ({
        name: proj.name,
        id: proj._id,
        userId: proj.userId,
        username: proj.username,
        likes: proj.likes,
        published: proj.published,
        createdAt: proj.createdAt,
        comments: comCollection.filter(
          (commentDoc) =>
            commentDoc.projectId.toString() === proj._id.toString()
        ) // here we should filter the comments for each proj and return it here
      }));
    }
    // resp is null, return error message
    throw new ApolloServerErrorCode.BAD_USER_INPUT('Internal Server Error');
  }
};

export default Project;
