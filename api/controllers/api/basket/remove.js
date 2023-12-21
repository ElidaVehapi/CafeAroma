module.exports = {
  friendlyName: "Remove item from shopping basket",

  description: "Remove item from shopping basket.",

  inputs: {
    index: {
      description: "The index of the item to remove",
      type: "string",
      required: true,
    },
  },

  exits: {},

  fn: async function (inputs) {
    console.log("Remove item from basket......");
    this.req.session.basket.splice(inputs.index, 1);
    return;
  },
};
