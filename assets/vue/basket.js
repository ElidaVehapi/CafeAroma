export default {
  data() {
    return {
      basket: [],
    };
  },
  created() {
    this.loadBasket();
  },

  methods: {
    remove: function (index) {
      let url = new URL(origin + "/api/basket");
      let data = new FormData();
      data.append("index", index);

      console.log("data :>> ", data);

      fetch(url, {
        method: "DELETE",
        body: data,
      }).then((result) => {
        console.log("DELETE-Anfrage erfolgreich");
        this.loadBasket();
      });
    },
    loadBasket: function () {
      let url = new URL(origin + "/api/basket");
      fetch(url)
        .then((res) => res.json())
        .then((data) => (this.basket = data.basket));
    },
  },
  computed: {
    groupedBasket() {
      const grouped = {};
      this.basket?.forEach((item) => {
        if (!grouped[item.id]) {
          grouped[item.id] = { ...item, quantity: 1 };
        } else {
          grouped[item.id].quantity++;
        }
      });
      console.log("grouped :>> ", grouped);
      return Object.values(grouped);
    },
  },

  template: `
    <div class="container">
      <h2 class="mt-4">Ihr Einkaufswagen</h2>
      <table class="table mt-4">
        <tr v-for="(item, index) in groupedBasket" :key="index">
          <td class="menu-title">
            {{ item.name }}
          </td>
          <td class="menu-price">
            {{ item.price }} &euro;
          </td>
          <td class="menu-quantity">
            Menge: {{ item.quantity }}
          </td>
          <td class="menu-remove">
            <a class="btn btn-outline-dark" @click="remove(index)">entfernen</a>
          </td>
        </tr>
      </table>
      <v-btn  class="standard-btn" :style="{hover}" rounded="xl" to="/">Weiter einkaufen</v-btn>
      <v-btn class="standard-btn"  color="#8d6e63" rounded="xl" to="/address"><span style="color:white">Bestellung abschliessen</span></v-btn>
      </div>
  `,
};
