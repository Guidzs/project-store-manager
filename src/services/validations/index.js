const JOI = require('joi');
const message = require('../../utils/message');
const status = require('../../utils/status');

// const { getProductById } = require('../../models/products.model');

const validateProductId = (id) => {
  const idSchema = JOI.number().integer().min(1).required();
  const { error } = idSchema.validate(id);
  if (error) return { type: 'NOT FOUND', message: message.PRODUCT_NOT_FOUND };

  return { type: null, message: '' };
};

const checksNameError = (error) => {
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
};

const validateName = (name) => {
  const nameSchema = JOI.string().min(5).required();
  const { error } = nameSchema.validate(name);
  if (error) return checksNameError(error);
  return { type: null, message: '' };
};

const checksIdAndQuantity = (errors) => {
  const error = errors.reduce((_acc, e) => {
    if (e.details[0].type === 'any.required') {
      return {
        type: 'Product Required',
        message: e.details[0].message,
        statusErr: status.INVALID,
      };
    }
    if (e.details[0].type === 'number.greater') {
      return {
        type: 'Quantity Invalid',
        message: message.QUANTITY_INVALID,
        statusErr: status.INVALID_FORMAT,
      };
    }
    return {};
  }, {});
  if (error) return error;
};

// const checksIdExists = (itens) => {
//   const idsValids = itens
//       .map((i) => i.productId)
//       .map( async (id) => await getProductById(id))
//       .some((p) => console.log(p));
//   if (idsValids) return {
//     type: 'NOT FOUND', 
//     message: message.PRODUCT_NOT_FOUND,
//     statusErr: status.NOT_FOUND
//   };
//   return { type: null };
// };

const validateItensSales = (itens) => {
  const saleObject = JOI.object({
    productId: JOI.required(),
    quantity: JOI.number().integer().greater(0).required(),
  });
  const Errors = itens.reduce((acc, item) => {
    const { error } = saleObject.validate(item);
    if (error) return [...acc, error];
    return acc;
  }, []);

  const err = checksIdAndQuantity(Errors);
  if (err.type) return err;

  // const idErr = checksIdExists(itens);
  // if (idErr.type) return idErr; 

  return { type: null, message: '' };
};

module.exports = {
  validateProductId,
  validateName,
  validateItensSales,
};
