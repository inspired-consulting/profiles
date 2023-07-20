/**
 * @param {import("knex").Knex} knex
 * @returns {Promise<void>}
 */
export const up = async (knex) => {
  await knex.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');

  await knex.schema.createTable('users', (table) => {
    table.uuid('id').defaultTo(knex.raw('uuid_generate_v4()')).primary();
    table.uuid('user_id').notNullable().defaultTo(knex.raw('uuid_generate_v4()')).unique();
    table.string('provider').notNullable();
    table.string('email').notNullable();
    table.string('firstname').notNullable();
    table.string('lastname').notNullable();
    table.string('is_admin').notNullable().defaultTo('no');
  });
};

/**
 * @param {import("knex").Knex} knex
 * @returns {Promise<void>}
 */
export const down = async (knex) => {
  await knex.schema.dropTableIfExists('users');
};
