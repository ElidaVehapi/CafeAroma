export default {
  data() {
    return {
      cafetypes: [],
      selectedCafetype: "All Cafetypes",
      om: "",
      search: "",
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

  computed: {
    filteredProducts: function () {
      const regex = new RegExp(this.search, "i");
      let filtered = [];

      this.cafetypes.forEach((cafetype) => {
        if (
          (this.selectedCafetype === "All Cafetypes" || // Anpassung der Bedingung
            this.selectedCafetype === cafetype.name) &&
          (regex.test(cafetype.name) ||
            regex.test(cafetype.products.map((p) => p.name).join(" ")))
        ) {
          filtered.push({
            cafetype: cafetype.name,
            product: null,
          });
        }

        cafetype.products.forEach((product) => {
          if (
            (this.selectedCafetype === "All Cafetypes" || // Anpassung der Bedingung
              this.selectedCafetype === cafetype.name) &&
            (regex.test(product.name) || regex.test(cafetype.name))
          ) {
            filtered.push({
              cafetype: cafetype.name,
              product: product.name,
              price: product.price,
              id: product.id,
            });
          }
        });
      });

      console.log("Filtered Products:", filtered);
      return filtered;
    },
  },

  template: `
  <div class="container">
  <div class="row" style="text-align:center">
    <div class="col">
      <span class="h1">Shop Your Products</span>
    </div>
  </div>

  <div class="row" style="justify-content:center">
    <div class="col-md-5">
      <v-select
        v-model="selectedCafetype"
        :items="['All Cafetypes', ...cafetypes.map(cafetype => cafetype.name)]"
        label="Select Cafetype"
        outlined
      ></v-select>
    </div>

    <div class="col-md-5">
      <v-text-field
        v-model="search"
        label="Search Products"
        outlined
      ></v-text-field>
    </div>
  </div>

  <div class="row" style="justify-content:center">
    <div class="col-10">
      <div v-for="result in filteredProducts" :key="result.id" class="my-3">
        <div v-if="result.product === null">
          <!-- Anzeige für den gefundenen Cafetype -->
          <span class="h3 font-weight-bold">{{ result.cafetype }}</span>
        </div>
        <div v-else>
          <!-- Anzeige für das gefundene Produkt -->
          <div class="row">
            <div class="col-md-6">
              <div class="h4">{{ result.product }}</div>
            </div>
            <div class="col-md-6">
              <div class="d-flex justify-content-between">
                <div>
                  <span class="h6">{{ result.price }} &euro;</span>
                </div>
                <div class="ml-auto mt-n1">
                  <span :id="result.id" class="btn btn-outline-dark" @click="order">Bestellen</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="row" >
    <div class="col">
      <v-btn class="standard-btn" color="#8d6e63" rounded="xl" to="/basket">
        <span style="color:white">To Shopping Basket</span>
      </v-btn>
    </div>
  </div>
    </div>
    
  </div>

  
</div>

    `,
};
