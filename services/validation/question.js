import Joi from 'joi';
const validateQuestion = (question) => {
  const schema = {
    name: Joi.string().not().min(5).empty().required(),
    type: Joi.number().not().empty().required().valid(1, 2, 3, 4, 5),
  };
  return Joi.validate(question, schema);
};

export default validateQuestion;
