const Joi = require("@hapi/joi");

const userValidationSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  department: Joi.string().required(),
  image: Joi.string().optional(),
  gender: Joi.string().required(),
  experience: Joi.string().required(),
  technical_skills: Joi.array().required(),
  learning_skills: Joi.array().optional(),
  rating: Joi.number().optional(),
  status: Joi.boolean().optional(),
});

const questionsValidationSchema = Joi.object({
  question: Joi.string().required(),
  answer: Joi.string().required(),
  status: Joi.boolean().optional(),
});

const tipsValidationSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
  status: Joi.boolean().optional(),
});

const exampleValidationSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
  status: Joi.boolean().optional(),
});

const registerValidationSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string()
  .min(8)
  .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[a-zA-Z\d!@#$%^&*]*$/)
  .message('"{#label}" must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one numeric digit, and one special character.')
}).required();


const loginValidationSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string()
  .min(8)
  .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[a-zA-Z\d!@#$%^&*]*$/)
  .message('"{#label}" must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one numeric digit, and one special character.')
}).required();



module.exports = {
  userValidationSchema,
  questionsValidationSchema,
  tipsValidationSchema,
  exampleValidationSchema,
  loginValidationSchema,
  registerValidationSchema
};
