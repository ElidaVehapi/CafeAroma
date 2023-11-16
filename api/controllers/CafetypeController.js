/**
 * CafetypeController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

const Sails = require("sails/lib/app/Sails");

module.exports = {
  create: async function (req, res) {
    sails.log.debug("Create new producct....")
    let cafetype = await Cafetype.create(req.allParams());
    res.redirect('/cafetype');
  },

  find: async function (req, res) {
    sails.log.debug("List cafetype....")
    cafetypes = await Cafetype.find();
    res.view('pages/cafetype/index', { cafetypes });
  },

  destroyOne: async function (req, res) {
    sails.log.debug("Destroy cafetype....")
    await Cafetype.destroyOne({ id: req.params.id });
    res.redirect('/cafetype');
  },

 
};

