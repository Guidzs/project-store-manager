const JOI = require('joi');
const message = require('../../utils/message');

const validateProductId = (id) => {
  const idSchema = JOI.number().integer().min(1).required();
  const { error } = idSchema.validate(id);
  if (error) return { type: 'NOT FOUND', message: message.PRODUCT_NOT_FOUND };

  return { type: null, message: '' };
};

module.exports = {
  validateProductId,
};
