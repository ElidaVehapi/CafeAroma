/**
 * User.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    username: {
      type: 'string', 
      columnTyp: 'varchar(80)', 
      required: true 
    },
    password: {
      type: 'string', 
      columnTyp: 'varchar(80)', 
      required: true 
    },
    typ: {
      type: 'string', 
      columnTyp: 'varchar(80)', 
      required: true 
    },
    customer: {
      collection: 'customer',
      via: 'user_id'
    }
  },

};

