import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true
    },
    category: {
      type: String,
      enum: ['Development', 'UI/UX'],
      required: true
    },
    description: {
      type: String,
      required: true,
      trim: true
    },
    image: {
      url: {
        type: String,
        default: ''
      },
      publicId: {
        type: String,
        default: ''
      }
    },
    technologies: {
      type: [String],
      default: []
    },
    githubUrl: {
      type: String,
      default: ''
    },
    liveUrl: {
      type: String,
      default: ''
    },
    figmaUrl: {
      type: String,
      default: ''
    },
    featured: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
);

export const Project = mongoose.model('Project', projectSchema);
