<template>
  <v-app>
    <nav-bar></nav-bar>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import { mapActions } from 'vuex';
import NavBar from '@/components/NavBar.vue';

export default {
  name: 'App',

  components: {
    NavBar,
  },

  data: () => ({
    logged_user : null,
    snackbar: false,
    snack_message: "",
    snack_color: "",
    cart: [],
  }),

  created() {
    this.getUserList();
  },

  methods: {
    ...mapActions(['getUserList']),
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
