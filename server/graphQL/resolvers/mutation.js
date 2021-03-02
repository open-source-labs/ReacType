const { Tests } = require('../../models/reactypeModels');


module.exports = {

  addTest: async (parent, args) => {
    const resp = await Tests.create({ name: args.name });
    // console.log('Response >>> ', resp);
    if (resp) return { description: args.name };
    return { description: 'Error creating test' };
  },
  updateTest: async (parent, args, context, info) => {

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
