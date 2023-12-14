export default {
  data() {
    return {
      cafetypes: [],
      om: "",
    };
  },
  created() {
    let url = new URL(origin + "/api/cafetype");
    fetch(url)
      .then((res) => res.json())
      .then((data) => (this.cafetypes = data))
      .catch((error) => console.error("Error fetching data:", error));
  },
  methods: {
    order: function (event) {
      let url = new URL(origin + "/api/basket");
      let data = new FormData();
      data.append("id", event.target.id);
      fetch(url, {
        method: "POST",
        body: data,
      }).then((result) => {
        this.$router.push("/basket");
      });
    },
  },
  template: `
    <div class="container">
        <span class="h1">Test Shopmenu.js</span>
        <div class="my-5" v-for="cafetype in this.cafetypes">
        <span class="h3">{{ cafetype.name }}</span>
        <hr>
            <div class="mt-2" v-for="product in cafetype.products">
                <div class="h4">{{ product.name }}</div>
                <div class="d-flex justify-content-between">
                    <div>
                        <span class="h6"> {{ product.price }} &euro;</span>
                        <span :id="product.id" class="ml-2 btn btn-outline-primary" @click="order">Bestellen</span>
                    </div>
                </div>
            </div>
        </div>
        <router-link class="btn btn-primary" to="/basket">To Shopping Basked</router-link>
    </div>`
};
