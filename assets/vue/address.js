export default {
  data() {
    return {
      name: "",
      address: "",
      rules: [
        (val) => {
          if (!val.trim()) {
            return "Name darf nicht leer sein!";
          }
          const specialChars = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
          if (specialChars.test(val)) {
            return "Der Name enthält Sonderzeichen!";
          } else {
            return true;
          }
        },
        (val) => {
          if (!val.trim()) {
            return "Adresse darf nicht leer sein!";
          }
          const specialChars = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
          if (specialChars.test(val)) {
            return "Die Adresse enthält Sonderzeichen!";
          } else {
            return true;
          }
        },
      ],
    };
  },

  methods: {
    submitAddress() {
      // Check if the name and address are not empty
      if (!this.name.trim() || !this.address.trim()) {
        // If either is empty, show an error message
        alert(
          "Name oder Adresse darf nicht leer sein. Bestellung kann noch nicht abgeschlossen werden."
        );
      } else if (
        this.rules.some(
          (rule) => rule(this.name) !== true || rule(this.address) !== true
        )
      ) {
        // If there are special characters, show an error message
        alert(
          "Name oder Adresse enthält Sonderzeichen. Bestellung kann noch nicht abgeschlossen werden."
        );
      } else {
        // If everything is fine, proceed to submit the address
        let url = new URL(origin + "/api/address");
        let data = new FormData();
        data.append("name", this.name);
        data.append("address", this.address);
        fetch(url, {
          method: "POST",
          body: data,
        }).then((result) => {
          // Navigate to "/checkout" only if there are no issues
          this.$router.push("/checkout");
        });
      }
    },
  },

  template: `
  <div class="container">
      <h1 style="text-align: center" >Shipping Details</h1>
      <v-sheet class="mx-auto"max-width="500">
        <v-form>
          <v-text-field v-model="name" :rules="rules" label="Name"></v-text-field>
          <v-text-field v-model="address" :rules="rules" label="Adresse"></v-text-field>
        </v-form>
      </v-sheet>


      <v-row justify="center" class="mt-4">
        <v-btn  class="standard-btn" rounded="xl" to="/">Weiter einkaufen</v-btn>
        <v-btn class="standard-btn"  color="#8d6e63" rounded="xl" @click="submitAddress"><span style="color:white">Bestellung abschliessen</span></v-btn>
        </v-row>    
      </div>

  `,
};
