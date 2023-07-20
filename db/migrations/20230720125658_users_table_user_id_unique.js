/**
 * @param {import("knex").Knex} knex
 * @returns {Promise<void>}
 */
export const up = async (knex) => {
  await knex.schema.alterTable('users', (table) => {
    table.uuid('user_id').unique().notNullable().defaultTo(knex.raw('uuid_generate_v4()')).alter();
  });
};

/**
 * @param {import("knex").Knex} knex
 * @returns {Promise<void>}
 */
export const down = async (knex) => {
  await knex.schema.alterTable('users', (table) => {
    table.uuid('user_id').notNullable().defaultTo(knex.raw('uuid_generate_v4()')).alter();
  });
}