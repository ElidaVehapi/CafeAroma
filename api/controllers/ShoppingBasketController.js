/**
 * ShoppingBasketController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

const Sails = require("sails/lib/app/Sails");

module.exports = {
  show: async function (req, res) {
    res.view("pages/order/shoppingbasket");
  },

  put: async function (req, res) {
    let product = await Product.findOne({ id: req.params.productid });
    if (!req.session.basket) {
      req.session.basket = [];
      req.session.basket.push(product);
    } else {
      req.session.basket.push(product);
    }
    // All done.
    res.redirect("/shoppingbasket");
  },

  remove: async function (req, res) {
    req.session.basket.splice(req.params.index, 1);
    res.redirect("/shoppingbasket");
  },
};
