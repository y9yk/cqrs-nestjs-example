import * as Joi from 'joi';

export const validationScheme = Joi.object({
  NODE_ENV: Joi.string().valid(
    'development',
    'production',
    'test',
    'provision',
  ),
  // service
  SERVICE_NAME: Joi.string().default('cqrs-nestjs-example'),
  SERVICE_PORT: Joi.number().default(8080),
  SERVICE_KEEP_ALIVE_TIMEOUT: Joi.number().default(620),
  // db (service)
  MONGO_SERVICE_HOST: Joi.string().default('127.0.0.1'),
  MONGO_SERVICE_PORT: Joi.number().default(27017),
  MONGO_SERVICE_USERNAME: Joi.string().required(),
  MONGO_SERVICE_PASSWORD: Joi.string().required(),
  MONGO_SERVICE_DATABASE: Joi.string().default('service'),
  // db (eventstore)
  MONGO_EVENTSTORE_HOST: Joi.string().default('127.0.0.1'),
  MONGO_EVENTSTORE_PORT: Joi.number().default(27018),
  MONGO_EVENTSTORE_USERNAME: Joi.string().required(),
  MONGO_EVENTSTORE_PASSWORD: Joi.string().required(),
  MONGO_EVENTSTORE_DATABASE: Joi.string().default('eventstore'),
  // security - jwt
  JWT_SECRET: Joi.string().required(),
  JWT_EXPIRES_IN: Joi.number().default(1 * 60 * 60),
  // log
  LOG_LEVEL: Joi.string().default('info'),
});
