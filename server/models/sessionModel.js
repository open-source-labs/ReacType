// const mongoose = require('mongoose');
// const Schema = mongoose.Schema;

// // Mongo has an automatic document expiration service that we can use via the 'expires' property in the schema. This sets it so each session can only last an hour
// const sessionSchema = new Schema({
//   cookieId: { type: String, required: true, unique: true },
//   createdAt: { type: Date, expires: 3600, default: Date.now }
// });

// module.exports = mongoose.model('Sessions', sessionSchema);
