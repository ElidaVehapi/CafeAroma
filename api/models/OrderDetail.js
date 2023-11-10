/**
 * OrderDetail.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

  amount: {
      type: 'number', 
      columnTyp: 'integer', 
      required: true 
  },

  order_id: {
    model: 'Order'
  },

  product_id: {
    model: 'Product'
  }
  
}

};

