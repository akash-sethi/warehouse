import Joi from 'joi';

export const articleValidation = {
  upload: {
    inventory: Joi.array().items(
      Joi.object()
        .keys({
          art_id: Joi.string().required(),
          name: Joi.string().required(),
          stock: Joi.number().required(),
        })
        .min(1)
    ),
  },
};

export default articleValidation;
