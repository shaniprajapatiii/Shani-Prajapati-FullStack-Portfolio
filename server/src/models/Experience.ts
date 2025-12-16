import mongoose from 'mongoose';

const experienceSchema = new mongoose.Schema(
  {
    title: { type: String, required: true }, // Job title
    company: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date }, // Leave empty for current position
    location: { type: String },
    description: { type: String }, // Optional additional description
    responsibilities: [{ type: String }], // Array of responsibility bullets
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export type ExperienceDocument = mongoose.InferSchemaType<typeof experienceSchema> & { _id: mongoose.Types.ObjectId };

export const Experience = mongoose.model('Experience', experienceSchema);
