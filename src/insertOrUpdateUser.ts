import pkg from "knex";
const { knex } = pkg;

// If the following is commented out, the app will use SQLite instead of PostgreSQL:
const database = knex({
  client: "pg",
  connection: {
    host: process.env.DB_HOST,
    port: Number(process.env.POSTGRES_PORT),
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
  },
});

import { Request } from "express";

export async function insertOrUpdateUser(req: Request) {
  const authenticatedUser = req.user;
  if (authenticatedUser) {
    const adminUserIds = process.env.ADMIN_USERS?.split(",") || [];
    const isAdmin = adminUserIds.includes(authenticatedUser.userId);

    authenticatedUser.is_admin = isAdmin;

    try {
      await database("users").insert({
        user_id: authenticatedUser.userId,
        provider: "Microsoft",
        email: authenticatedUser.mail,
        firstname: authenticatedUser.givenName,
        lastname: authenticatedUser.surname,
        is_admin: isAdmin ? "yes" : "no",
      });
      // .onConflict("user_id")
      // .merge();
      console.log("User inserted into the database");
    } catch (error) {
      console.error("Error inserting user into the database:", error);
    }
  }
}
