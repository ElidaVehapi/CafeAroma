export default {
    props: ['product'],
    data() {
      return {
        dialog: false,
      };
    },
    methods: {
        toggleDialog() {
            this.dialog = !this.dialog;
        }
    },
    template: `
              <div class="mt-2">
                  <div class="h4">{{ product.name }}</div>
                  <div class="d-flex justify-content-between">
                        <span class="ml-1" v-if="product.image" @click="toggleDialog()">(Bild anzeigen)</span>
                      <div>
                          <span class="h6"> {{ product.price }} &euro;</span>
                          <span :id="product.id" class="ml-2 btn btn-outline-primary" @click="$emit('order', product.id)">Bestellen</span>
                      </div>
                      <p></p>
                      <div class="dialog" v-if="dialog">
                        <div class="dialog-content">    
                        <button @click="toggleDialog()" class="close-icon" >x</button>
                        <img :src="'https://wetebucket.s3.us-west-2.amazonaws.com/'+product.image">
                        </div>
                      </div>
                  </div>
            </div>`
  };
  