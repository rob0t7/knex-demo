const express = require('express')
const morgan = require('morgan')

const settings = require('./knexfile')
const knex = require('knex')(settings[process.ENV || 'development'])


const app = express()
app.use(morgan('dev'))

// Get all the customers
app.get('/customers', (req, res) => {
  knex('customers')
    .then( (results) => {
      res.json(results)
    })
    .catch( () => {
      res.status(500).send("FAIL")
    })
})

// Fetch all the orders for a specific customer
app.get('/customers/:customer_id/orders', (req, res) => {
  knex
    .select('orders.id AS order_id', 'orders.order_number', 'products.name', 'products.price', 'products.description')
    .from('orders')
    .join('order_items', 'order_items.order_id', 'orders.id')
    .join('products', 'products.id', 'order_items.product_id')
    .where({customer_id: req.params.customer_id})
    .then( (order_items) => {
      let output = order_items.reduce( (result, item) => {
        if (result[item.order_id]) {
          result[item.order_id].items.push(
            {
              name: item.name,
              price: item.price,
              description: item.description
            }
          )
        } else {
          result[item.order_id] = {
            order_id: item.order_id,
            order_number: item.order_number,
            items: [
              {
                name: item.name,
                price: item.price,
                description: item.description
              }
            ]
          }
        }
        return result
      }, {})
      res.json(Object.values(output))
    })
})

// Insert a customer
app.post('/customers', (req, res) => {
  knex('customers')
    .insert({name: req.body.name})
    .then( (customer) => {
      res.status(201).json(customer)
    })
    .catch( () => {
      res.status(406)
    })
})

app.listen(3030, () => {
  console.log('App Running')
})
