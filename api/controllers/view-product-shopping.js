module.exports = {
  friendlyName: "View product shopping",

  description: 'Display "Product shopping" page.',

  exits: {
    success: {
      viewTemplatePath: "pages/shopping/product-shopping",
    },
  },

  fn: async function () {
    // Respond with view.
    return {};
  },
};
