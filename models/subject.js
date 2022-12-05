import mongoose from 'mongoose';
import autoIncrement from 'mongoose-auto-increment';

const subjectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  department: {
    type: String,
    required: true,
    enum: ['عام', 'علوم حاسب', 'نظم معلومات'],
  },
  instructor: {
    type: String,
    required: true,
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
});

const MODEL_NAME = 'subject';

subjectSchema.plugin(autoIncrement.plugin, {
  model: MODEL_NAME,
  startAt: 1,
});

export default mongoose.model(MODEL_NAME, subjectSchema);
