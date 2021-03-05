const { Tests } = require('../../models/reactypeModels');

// Link to Apollo Query Types:
// https://www.apollographql.com/docs/apollo-server/data/resolvers/#defining-a-resolver

module.exports = {
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
