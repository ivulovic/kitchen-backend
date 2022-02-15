const Joi = require("joi");

module.exports = {
  create: Joi.object().keys({
    storeId: Joi.string().required(),
    isDelivered: Joi.boolean(),
    description: Joi.string().allow(""),
  }),
  update: Joi.object().keys({
    description: Joi.string(),
    isDelivered: Joi.boolean(),
  }),
};
