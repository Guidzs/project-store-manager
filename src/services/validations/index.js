const JOI = require('joi');
const message = require('../../utils/message');
const status = require('../../utils/status');

const validateProductId = (id) => {
  const idSchema = JOI.number().integer().min(1).required();
  const { error } = idSchema.validate(id);
  if (error) return { type: true, message: message.PRODUCT_NOT_FOUND };

  return { type: null, message: '' };
};

const checksNameError = (error) => {
  if (error.details[0].type === 'any.required') {
    return {
      type: true,
      message: message.NAME_INVALID,
      statusErr: status.INVALID,
    };
  }
  if (error.details[0].type === 'string.min') {
    return {
      type: true,
      message: message.MUST_LENGTH,
      statusErr: status.INVALID_FORMAT,
    };
  }
};

const validateName = (name) => {
  const nameSchema = JOI.string().min(5).required();
  const { error } = nameSchema.validate(name);
  if (error) return checksNameError(error);
  return { type: null, message: '' };
};

module.exports = {
  validateProductId,
  validateName,
};
