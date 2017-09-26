const faker = require('faker')

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('customers').insert([
    {id: 1, name: faker.name.findName()},
    {id: 2, name: faker.name.findName()},
    {id: 3, name: faker.name.findName()},
    {id: 4, name: faker.name.findName()}
  ])
};
