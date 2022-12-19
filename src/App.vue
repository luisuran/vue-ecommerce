<template>
  <v-app>
    <nav>
      <router-link to="/">Home</router-link>
      <router-link to="/about">About</router-link>
    </nav>
    <router-view />

    <v-snackbar v-model="snackbar" timeout=1500 :color="snack_color">
      {{ snack_message }}
    </v-snackbar>
    <login-form :users="users" @login="logged_user = $event" @show_message="snackbar = $event" @login_message="snack_message = $event" @login_color="snack_color = $event"/>
    <sign-up-form @users="users = $event" @show_message="snackbar = $event" @login_message="snack_message = $event" @login_color="snack_color = $event"/>
    <producto-detalle :watch="watches[0]" @add_to_cart="addToCart($event)"/>
    <listado-productos :watches="watches" @add_to_cart="addToCart($event)"/>
    <carrito-compras :cart="cart" @delete_from_cart="deleteFromCart($event)"/>
  </v-app>
</template>

<script>
import axios from 'axios';
import CarritoCompras from './components/CarritoCompras.vue';
import ListadoProductos from './components/ListadoProductos.vue';
import LoginForm from './components/LoginForm.vue';
import ProductoDetalle from './components/ProductoDetalle.vue';
import SignUpForm from './components/SignUpForm.vue';

export default {
  name: 'App',

  components: {
    CarritoCompras,
    ListadoProductos,
    LoginForm,
    SignUpForm,
    ProductoDetalle,
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
