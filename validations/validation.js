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

module.exports = {
  userValidationSchema,
  questionsValidationSchema,
  tipsValidationSchema,
  exampleValidationSchema,
};
