/**
 * OrderController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

// OrderController.js
module.exports = {
  create: async function (req, res) {
    try {
      // Hier wird angenommen, dass die Produkte bereits im Warenkorb gespeichert sind
      const products = req.session.basket;

      // Erstelle eine Bestellung im Datenbankmodell Order
      const order = await Order.create({
        // Füge hier weitere Informationen hinzu, wie Benutzer-ID, Datum, etc.
        // userID: req.session.userId,
        // date: new Date(),
      }).fetch();

      // Füge die bestellten Produkte zur Bestellung hinzu
      await Promise.all(
        products.map(async (product) => {
          await OrderDetail.create({
            orderId: order.id,
            productId: product.id,
            quantity: 1, // Hier kannst du die Menge anpassen
            // Füge hier weitere Informationen hinzu, wie Preis, usw.
          });
        })
      );

      // Leere den Warenkorb nach der Bestellung
      req.session.basket = [];

      return res.ok({ message: "Order created successfully." });
    } catch (error) {
      return res.serverError({ error: "Failed to create order." });
    }
  },
};
