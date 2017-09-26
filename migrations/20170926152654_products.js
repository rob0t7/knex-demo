exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('products', table => {
      table.increments()
      table.string('name').notNullable()
      table.decimal('price').notNullable()
      table.integer('inventory')
      table.text('description')
    }),
    knex.schema.createTable('orders', table => {
      table.increments()
      table.integer('order_number').unsigned()
      table.integer('customer_id').unsigned().index()
      table.foreign('customer_id').references('customers.id')
    }),
    knex.schema.createTable('order_items', table => {
      table.integer('order_id').unsigned().notNullable()
      table.foreign('order_id').references('orders.id')
      table.integer('product_id').unsigned().notNullable()
      table.foreign('product_id').references('products.id')
      table.index(['product_id', 'order_id'])
    })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('order_items'),
    knex.schema.dropTable('products'),
    knex.schema.dropTable('orders')

  ])

};
