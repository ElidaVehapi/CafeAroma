export default {
  data() {
    return {
      basket: [],
    };
  },
  created() {
    let url = new URL(origin + '/api/basket');
    fetch(url)
    .then(res => res.json())
    .then(data => this.basket = data.basket)
  },
  methods: {

  },  
  template: `
  <div class="container">
  <h2 class="mt-4">Ihr Einkauswagen</h2>
    <table class="table mt-4">
        <tr v-for="(item,index) in basket">
            <td class="menu-title">
                {{ item.name}}
            </td>
            <td class="menu-price">
                {{ item.price}} &euro;
            </td>
            <td class="menu-price">
                <a class="badge badge-primary" href="/shoppingbasket/remove/{{index}}">entfernen</a>
            </td>
        </tr>
    </table>
    <router-link class="btn btn-secondary mr-5" to="/">Weiter einkaufen</router-link>
    <router-link class="btn btn-primary" to="/">Bestellung abschliessen</router-link>
    </div>
    `,
};
