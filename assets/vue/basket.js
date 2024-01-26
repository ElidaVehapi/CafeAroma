export default {
  data() {
    return {
      basket: [],
      csrfToken: "",
    };
  },
  created() {
    this.loadBasket();
    this.loadCsrfToken();
  },

  methods: {
    remove: function (index) {
      let url = new URL(origin + "/api/basket");
      let data = new FormData();
      data.append("index", index);
      data.append("_csrf", this.csrfToken);

      fetch(url, {
        method: "DELETE",
        body: data,
      }).then((result) => {
        console.log("DELETE-Anfrage erfolgreich");
        this.loadBasket();
      });
    },
    loadCsrfToken: function() {
      fetch(origin + "/csrfToken")
        .then((res) => res.json())
        .then((data) => (this.csrfToken = data._csrf))
        .catch((error) => console.error("Error fetching CSRF token:", error));
    },

    loadBasket: function () {
      let url = new URL(origin + "/api/basket");
      fetch(url)
        .then((res) => res.json())
        .then((data) => (this.basket = data.basket));
    },
    isBasketEmpty: function () {
      return !this.basket || this.basket.length === 0;
    },
    navigateToShipping: function () {
      if (this.isBasketEmpty()) {
        alert("Ihr Warenkorb ist leer. Bitte fügen Sie Produkte hinzu.");
      } else {
        this.$router.push({ path: "/address" });
      }
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
      <input type="hidden" name="_csrf" v-model="csrfToken" />

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
      <v-btn class="standard-btn"  color="#8d6e63" rounded="xl" @click="navigateToShipping"><span style="color:white">Weiter zum Versand</span></v-btn>
      </div>
  `,
};
