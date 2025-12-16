import mongoose from 'mongoose';

const linkSchema = new mongoose.Schema(
  {
    live: { type: String },
    repo: { type: String },
  },
  { _id: false }
);

const projectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    description: { type: String, required: true }, // Short description (1-2 sentences)
    fullDescription: { type: String, required: true }, // Extended description
    techStack: [{ type: String }], // Array of technologies used
    features: [{ type: String }], // Array of key features
    gradient: { type: String, required: true }, // CSS gradient for visual styling
    links: linkSchema,
    imageUrl: { type: String }, // Primary project image
    featured: { type: Boolean, default: false },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export type ProjectDocument = mongoose.InferSchemaType<typeof projectSchema> & { _id: mongoose.Types.ObjectId };

export const Project = mongoose.model('Project', projectSchema);
