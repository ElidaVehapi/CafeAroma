// AddressForm.vue
export default {
  data() {
    return {
      firstName: "",
      lastName: "",
      address: "",
      country: "",
      zip: "",
      sameAddress: false,
      saveInfo: false,
      paymentMethod: "credit",
    };
  },
  template: `
      <div class="col-md-8 order-md-1">
        <h4 class="mb-3">Billing address</h4>
        <form class="needs-validation" novalidate @submit.prevent="submitForm">
          <div class="row">
            <div class="col-md-6 mb-3">
              <label for="firstName">First name</label>
              <input
                v-model="firstName"
                type="text"
                class="form-control"
                id="firstName"
                placeholder=""
                required
              />
              <div class="invalid-feedback">Valid first name is required.</div>
            </div>
            <div class="col-md-6 mb-3">
              <label for="lastName">Last name</label>
              <input
                v-model="lastName"
                type="text"
                class="form-control"
                id="lastName"
                placeholder=""
                required
              />
              <div class="invalid-feedback">Valid last name is required.</div>
            </div>
          </div>
  
          <div class="mb-3">
            <label for="address">Address</label>
            <input
              v-model="address"
              type="text"
              class="form-control"
              id="address"
              placeholder="Gartenstr. 123"
              required
            />
            <div class="invalid-feedback">Please enter your shipping address.</div>
          </div>
  
          <div class="row">
            <div class="col-md-5 mb-3">
              <label for="country">Country</label>
              <input
                v-model="country"
                type="text"
                class="form-control"
                id="country"
                placeholder=""
                required
              />
              <div class="invalid-feedback">Please enter your country</div>
            </div>
  
            <div class="col-md-3 mb-3">
              <label for="zip">Plz</label>
              <input
                v-model="zip"
                type="text"
                class="form-control"
                id="zip"
                placeholder=""
                required
              />
              <div class="invalid-feedback">Plz required.</div>
            </div>
          </div>
  
          <hr class="mb-4" />
          <div class="custom-control custom-checkbox">
            <input
              v-model="sameAddress"
              type="checkbox"
              class="custom-control-input"
              id="same-address"
            />
            <label class="custom-control-label" for="same-address"
              >Shipping address is the same as my billing address</label
            >
          </div>
          <div class="custom-control custom-checkbox">
            <input
              v-model="saveInfo"
              type="checkbox"
              class="custom-control-input"
              id="save-info"
            />
            <label class="custom-control-label" for="save-info"
              >Save this information for next time</label
            >
          </div>
          <hr class="mb-4" />
          <!--PAYMENT-->
          <h4 class="mb-3">Payment</h4>
  
          <div class="d-block my-3">
            <div class="custom-control custom-radio">
              <input
                v-model="paymentMethod"
                id="credit"
                name="paymentMethod"
                type="radio"
                class="custom-control-input"
                checked
                required
              />
              <label class="custom-control-label" for="credit">Credit card</label>
            </div>
            <!-- Weitere Payment-Optionen hier hinzufügen -->
          </div>
  
          <hr class="mb-4" />
          <button class="brown-button" type="submit">
            Continue to checkout
          </button>
        </form>
      </div>
    `,
  methods: {
    async submitForm() {
      try {
        // Führe hier deine AJAX-Anfrage an den Server durch, um die Daten zu speichern
        const response = await fetch("/api/checkout", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            firstName: this.firstName,
            lastName: this.lastName,
            address: this.address,
            country: this.country,
            zip: this.zip,
            sameAddress: this.sameAddress,
            saveInfo: this.saveInfo,
            paymentMethod: this.paymentMethod,
          }),
        });

        if (response.ok) {
          // Erfolgreich gespeichert, du kannst eine Weiterleitung oder eine andere Aktion durchführen
          console.log("Formular erfolgreich abgesendet!");
        } else {
          // Fehler beim Speichern
          console.error(
            "Fehler beim Speichern des Formulars:",
            response.statusText
          );
        }
      } catch (error) {
        console.error("Fehler beim Absenden des Formulars:", error.message);
      }
    },
  },
};
