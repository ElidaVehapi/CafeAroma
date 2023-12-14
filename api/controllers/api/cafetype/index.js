module.exports = {
  friendlyName: "Index",

  description: "Index cafetype.",

  inputs: {},

  exits: {},

  fn: async function (inputs) {
    return (cafetypes = await Cafetype.find().populate("products"));
  },
};
