/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {

  /***************************************************************************
  *                                                                          *
  * Make the view located at `views/homepage.ejs` your home page.            *
  *                                                                          *
  * (Alternatively, remove this and add an `index.html` file in your         *
  * `assets` directory)                                                      *
  *                                                                          *
  ***************************************************************************/

  '/': { view: 'pages/homepage' },
  
  'GET /admin': { view: 'pages/admin' },

  /*'GET /product/new': { controller: 'ProductController', action: 'new' },
  'POST /product': { controller: 'ProductController', action: 'create' },
  'GET /product': 'ProductController.find',
  'GET /product/:id': 'product.findOne',*/
  'GET /product/new': { view: 'pages/product/new' },
  'POST /product': { controller: 'ProductController', action: 'create' },
  'GET /product': 'ProductController.find',
  'GET /product/:id': 'product.findOne',


  'GET /product/:id/edit': { controller: 'ProductController', action: 'editOne' },
  'POST /product/:id/update': { controller: 'ProductController', action: 'updateOne' },
  'GET /product/:id/destroy': { controller: 'ProductController', action: 'destroyOne' },

  'GET /product/report': 'product.report',

  'GET /cafetype/new': { view: 'pages/cafetype/new' },
  'POST /cafetype': { controller: 'CafetypeController', action:'create' },
  'GET /cafetype/:id/destroy': { controller: 'CafetypeController', action: 'destroyOne' },
  'GET /cafetype': { controller: 'CafetypeController', action: 'find' },
};






  /***************************************************************************
  *                                                                          *
  * More custom routes here...                                               *
  * (See https://sailsjs.com/config/routes for examples.)                    *
  *                                                                          *
  * If a request to a URL doesn't match any of the routes in this file, it   *
  * is matched against "shadow routes" (e.g. blueprint routes).  If it does  *
  * not match any of those, it is matched against static assets.             *
  *                                                                          *
  ***************************************************************************/



