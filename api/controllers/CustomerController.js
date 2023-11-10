/**
 * CustomerControllerController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

/**
createCustomer: Erstellt einen neuen Kunden mit den Daten Name, PLZ, 
Ort, Straße und setzt die user_id als Fremdschlüssel. */
module.exports = {
  // CustomerController.js


    createCustomer: async function (req, res) {
      try {
        const { name, street, city, plz } = req.body;
        const userId = req.user.id; // Annahme: Sie haben eine Authentifizierung implementiert und haben den Benutzer im req-Objekt.
  
        const createdCustomer = await Customer.create({
          name,
          street,
          city,
          plz,
          user_id: userId,
        }).fetch();
  
        return res.status(201).json(createdCustomer);
      } catch (error) {
        console.error(error);
        return res.status(500).send("Internal Server Error");
      }
    },
  };
  


