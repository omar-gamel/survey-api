import mongoose from 'mongoose';
import autoIncrement from 'mongoose-auto-increment';

const questionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  type: {
    type: Number,
    required: true,
    enum: [1, 2, 3, 4, 5],
  },
});

const MODEL_NAME = 'question';

questionSchema.plugin(autoIncrement.plugin, {
  model: MODEL_NAME,
  startAt: 1,
});

export default mongoose.model(MODEL_NAME, questionSchema);
