import Joi from 'joi';

export const productValidation = {
  upload: {
    products: Joi.array().items(
      Joi.object()
        .keys({
          name: Joi.string().required(),
          contain_articles: Joi.array().items(
            Joi.object().keys({
              art_id: Joi.string().required(),
              amount_of: Joi.string().required(),
            })
          ),
        })
        .min(1)
    ),
  },
};

export default productValidation;
