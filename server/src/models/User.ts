import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['admin'], default: 'admin' },
  },
  { timestamps: true }
);

export type UserDocument = mongoose.InferSchemaType<typeof userSchema> & { _id: mongoose.Types.ObjectId };

export const User = mongoose.model('User', userSchema);
