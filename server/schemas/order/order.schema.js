const Joi = require("joi");

module.exports = {
  create: Joi.object().keys({
    productId: Joi.string().required(),
    quantity: Joi.string().required(),
    delivery: Joi.boolean().required(),
    description: Joi.string(),
  }),
  update: Joi.object().keys({
    quantity: Joi.string(),
    description: Joi.string(),
    status: Joi.string(),
    delivery: Joi.boolean(),
  }),
};
