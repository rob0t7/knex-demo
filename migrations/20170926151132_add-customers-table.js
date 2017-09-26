exports.up = function(knex, Promise) {
  return knex.schema.createTable('customers', (table) => {
    table.increments()
    table.string('name')
    table.timestamps(true)
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('customers')
};
