import './env.config';

const connectionOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
};

const databaseConnection = {
  databaseURL: process.env.DATABASE_URL,
  connectionOptions,
};

export { databaseConnection };
