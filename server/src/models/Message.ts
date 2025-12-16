import { Schema, model } from 'mongoose';

export interface IMessage {
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt: Date;
  updatedAt: Date;
}

const messageSchema = new Schema<IMessage>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 100,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    },
    subject: {
      type: String,
      required: true,
      trim: true,
      minlength: 5,
      maxlength: 200,
    },
    message: {
      type: String,
      required: true,
      trim: true,
      minlength: 10,
      maxlength: 5000,
    },
  },
  {
    timestamps: true,
  }
);

export const Message = model<IMessage>('Message', messageSchema);
