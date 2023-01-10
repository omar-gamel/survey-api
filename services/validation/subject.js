import Joi from 'joi';
const validateSubject = (subject) => {
  const schema = {
    name:  Joi.string().not().min(5).max(50).empty().required(),
    instructor: Joi.string().not().min(5).max(50).empty().required(),
    department: Joi.string()
      .not()
      .empty()
      .required()
      .valid('عام', 'علوم حاسب', 'نظم معلومات'),
    classroom: Joi.number().not().empty().required().valid(1, 2, 3, 4),
    semester: Joi.number().not().empty().required().valid(1, 2),
  };
  return Joi.validate(subject, schema);
};

export default validateSubject;
