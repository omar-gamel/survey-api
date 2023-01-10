import  validateQuestion  from '../services/validation/question.js';
import Question from '../models/question.js';

export default {
  async create(req, res, next) {
    const { error } = validateQuestion(req.body);
    try {
      if (error)
        return res.send({ success: false, message: error.details[0].message });
      await new Question({
        name: req.body.name,
        type: req.body.type,
      }).save();
      res.send({ success: true, message: 'Question created!' });
    } catch (error) {
      next(error);
    }
  },
  async getById(req, res, next) {
    try {
      const question = await Question.findById(req.params.questionId);
      if (!question)
        return res.send({
          success: false,
          message: `question with id :${req.params.questionId} is not found`,
        });
      res.send(question);
    } catch (error) {
      next(error);
    }
  },
  async getAll(req, res, next) {
    try {
      const question = await Question.find();
      res.status(200).send(question);
    } catch (error) {
      next(error);
    }
  },
  async update(req, res, next) {
    const { questionId } = req.params;
    const { error } = validateQuestion(req.body);
    try {
      const question = await Question.findById(questionId);
      if (!question)
        return res.send({
          success: false,
          message: 'No question found with the provided id',
        });

      if (error)
        return res.send({ success: false, message: error.details[0].message });

      const updateQuestion = {
        name: req.body.name,
        type: req.body.type,
      };
      await Question.findByIdAndUpdate(questionId, updateQuestion, {
        new: true,
      });
      res.send({ success: true, message: 'Question updated!' });
    } catch (error) {
      next(error);
    }
  },
  async delete(req, res, next) {
    let { questionId } = req.params;
    try {
      const question = await Question.findById(questionId);
      if (!question)
        return res
          .status(400)
          .send({ success: false, message: 'Question not Found.' });

      await Question.deleteOne({ _id: questionId });
      res.status(200).send({ success: true, message: 'Question Deleted!' });
    } catch (error) {
      next(error);
    }
  },
  async getByType(req, res, next) {
    try {
      const questions = await Question.find({ type: req.params.questionType });
      if (!questions)
        return res.send({ success: false, message: 'Question not found.' });
      res.send(questions);
    } catch (error) {
      next(error);
    }
  },
};
