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
  "GET /signup": { action: "entrance/view-signup" },
  "GET /login": { action: "entrance/view-login" },

  "GET /account": { action: "account/view-account-overview" },
  "GET /account/password": { action: "account/view-edit-password" },
  "GET /account/profile": { action: "account/view-edit-profile" },

  "GET /logout": { action: "account/logout" },
  "POST  /login": { action: "entrance/login" },
  "POST  /signup": { action: "entrance/signup" },
  "POST  /updateProfile": { action: "account/update-profile" },
  "POST  /updatePassword": { action: "account/update-password" },

  /***************************************************************************
   *                                                                          *
   * Make the view located at `views/homepage.ejs` your home page.            *
   *                                                                          *
   * (Alternatively, remove this and add an `index.html` file in your         *
   * `assets` directory)                                                      *
   *                                                                          *
   ***************************************************************************/

  "/": { view: "pages/homepage" },

  "/about": { view: "pages/about" },

  'GET /csrfToken': 'CsrfTokenController.getToken',

  "GET /admin": { action: "view-admin" },
  "GET /welcome": { action: "view-homepage-or-redirect" },

  "GET /product/new": { controller: "ProductController", action: "new" },
  "POST /product": { controller: "ProductController", action: "create" },
  "GET /product": "ProductController.find",
  "GET /product/:id": "product.findOne",

  "GET /product/:id/edit": {
    controller: "ProductController",
    action: "editOne",
  },
  "POST /product/:id/update": {
    controller: "ProductController",
    action: "updateOne",
  },
  "GET /product/:id/destroy": {
    controller: "ProductController",
    action: "destroyOne",
  },
  'GET /product/:id/uploadImageForm': { controller: 'ProductController', action: 'uploadImageForm' },
  'POST /product/:id/uploadImage': { controller: 'ProductController', action: 'uploadImage' },


  "GET /product/report": "product.report",

  "GET /cafetype/new": { view: "pages/cafetype/new" },
  "POST /cafetype": { controller: "CafetypeController", action: "create" },
  "GET /cafetype/:id/destroy": {
    controller: "CafetypeController",
    action: "destroyOne",
  },
  "GET /cafetype": { controller: "CafetypeController", action: "find" },

  /**
   * Order
   */
  "/adressForm": { view: "pages/order/adressForm" },

  /***************************************************************************
   *                                                                          *
   *       Shopping Basked API                                                *
   *                                                                          *
   ***************************************************************************/

  "GET /shopping": { action: "view-product-shopping" },

  "GET /api/cafetype": { action: "api/cafetype/index" },

  "GET /api/basket": { action: "api/basket/get" },
  "POST /api/basket": { action: "api/basket/add" },
  "POST /api/address": { action: "api/basket/post-address" },
  "DELETE /api/basket": { action: "api/basket/remove" },
  // "DELETE /api/basket": { action: "api/basket/clear"},


  //Cafe carousel

  "/cafe": { view: "pages/cafeCarousel" },
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
