import mongoose, { Document } from 'mongoose';

interface UserDocument extends Document {
  username?: string;
  githubId?: string;
  googleId?: string;
}

const userSchema = new mongoose.Schema<UserDocument>({
  username: { type: String },
  githubId: { type: String, unique: true },
  googleId: { type: String, unique: true }
});

const User = mongoose.model<UserDocument>('OauthUsers', userSchema);


export default User;
