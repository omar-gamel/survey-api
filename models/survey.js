import mongoose from 'mongoose';
import autoIncrement from 'mongoose-auto-increment';

const surveySchema = new mongoose.Schema({
  subject: {
    type: Number,
    ref: 'subject',
    required: true,
  },
  answer: [
    {
      question: {
        type: Number,
        ref: 'question',
        required: true,
      },
      choose: {
        type: Number,
        required: true,
        enum: [1, 2, 3, 4, 5],
      },
    },
  ],
});

const MODEL_NAME = 'survey';

surveySchema.plugin(autoIncrement.plugin, {
  model: MODEL_NAME,
  startAt: 1,
});

export default mongoose.model(MODEL_NAME, surveySchema);
