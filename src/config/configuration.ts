const getMongoConnectionUrl = (
  host: string,
  port: number,
  username: string,
  password: string,
  database: string,
) => {
  return `mongodb://${username}:${password}@${host}:${port}/${database}?authSource=admin&retryWrites=true&w=majority`;
};

export const configuration = () => ({
  env: process.env.NODE_ENV,
  service: {
    name: process.env.SERVICE_NAME,
    port: process.env.SERVICE_PORT,
    keep_alive_timeout: process.env.SERVICE_KEEP_ALIVE_TIMEOUT,
    log_level: process.env.LOG_LEVEL,
  },
  db: {
    service: {
      uri: getMongoConnectionUrl(
        process.env.MONGO_SERVICE_HOST,
        parseInt(process.env.MONGO_SERVICE_PORT),
        process.env.MONGO_SERVICE_USERNAME,
        process.env.MONGO_SERVICE_PASSWORD,
        process.env.MONGO_SERVICE_DATABASE,
      ),
    },
    eventstore: {
      uri: getMongoConnectionUrl(
        process.env.MONGO_EVENTSTORE_HOST,
        parseInt(process.env.MONGO_EVENTSTORE_PORT),
        process.env.MONGO_EVENTSTORE_USERNAME,
        process.env.MONGO_EVENTSTORE_PASSWORD,
        process.env.MONGO_EVENTSTORE_DATABASE,
      ),
    },
  },
  security: {
    jwt: {
      secret: process.env.JWT_SECRET,
      expiresIn: process.env.JWT_EXPIRES_IN,
    },
  },
});
