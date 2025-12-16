import mongoose from 'mongoose';
import { env } from './env';

export const connectDb = async () => {
  try {
    await mongoose.connect(env.mongoUri);
    console.log('[DB] MongoDB connected successfully');
  } catch (err) {
    console.error('[DB] MongoDB connection failed:', err instanceof Error ? err.message : err);
    throw err;
  }
};
