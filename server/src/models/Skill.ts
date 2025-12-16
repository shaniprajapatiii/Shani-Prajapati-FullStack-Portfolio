import mongoose from 'mongoose';

const skillSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    category: { type: String, required: true },
    icon: { type: String, required: true }, // Unicode emoji or icon identifier
    color: { type: String, required: true }, // CSS color variable (e.g., '#3178C6' for TypeScript)
    level: { type: String },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export type SkillDocument = mongoose.InferSchemaType<typeof skillSchema> & { _id: mongoose.Types.ObjectId };

export const Skill = mongoose.model('Skill', skillSchema);
