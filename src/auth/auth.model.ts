import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: String,
  email: { type: String, required: true },
  password: { type: String, required: true },
});

export interface User extends mongoose.Document {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}
