const { Tests } = require('../../models/reactypeModels');

module.exports = {
  readTest: async (parent, args) => {
    const resp = await Tests.findOne({ _id: args.id });
    if (resp) return { description: args.id };
    return { description: 'Error reading' };
  },
  readAllTests: async () => {
    const resp = await Tests.find({});
    console.log('resp', resp);
    if (resp) {
      return resp.map(elem => ({ description: elem.name }));
    }
    // TODO: Go back to this to see how to handle error later
    return [{ description: 'Error reading all tests' }];
  },
};
