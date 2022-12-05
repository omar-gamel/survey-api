import mongoose from 'mongoose';
import autoIncrement from 'mongoose-auto-increment';

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  department: {
    type: String,
    required: true,
    enum: ['عام', 'علوم حاسب', 'نظم معلومات'],
  },
  classroom: {
    type: Number,
    required: true,
    enum: [1, 2, 3, 4],
  },
  semester: {
    type: Number,
    required: true,
    enum: [1, 2],
  },
  city: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
  },
  mobile: {
    type: Number,
    required: true,
  },
  admin: {
    type: Boolean,
    default: false,
  },
  isAnswered: [
    {
      type: Number,
      ref: 'subject',
    },
  ],
});

const MODEL_NAME = 'user';

userSchema.plugin(autoIncrement.plugin, {
  model: MODEL_NAME,
  startAt: 1,
});

export default mongoose.model(MODEL_NAME, userSchema);
