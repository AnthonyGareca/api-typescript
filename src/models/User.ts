import { Schema, model } from 'mongoose';

const UserSchema = new Schema({
  name: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  demos: [{
    type: Schema.Types.ObjectId,
    ref: 'Demo',
  }]
});

export default model('User', UserSchema);