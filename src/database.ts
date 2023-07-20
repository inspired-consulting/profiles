import pkg from "pg";
const { Pool } = pkg;

export async function setupDatabase() {
  const pool = new Pool({
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    host: process.env.DB_HOST,
    port: Number(process.env.POSTGRES_PORT),
    database: process.env.POSTGRES_DB,
  });

  try {
    // Check if the "postgres" user already exists
    const { rows } = await pool.query(
      `SELECT 1 FROM pg_roles WHERE rolname = $1`,
      [process.env.POSTGRES_USER]
    );

    if (rows.length === 0) {
      // Create the new database
      await pool.query(`CREATE DATABASE ${process.env.POSTGRES_DB};`);

      // Create a new user with the given credentials
      await pool.query(`
        CREATE USER ${process.env.POSTGRES_USER} WITH
        ENCRYPTED PASSWORD '${process.env.POSTGRES_PASSWORD}';
      `);

      // Grant all privileges on the new database to the new user
      await pool.query(`
        GRANT ALL PRIVILEGES ON DATABASE ${process.env.POSTGRES_DB} TO ${process.env.POSTGRES_USER};
      `);
    }

    pool.end();
  } catch (error) {
    console.error("Error setting up the database:", error);
    pool.end();
  }
}
