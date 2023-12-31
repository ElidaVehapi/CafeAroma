/**
 * Policy Mappings
 * (sails.config.policies)
 *
 * Policies are simple functions which run **before** your actions.
 *
 * For more information on configuring policies, check out:
 * https://sailsjs.com/docs/concepts/policies
 */

module.exports.policies = {
  /***************************************************************************
   *                                                                          *
   * Default policy for all controllers and actions, unless overridden.       *
   * (`true` allows public access)                                            *
   *                                                                          *
   ***************************************************************************/

  "*": "is-logged-in",

  // Bypass the `is-logged-in` policy for:
  "entrance/*": true,
  "account/logout": true,

  "view-admin": "is-super-admin", //forbidden change link to admin

  // ShopProductsController: {
  //   "*": true,
  // },

  ProductController: {
    "*": "is-super-admin",
  },
  CafetypeController: {
    "*": "is-super-admin",
  },
};
