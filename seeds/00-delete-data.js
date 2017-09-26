exports.seed = (knex, Promise) => {
  return knex('order_items').del()
                            .then( () => { return knex('orders').del() })
                            .then( () => { return knex('products').del() })
                            .then( () => { return knex('customers').del() })
}
