/**
 * ShopProductsController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

const Sails = require("sails/lib/app/Sails");
//const Cafetype = require("../models/Cafetype");

module.exports = {

    // shop: async function (req, res) {
    //     let products = await Product.find();
    //     let cafetypes = await Cafetype.find().populate("product");
    //     res.view('pages/shop', { cafetypes:cafetypes, products:products });
    // }

    // shop: async function (req, res) {
    //     let products = await Product.find().populate("cafetype");
    //     res.view('pages/shop', { products:products });
    shop: async function (req, res) {
        try {
          let cafetypes = await Cafetype.find().populate("products");
          res.view('pages/shop', { cafetypes });
        } catch (err) {
          console.error("Fehler beim Laden von Cafetypes:", err);
          return res.serverError(err);
        }
    }
    };
   