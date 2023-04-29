import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: { type: String },
  githubId: { type: String, unique: true },
  googleId: { type: String, unique: true }
});

const User = mongoose.model('OauthUsers', userSchema);

export default User;
