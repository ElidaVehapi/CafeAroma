/**
 * CsrfTokenController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {

    getToken: function(req, res) {
      return res.json({
        _csrf: req.csrfToken()
      });
    },
  };
  

