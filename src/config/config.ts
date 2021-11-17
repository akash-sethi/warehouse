import dotenv from 'dotenv';
import Joi from 'joi';
import path from 'path';

dotenv.config({ path: path.join(__dirname, '../../.env') });

const envPropSchema = Joi.object().keys({
  NODE_ENV: Joi.string().valid('development', 'test', 'production').required(),
  PORT: Joi.number().default(8080).required(),
  MONGO_HOST: Joi.string().default('mongodb').required(),
  MONGO_PORT: Joi.number().default(27017).required(),
  MONGO_DATABASE_NAME: Joi.string().required(),
  MONGO_INITDB_ROOT_USERNAME: Joi.string().required(),
  MONGO_INITDB_ROOT_PASSWORD: Joi.string().required(),
});

const validateObject = (envPropSchema, data) => {
  const res = envPropSchema.validate(data, { stripUnknown: true });

  if (res.error) {
    throw new Error(`${res.error}`);
  }

  return res.value;
};

const envProp = validateObject(envPropSchema, process.env);

interface IConfig {
  env: string;
  port: number;
  mongoose: IMongoose;
}

interface IMongoose {
  url: string;
  options?: object;
}

export const config: IConfig = {
  env: envProp.NODE_ENV,
  port: envProp.PORT,
  mongoose: {
    url: `mongodb://${envProp.MONGO_INITDB_ROOT_USERNAME}:${envProp.MONGO_INITDB_ROOT_PASSWORD}@${envProp.MONGO_HOST}:${
      envProp.MONGO_PORT
    }/${envProp.MONGO_DATABASE_NAME}${envProp.NODE_ENV === 'test' ? '-test' : ''}?authSource=admin`,
  },
};
