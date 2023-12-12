/**
 * User.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  attributes: {
    //  ╔═╗╦═╗╦╔╦╗╦╔╦╗╦╦  ╦╔═╗╔═╗
    //  ╠═╝╠╦╝║║║║║ ║ ║╚╗╔╝║╣ ╚═╗
    //  ╩  ╩╚═╩╩ ╩╩ ╩ ╩ ╚╝ ╚═╝╚═╝

    emailAddress: {
      type: "string",
      required: true,
      unique: true,
      isEmail: true,
      maxLength: 200,
      example: "mary.sue@example.com",
    },

    emailStatus: {
      type: "string",
      isIn: ["unconfirmed", "change-requested", "confirmed"],
      defaultsTo: "confirmed",
      description: "The confirmation status of the user's email address.",
    },

    emailChangeCandidate: {
      type: "string",
      isEmail: true,
      description:
        "A still-unconfirmed email address that this user wants to change to (if relevant).",
    },

    password: {
      type: "string",
      required: true,
      description:
        "Securely hashed representation of the user's login password.",
      protect: true,
      example: "2$28a8eabna301089103-13948134nad",
    },

    firstName: {
      type: "string",
      required: false,
      description: "Full representation of the user's firstname.",
      maxLength: 120,
      example: "Mary Sue van der McHenst",
    },
    LastName: {
      type: "string",
      required: false,
      description: "Full representation of the user's Lastname.",
      maxLength: 120,
      example: "Mary Sue van der McHenst",
    },

    adress: {
      type: "string",
      required: false,
      maxLength: 240,
    },
    plz: {
      type: "string",
      required: false,
      maxLength: 120,
    },
    country: {
      type: "string",
      required: false,
      maxLength: 120,
    },

    isSuperAdmin: {
      type: "boolean",
      description:
        'Whether this user is a "super admin" with extra permissions, etc.',
    },
  },
};
