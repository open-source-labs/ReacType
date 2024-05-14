/*
 @desc: defines Schemas for the app: sessionSchema (cookieId, created_at), userSchema
 (username, password, email), projectSchema (name, userId, project, created_at)

 @export: Users, Sessions, Projects (3 schemas)

 @important: URI to database is hidden in config.js file which is not available to future
 team. we recommend that your team will create a mongoDB database to test in
 dev mode. the real database is deployed in heroku
 */
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import { UserDocument } from '../interfaces';
dotenv.config();
const Schema = mongoose.Schema;

const isTest = process.env.NODE_ENV === 'test';

const mongoURI = process.env.MONGO_DB;
const URI =
  process.env.NODE_ENV === 'production' ? mongoURI : process.env.MONGO_DB;

const SALT_WORK_FACTOR = 10;
// connect to mongo db
if (!isTest) {
  mongoose
    .connect(URI, {
      // options for the connect method to parse the URI
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      // stop deprecation warning for findOneAndUpdate and findOneAndDelete queries
      useFindAndModify: false,
      // sets the name of the DB that our collections are part of
      dbName: 'reactype'
    })
    .then(() => console.log('Connected to Mongo DB.'))
    .catch((err) => console.log(err));
}

const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: false, unique: true },
  password: { type: String, required: true }
});

// mongoose middleware that will run before the save to
// collection happens (user gets put into database)

// cannot use arrow function here as context of 'this' is important
userSchema.pre<UserDocument>('save', function cb(next) {
  // within this context, 'this' refers to the document (new user) about to be saved,
  // in our case, it should have properties username, password, and projects array
  bcrypt.hash(this.password, SALT_WORK_FACTOR, (err, hash) => {
    if (err) {
      return next({
        log: `bcrypt password hashing error: ${err}`,
        message: { err: 'bcrypt hash error: check server logs for details.' }
      });
    }
    this.password = hash;
    return next();
  });
});

const commentsSchema = new Schema({
  username: { type: String, required: true },
  text: { type: String, required: true },
  projectId: { type: Schema.Types.ObjectId, required: true },
  createdAt: { type: Date, default: Date.now }
});

const sessionSchema = new Schema({
  cookieId: { type: String, required: true, unique: true },
  createdAt: { type: Date, default: Date.now }
});

const projectSchema = new Schema(
  {
    name: { type: String, required: true },
    forked: { type: String },
    likes: { type: Number, default: 0 },
    published: { type: Boolean, default: false },
    project: { type: Object, required: true },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'Users'
    },
    username: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    comments: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Comments'
      }
    ]
  },
  { minimize: false } //changed to false -dw
);

export const Users = mongoose.model('Users', userSchema);
export const Comments = mongoose.model('Comments', commentsSchema);
export const Sessions = mongoose.model('Sessions', sessionSchema);
export const Projects = mongoose.model('Projects', projectSchema);
