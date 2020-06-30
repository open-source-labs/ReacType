// const mongoose = require('mongoose');
// require('dotenv').config();

// const Schema = mongoose.Schema;

// const userSchema = new Schema({
//   username: { type: String, required: true, unique: true },
//   email: { type: String, required: false, unique: true },
//   password: { type: String, required: true },
//   projects: Array
// });

// // salt will go through 10 rounds of hashing
// const SALT_WORK_FACTOR = 10;
// const bcrypt = require('bcryptjs');

// // mongoose middleware that will run before the save to collection happens (user gets put into database)
// // cannot use arrow function here as context of 'this' is important
// userSchema.pre('save', function(next) {
//   // within this context, 'this' refers to the document (new user) about to be saved, in our case, it should have properties username, password, and projects array
//   bcrypt.hash(this.password, SALT_WORK_FACTOR, (err, hash) => {
//     if (err) {
//       return next({
//         log: `bcrypt password hashing error: ${err}`,
//         message: {
//           err: `bcrypt hash error: check server logs for details`
//         }
//       });
//     }
//     this.password = hash;
//     return next();
//   });
// });

// module.exports = mongoose.model('Users', userSchema);
