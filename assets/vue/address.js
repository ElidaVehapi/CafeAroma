export default {
  data() {
    return {
      name: "",
      address: "",
      csrfToken: "",
      nameRules: [
        (val) => {
          if (!val.trim()) {
            return "Name darf nicht leer sein!";
          }
          const specialChars = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
          if (specialChars.test(val)) {
            return "Der Name enthält Sonderzeichen!";
          }
          const containsNumbers = /\d/.test(val);
          if (containsNumbers) {
            return "Der Name darf keine Zahlen enthalten!";
          }

          return true;
        },
      ],
      addressRules: [
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
  created() {
    this.loadCsrfToken();
  },
  methods: {
    loadCsrfToken: function() {
      fetch(origin + "/csrfToken")
        .then((res) => res.json())
        .then((data) => (this.csrfToken = data._csrf))
        .catch((error) => console.error("Error fetching CSRF token:", error));
    },

    submitAddress() {
      if (!this.name.trim() || !this.address.trim()) {
        alert("Name oder Adresse darf nicht leer sein");
      } else if (
        this.nameRules.some((rule) => rule(this.name) !== true) ||
        this.addressRules.some((rule) => rule(this.address) !== true)
      ) {
        alert("Falsche Eingabe, bitte korrigieren");
      } else {
        let url = new URL(origin + "/api/address");
        let data = new FormData();
        data.append("name", this.name);
        data.append("address", this.address);
        data.append("_csrf", this.csrfToken); 

        fetch(url, {
          method: "POST",
          body: data,
        }).then((result) => {
          this.loadCsrfToken();
          this.$router.push("/checkout");
        })
          .catch((error) => {
            console.error("Fehler beim Absenden der Adresse:", error);
        });
        
      }
    },
  },

  template: `
  <div class="container">
  <input type="hidden" name="_csrf" v-model="csrfToken" />
      <h1 style="text-align: center" >Versand Info</h1>
      <v-sheet class="mx-auto"max-width="500">
        <v-form>
          <v-text-field v-model="name" :rules="nameRules" label="Name"></v-text-field>
          <v-text-field v-model="address" :rules="addressRules" label="Adresse"></v-text-field>
        </v-form>
      </v-sheet>


      <v-row justify="center" class="mt-4">
        <v-btn  class="standard-btn" rounded="xl" to="/">Weiter einkaufen</v-btn>
        <v-btn class="standard-btn"  color="#8d6e63" rounded="xl" @click="submitAddress"><span style="color:white">Bestellung abschliessen</span></v-btn>
        </v-row>    
      </div>
  `,
};
