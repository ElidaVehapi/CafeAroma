// checkout.js
export default {
  data() {
    return {
      orderSummary: [],
    };
  },
  created() {
    // Annahme: Du hast bereits Artikelinformationen im basket
    this.calculateOrderSummary();
  },
  methods: {
    calculateOrderSummary() {
      // Hier kannst du die Logik hinzufügen, um die Bestellung zusammenzufassen
      // Zum Beispiel, indem du die Gesamtmenge und den Gesamtpreis berechnest
      // Annahme: basket ist ein Array von Artikeln mit name und price Eigenschaften
      this.orderSummary = this.basket.map((item) => ({
        name: item.name,
        price: item.price,
      }));

      // Beispiel für die Berechnung der Gesamtmenge und des Gesamtpreises
      // Hier musst du deine eigene Logik basierend auf deinen Anforderungen implementieren
      // Annahme: Du hast eine Funktion calculateTotal() implementiert
      // this.totalQuantity = this.calculateTotal('quantity');
      // this.totalPrice = this.calculateTotal('price');
    },
    // Hier kannst du weitere Methoden für den Checkout hinzufügen
    // Zum Beispiel, um die Bestellung abzuschließen und den Benutzer weiterzuleiten
    // oder um Änderungen an der Bestellung vorzunehmen
  },
  template: `
      <div class="container">
        <h2 class="mt-4">Ihre Bestellzusammenfassung</h2>
        <table class="table mt-4">
          <tr v-for="(item, index) in orderSummary">
            <td class="menu-title">
              {{ item.name }}
            </td>
            <td class="menu-price">
              {{ item.price }} &euro;
            </td>
          </tr>
        </table>
        <p>Total Quantity: {{ totalQuantity }}</p>
        <p>Total Price: {{ totalPrice }} &euro;</p>
        <router-link class="btn btn-secondary mr-5" to="/">Weiter einkaufen</router-link>
        <router-link class="btn btn-primary" to="/checkout">Bestellung abschließen</router-link>
      </div>
    `,
};
