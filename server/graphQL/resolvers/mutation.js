const { Tests } = require('../../models/reactypeModels');
/*
* resolvers are functions that handles graphQL requests. This file defines the logic for graphQL mutation requests
* Link to Apollo Mutations:
* https://www.apollographql.com/docs/apollo-server/data/resolvers/#defining-a-resolver
*/


module.exports = {
  
  addTest: async (parent, args) => {
    const resp = await Tests.create({ name: args.name });
    console.log('Added test', resp);
    if (resp) return { description: args.name };
    return { description: 'Error creating test' };
  },

  updateTest: async (parent, args) => {
    const filter = { _id: args.id };
    const update = { name: args.name };
    const resp = await Tests.updateOne(filter, update);
    console.log('Updated database with', resp);
    if (resp) return { description: args.name };
    return { description: 'Error updating' };
  },

  deleteTest: async (parent, args) => {
    const filter = { _id: args.id };
    const resp = await Tests.deleteOne(filter);
    if (resp) return { description: args.name };
    return { description: 'Error updating' };
  },
};
