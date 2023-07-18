import pkg from 'knex';
const { Knex } = pkg;

const knexConfig = {
  client: 'pg',
  connection: {
    host: process.env.DB_HOST,
    port: Number(process.env.POSTGRES_PORT),
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
  },
  migrations: {
    directory: './db/migrations',
  },
};

export default knexConfig;
