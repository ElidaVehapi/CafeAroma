export default {
  data() {
    return {
      orderSummary: [],
      totalQuantity: 0,
      totalPrice: 0,
      basket: [],
    };
  },
  created() {
    this.loadBasket();
  },
  methods: {
    loadBasket() {
      let url = new URL(origin + "/api/basket");
      fetch(url)
        .then((res) => res.json())
        .then((data) => {
          this.basket = data.basket;
          this.calculateOrderSummary();
        })
        .catch((error) => {
          console.error("Fehler beim Laden des Warenkorbs:", error);
        });
    },
    calculateOrderSummary() {
      const grouped = {};
      this.basket.forEach((item) => {
        if (!grouped[item.id]) {
          grouped[item.id] = { ...item, quantity: 1 };
        } else {
          grouped[item.id].quantity++;
        }
      });

      this.orderSummary = Object.values(grouped).map((item) => ({
        name: item.name,
        price: item.price,
        quantity: item.quantity,
      }));

      this.totalPrice = this.calculateTotal("price");
    },
    calculateTotal(property) {
      return this.orderSummary.reduce(
        (total, item) => total + item[property] * item.quantity,
        0
      );
    },
  },

  template: `
    <div class="container">
      <h2 class="mt-4">Bestellzusammenfassung</h2>
      <table class="table mt-4">
        <tr v-for="(item, index) in orderSummary" :key="index">
          <td class="menu-title">
            {{ item.name }}
          </td>
          <td class="menu-price">
            {{ item.price }} &euro;
          </td>
          <td class="menu-quantity">
            Menge: {{ item.quantity }}
          </td>
        </tr>
      </table>
      <p>Summe: {{ totalPrice }} &euro;</p>
      <v-row justify="center" class="mt-4">
        <v-btn  class="standard-btn" rounded="xl" to="/">Weiter einkaufen </v-btn>
        <v-btn class="standard-btn"  color="#8d6e63" rounded="xl" to="/verifiedOrder" ><span style="color:white">Jetzt zahlungspflichtig bestellen</span></v-btn>
        </v-row> 
    </div>
  `,
};
