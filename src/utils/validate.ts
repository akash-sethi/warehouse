import httpStatus from 'http-status';
import Joi from 'joi';

import ApiError from './apiError';

export const validate = (data, schema) => {
  const key = Object.keys(schema).pop();
  const { value, error } = Joi.compile(schema[key])
    .prefs({ errors: { label: 'key' }, abortEarly: false })
    .validate(data.value[key]);

  if (error) {
    const errorMessage = error.details.map((details) => details.message).join(', ');
    throw new ApiError(httpStatus.BAD_REQUEST, errorMessage);
  }

  return { value };
};
