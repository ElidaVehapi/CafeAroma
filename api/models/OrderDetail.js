/**
 * OrderDetail.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  attributes: {
    // ... andere Attribute des User-Modells
    amount: {
      type: "number",
    },
    product: {
      model: "product",
    },
  },
};
