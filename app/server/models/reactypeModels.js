const mongoose = require('mongoose');
require('dotenv').config();

// connect to mongo db
mongoose
  .connect(process.env.MONGO_URI, {
    // options for the connect method to parse the URI
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    // stop deprecation warning for findOneAndUpdate and findOneAndDelete queries
    useFindAndModify: false,
    // sets the name of the DB that our collections are part of
    dbName: 'ReacType'
  })
  .then(() => console.log('Connected to Mongo DB.'))
  .catch(err => console.log(err));

const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: false, unique: true },
  password: { type: String, required: true }
});

// salt will go through 10 rounds of hashing
const SALT_WORK_FACTOR = 10;
const bcrypt = require('bcryptjs');

// mongoose middleware that will run before the save to collection happens (user gets put into database)
// cannot use arrow function here as context of 'this' is important
userSchema.pre('save', function(next) {
  // within this context, 'this' refers to the document (new user) about to be saved, in our case, it should have properties username, password, and projects array
  bcrypt.hash(this.password, SALT_WORK_FACTOR, (err, hash) => {
    if (err) {
      return next({
        log: `bcrypt password hashing error: ${err}`,
        message: {
          err: `bcrypt hash error: check server logs for details`
        }
      });
    }
    this.password = hash;
    return next();
  });
});

const sessionSchema = new Schema({
  cookieId: { type: String, required: true, unique: true },
  createdAt: { type: Date, expires: 3600, default: Date.now }
});

const projectSchema = new Schema({
  name: String,
  project: { type: Object, required: true },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'Users'
  },
  createdAt: { type: Date, default: Date.now }
});

const Users = mongoose.model('Users', userSchema);
const Sessions = mongoose.model('Sessions', sessionSchema);
const Projects = mongoose.model('Projects', projectSchema);

module.exports = { Users, Sessions, Projects };
