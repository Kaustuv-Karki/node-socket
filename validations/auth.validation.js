import Joi from "joi";

export const registerValidation = (data) => {
  const schema = Joi.object({
    name: Joi.string().min(6).max(150).required(),
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required(),
  });

  return schema.validate(data);
};
