import Joi from "joi";

const signUpValidation = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(100).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(4).max(100).required(),
  });
  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(404).json({ message: "Bad request", error });
  }
  next();
};

const loginValidation = (req, res, next) => {
  const schema = Joi.object({
    
    email: Joi.string().email().required(),
    password: Joi.string().min(4).max(100).required(),
  });
  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(404).json({ message: "Bad request", error });
  }
  next();
};


export { signUpValidation, loginValidation };

