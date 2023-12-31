/**
 * Cafetype.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  attributes: {
      name: {
          type: 'string',  
          columnType: 'varchar(80)',  
          required: true,
      },
      products: {
          collection: 'product',
          via: 'cafetype'
      }
  }
};
