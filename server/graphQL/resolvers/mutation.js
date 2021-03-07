const { Tests, Projects } = require('../../models/reactypeModels');

/*
* resolvers are functions that handles graphQL requests. This file defines the logic for graphQL mutation requests
* Link to Apollo Mutations:
* https://www.apollographql.com/docs/apollo-server/data/resolvers/#defining-a-resolver
*/

const Test = {
  addTest: async (parent, args) => {
    const resp = await Tests.create({ name: args.name, likes: args.likes });
    console.log('Added test', resp);
    if (resp) return { description: resp.name, id: resp._id, likes: args.likes };
    return { description: 'Error creating test', id: 'unknown', likes: 0 };
  },

  updateTest: async (parent, args) => {
    // console.log('args >>> ', args);
    const filter = { _id: args.id };
    const update = { name: args.name, likes: args.likes };
    const options = { new: true };
    const resp = await Tests.findOneAndUpdate(filter, update, options);
  
    console.log('Updated database with', resp);
  
    if (resp) return { description: resp.name, id: resp._id, likes: resp.likes };
    return { description: 'Error updating', id: resp._id, likes: 0 };
  },

  deleteTest: async (parent, args) => {
    const filter = { _id: args.id };
    const resp = await Tests.deleteOne(filter);
    if (resp) return { description: resp.name, id: resp._id, likes: 0 };
    return { description: 'Error updating', likes: 0 };
  },
};


const Project = {
  addLike: async (parent, { projId, likes}) => {
    const filter = { _id: projId };
    const update = { likes };
    const options = { new: true };
    const resp = await Projects.findOneAndUpdate(filter, update, options);
    
    if (resp) {
      return ({
        name: resp.name,
        id: resp._id,
        userId: resp.userId,
        username: resp.username,
        likes: resp.likes,
      })} 

    // TODO: Go back to this to see how to handle error later
    return {
      name: 'Error',
      id: 'Error',
      userId: 'Error',
      username: 'Error',
      likes: -1,
    };
  },

  makeCopy: async (parent, { projId, userId, username }) => {
    const filter = { _id: projId };
    const target = await Projects.findOne(filter);
    
    // make a copy with the passed in userId
    // IMPORTANT: DO NOT CHANGE copy.name, it will create a nother copy of the document with the origional project name.
    const copy = {
      name: target.name,   
      project: target.project,
      userId,
      username,
    };
    
    // IMPORTANT: MUST MAKE A DEEP COPY OF target.project, otherwise, field 'style' is lost during the copy process. See 'minimize' option in projectSchema
    
    const resp = await Projects.create(copy);

    if (resp) {
      return ({
        name: resp.name,
        id: resp._id,
        userId: resp.userId,
        username: resp.username,
        likes: resp.likes,
      })}

    // TODO: Go back to this to see how to handle error later
    return {
      name: 'Error',
      id: 'Error',
      userId: 'Error',
      username: 'Error',
      likes: -1,
    };
  },
};

module.exports = {
  TestMutation: Test,
  ProjectMutation: Project,
};
