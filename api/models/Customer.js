/**
 * Customer.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 * 
 * 
module.exports = {

  attributes: {
    name: {
      type: 'string', 
      columnTyp: 'varchar(80)', 
      required: true 
    },
    street: {
      type: 'string', 
      columnTyp: 'varchar(80)', 
      required: true 
    },
    city: {
      type: 'string', 
      columnTyp: 'varchar(80)', 
      required: true 
    },
    plz: {
      type: 'number', 
      columnTyp: 'integer', 
      required: true 
    },
    user_id: {
      model: 'user',
      unqiue: true
    }
  },



};


 */
