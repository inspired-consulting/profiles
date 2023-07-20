/**
 * @param {import("knex").Knex} knex
 * @returns {Promise<void>}
 */
export const up = async (knex) => {
  await knex.schema.alterTable('users', (table) => {
    table.boolean('is_admin').notNullable().defaultTo(false).alter();
  });
};

/**
 * @param {import("knex").Knex} knex
 * @returns {Promise<void>}
 */
export const down = async (knex) => {
  await knex.schema.alterTable('users', (table) => {
    table.string('is_admin').notNullable().defaultTo('no').alter();
  });
};
