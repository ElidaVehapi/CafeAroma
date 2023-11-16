/**
 * Product.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    name: {
      type: 'string',
      columnType: 'varchar(80)',
      required: true
    },
    price: {
      type: 'number',
      columnType: 'DECIMAL(6,2)',
      required: true
    },
    cafetype: {
      model: 'cafetype'
    }
  },
};

