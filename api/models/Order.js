/**
 * Order.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

const Customer = require("./Customer");

module.exports = {

  attributes: {

    date: {
      type: 'ref', 
      columnTyp: 'datetime', 
      defaultsTo: () => new Date()
    },
    customer_id: {
      model: 'Customer'
    },

  },

};

