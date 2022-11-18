const JOI = require('joi');
const message = require('../../utils/message');
const status = require('../../utils/status');

const validateProductId = (id) => {
  const idSchema = JOI.number().integer().min(1).required();
  const { error } = idSchema.validate(id);
  if (error) return { type: 'NOT FOUND', message: message.PRODUCT_NOT_FOUND };

  return { type: null, message: '' };
};

const validateName = (name) => {
  const nameSchema = JOI.string().min(5).required();
  const { error } = nameSchema.validate(name);
  if (error.details[0].type === 'any.required') {
    return {
      type: 'Name Required',
      message: message.NAME_INVALID,
      statusErr: status.INVALID,
    };
  }

  if (error.details[0].type === 'string.min') {
    return {
      type: 'Name Invalid',
      message: message.MUST_LENGTH,
      statusErr: status.INVALID_FORMAT,
    };
  }

  return { type: null, message: '' };
};

module.exports = {
  validateProductId,
  validateName,
};
