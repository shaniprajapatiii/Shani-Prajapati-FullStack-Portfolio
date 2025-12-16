import mongoose from 'mongoose';

const certificateSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    issuer: { type: String, required: true },
    issueDate: { type: Date, required: true },
    expiryDate: { type: Date },
    credentialId: { type: String },
    description: { type: String, required: true }, // Detailed description
    skills: [{ type: String }], // Array of skill names gained
    highlights: [{ type: String }], // Key highlights/achievements
    gradient: { type: String, required: true }, // CSS gradient (e.g., 'linear-gradient(135deg, #FF9900 0%, #232F3E 100%)')
    verificationUrl: { type: String }, // URL to verify credential
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export type CertificateDocument = mongoose.InferSchemaType<typeof certificateSchema> & { _id: mongoose.Types.ObjectId };

export const Certificate = mongoose.model('Certificate', certificateSchema);
