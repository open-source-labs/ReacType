import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: { type: String },
  githubId: { type: String, unique: false },
  googleId: { type: String, unique: false }
});

const User = mongoose.model('OauthUsers', userSchema);

export default User;
