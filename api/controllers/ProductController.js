/**
 * ProductControllerController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */


/**
 * CREATE Order
 * Update Price
 * DELETE Order
 * READ Order  
 *
 */

const Sails = require("sails/lib/app/Sails");


module.exports = {
  new: async function (req, res) {
    let categories = await Category.find();
    res.view('pages/meal/new', { categories });
  },

  create: async function (req, res) {
    sails.log.debug("Create product....")
    let params = req.allParams();
    await Product.create(params);
    res.redirect ('/meal' );
  },

  find: async function (req, res) {
    sails.log.debug("List all meals....")
    let meals;
    if (req.query.q && req.query.q.length > 0) {
      meals = await Meal.find({
        name: {
          'contains': req.query.q
        }
      })
    } else {
      meals = await Meal.find().populate("category");
    }
    res.view ('pages/meal/index', { meals: meals } );
  },

  findOne: async function (req, res) {
    sails.log.debug("List single meal....")
    let meal = await Meal.findOne({ id: req.params.id });
    res.view ('pages/meal/show', { meal: meal } );
  },

  destroyOne: async function (req, res) {
    sails.log.debug("Destroy single meal....")
    await Meal.destroyOne({ id: req.params.id });
    res.redirect('/meal');
  },

  editOne: async function (req, res) {
    sails.log.debug("Edit single meal....")
    let meal = await Meal.findOne({ id: req.params.id }).populate('category');
    res.view('pages/meal/edit', { meal: meal });
  },

  updateOne: async function (req, res) {
    sails.log.debug("Update single meal....")
    let meal = await Meal.updateOne({ id: req.params.id }).set(req.body);
    res.redirect('/meal');
  },

  report: async function (req, res) {
    let sql = "select m.id, m.name, m.createdAt, m.updatedAt from meal as m order by m.updatedAt desc;";
    var rawResult = await sails.sendNativeQuery(sql);
    
    console.dir(rawResult);
    let entries  = [];
    rawResult.rows.forEach(element => {
      entries.push(element);
    });
    res.view('pages/meal/report', { entries });
 }
};
