import Joi from 'joi';
const validateSurvey = (survey) => {
  const schema = {
    choose: Joi.number().not().empty().required().valid(1, 2, 3, 4, 5),
  };
  return Joi.validate(survey, schema);
};

export default validateSurvey;
