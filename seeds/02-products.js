const faker = require('faker')

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('products')
    .insert([
      {
        id: 1,
        name: faker.commerce.productName(),
        description: faker.lorem.paragraph(),
        price: faker.commerce.price()
      },
      {
        id: 2,
        name: faker.commerce.productName(),
        description: faker.lorem.paragraph(),
        price: faker.commerce.price()
      },
      {
        id: 3,
        name: faker.commerce.productName(),
        description: faker.lorem.paragraph(),
        price: faker.commerce.price()
      }
    ])
    .then( () => {
      return knex('orders').insert([
        {
          id: 1,
          customer_id: 1,
          order_number: 21323
        },
        {
          id: 2,
          customer_id: 1,
          order_number: 342334
        },
        {
          id: 3,
          customer_id: 2,
          order_number: 123232323
        }
      ])
    })
    .then( () => {
      return knex('order_items').insert([
        {
          product_id: 1,
          order_id: 1
        },
        {
          product_id: 3,
          order_id: 1
        },
        {
          product_id: 1,
          order_id: 2
        },
        {
          product_id: 2,
          order_id: 3
        }
      ])
    })

};
