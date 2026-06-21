import mongoose from 'mongoose';

const projectImageSchema = new mongoose.Schema(
  {
    fileName: {
      type: String,
      required: true,
      trim: true
    },
    contentType: {
      type: String,
      required: true,
      trim: true
    },
    data: {
      type: Buffer,
      required: true
    }
  },
  { timestamps: true }
);

export const ProjectImage = mongoose.model('ProjectImage', projectImageSchema);
