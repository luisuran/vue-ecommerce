<template>
  <v-app>
    <router-view />
  </v-app>
</template>

<script>
import axios from 'axios';

export default {
  name: 'App',

  components: {
  },

  data: () => ({
    users: [],
    watches: [],
    logged_user : null,
    snackbar: false,
    snack_message: "",
    snack_color: "",
    cart: [],
  }),

  created() {
    axios.get('http://dev-entropia2.cvmd.com.ar/api/users')
      .then(response => {
        this.users = response.data;
      })
      .catch(error => {
        console.log(error);
      });

    axios.get('http://dev-entropia2.cvmd.com.ar/api/products')
      .then(response => {
        this.watches = response.data;
      })
      .catch(error => {
        console.log(error);
      });
  },

  methods: {
    addToCart(event) {
      const index = this.cart.findIndex(item => item.id === event.id);
      if (index === -1) {
        this.cart.push({
          id: event.id,
          name: event.name,
          price: event.price,
          picture: event.picture,
          quantity: 1,
        });
      } else {
        this.cart[index].quantity += 1;
      }
    },
    deleteFromCart(event) {
      const watch = this.cart.find(item => item.id === event);

      if (watch.quantity > 1) {
        watch.quantity -= 1;
      } else {
        this.cart.splice(this.cart.indexOf(watch), 1);
      }
    },
  },
};
</script>
