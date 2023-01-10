import Joi from 'joi';

const validateUser = (user) => {
  const schema = {
    name: Joi.string().not().min(5).max(50).empty().required(),
    email: Joi.string()
      .not()
      .empty()
      .min(5)
      .max(50)
      .required()
      .lowercase()
      .email(),
    password: Joi.string().not().empty().min(5).max(50).required(),
    department: Joi.number()
      .not()
      .empty()
      .required()
      .valid('عام', 'علوم حاسب', 'نظم معلومات'),
    classroom: Joi.number().not().empty().required().valid(1, 2, 3, 4),
    semester: Joi.number().not().empty().required().valid(1, 2),
    mobile: Joi.number().not().empty().required(),
    city: Joi.string().not().min(5).max(50).empty().required(),
    avatar: Joi.string().not().empty().required()
  };
  return Joi.validate(user, schema);
};

const validateLogin = (user) => {
  const schema = {
    email: Joi.string()
      .not()
      .empty()
      .min(5)
      .max(50)
      .required()
      .lowercase()
      .email(),
    password: Joi.string().not().empty().min(5).max(50).required(),
  };
  return Joi.validate(user, schema);
};

// const validateChangePassword = (user) => {
//   const schema = {
//     password: Joi.string().not().empty().min(5).max(50).required(),
//     newPassword: Joi.string().not().empty().min(5).max(50).required(),
//   };
//   return Joi.validate(user, schema);
// };

// exports.validateUser = validateUser;
// exports.validateLogin = validateLogin;
// exports.validateChangePassword = validateChangePassword;

// {
//   validateUser, validateLogin, validateChangePassword;
// }

export default validateUser;
