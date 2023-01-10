import Survey from '../models/survey.js';

export default {
  async create(req, res, next) {
    try {
      const survey = await new Survey({
        subject: req.params.subjectId,
        answer: req.body.survey,
      }).save();
      res.send({ success: true, message: 'Question created!', survey: survey });
    } catch (error) {
      next(error);
    }
  },
  async getBySubjectId(req, res, next) {
    try {
      const survey = await Survey.find({ subject: req.params.subjectId });
      if (!survey)
        return res.send({ success: false, message: 'Survey not found.' });
      res.send({ success: true, survey: survey });
    } catch (error) {
      next(error);
    }
  },
  async getCount(req, res, next) {
    let subjectId = req.params.subjectId;
    let questionId = req.params.questionId;
    let veryAgree = 0;
    let agree = 0;
    let neutral = 0;
    let disAgree = 0;
    let veryDisagress = 0;
    try {
      const survey = await Survey.find({ subject: subjectId });
      const count = survey.length;

      survey.forEach((s) => {
        s.answer.find((q) => {
          if (q.question == questionId && q.choose == 5) veryAgree++;
        });
        s.answer.find((q) => {
          if (q.question == questionId && q.choose == 4) agree++;
        });
        s.answer.find((q) => {
          if (q.question == questionId && q.choose == 3) neutral++;
        });
        s.answer.find((q) => {
          if (q.question == questionId && q.choose == 2) disAgree++;
        });
        s.answer.find((q) => {
          if (q.question == questionId && q.choose == 1) veryDisagress++;
        });
      });
      res.send({
        result: [veryAgree, agree, neutral, disAgree, veryDisagress],
        count: count,
      });
    } catch (error) {
      next(error);
    }
  },
};
