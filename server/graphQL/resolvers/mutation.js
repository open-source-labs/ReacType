const { Tests } = require('../../models/reactypeModels');
/*
* resolvers are functions that handles graphQL requests. This file defines the logic for graphQL mutation requests
* Link to Apollo Mutations:
* https://www.apollographql.com/docs/apollo-server/data/resolvers/#defining-a-resolver
*/


module.exports = {
  
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
