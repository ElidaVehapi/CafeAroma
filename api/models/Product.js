/**
 * Product.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    price: {
      type: 'number', 
      columnTyp: 'DECIMAL(6,2)', 
      required: true 
    },

    name: {
      type: 'string', 
      columnTyp: 'varchar(80)', 
      required: true 
    },

    cafetype: {
      type: 'string', 
      columnTyp: 'varchar(80)', 
      required: true 
    }    

  },

};

