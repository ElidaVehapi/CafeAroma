/**
 * OrderDetailController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

// OrderDetailController.js
module.exports = {
  updateQuantity: async function (req, res) {
    try {
      const orderId = req.params.orderId;
      const productId = req.params.productId;
      const quantity = req.body.quantity; // Annahme: Du erhältst die Menge im Request-Body

      // Überprüfe, ob die Bestellung existiert
      const order = await Order.findOne({ id: orderId });
      if (!order) {
        return res.notFound({ error: "Order not found." });
      }

      // Überprüfe, ob das Produkt in der Bestellung existiert
      const orderDetail = await OrderDetail.findOne({
        orderId: orderId,
        productId: productId,
      });
      if (!orderDetail) {
        return res.notFound({ error: "Product not found in the order." });
      }

      // Aktualisiere die Menge des Produkts in der Bestellung
      await OrderDetail.updateOne({ id: orderDetail.id }).set({
        quantity: quantity,
        // Aktualisiere hier weitere Informationen, falls erforderlich
      });

      return res.ok({ message: "Quantity updated successfully." });
    } catch (error) {
      return res.serverError({ error: "Failed to update quantity." });
    }
  },
};
