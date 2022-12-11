<template>
  <v-app>
    <v-snackbar v-model="snackbar" timeout=1500 :color="snack_color">
      {{ snack_message }}
    </v-snackbar>
    <login-form :users="users" @login="logged_user = $event" @show_message="snackbar = $event" @login_message="snack_message = $event" @login_color="snack_color = $event"/>
    <sign-up-form @new_user="registerUser($event)" @show_message="snackbar = $event" @login_message="snack_message = $event" @login_color="snack_color = $event"/>
    <producto-detalle :watch="watches[0]" @add_to_cart="addToCart($event)"/>
    <listado-productos :watches="watches" @add_to_cart="addToCart($event)"/>
    <carrito-compras :cart="cart" @delete_from_cart="deleteFromCart($event)"/>
  </v-app>
</template>

<script>
import CarritoCompras from './components/CarritoCompras.vue';
import ListadoProductos from './components/ListadoProductos.vue';
import LoginForm from './components/LoginForm.vue';
import ProductoDetalle from './components/ProductoDetalle.vue';
import SignUpForm from './components/SignUpForm.vue';
import watches from './assets/datos/watches.json';
import users from './assets/datos/users.json';

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
    users: users,
    watches: watches,
    logged_user : null,
    snackbar: false,
    snack_message: "",
    snack_color: "",
    cart: [],
  }),

  methods: {
    registerUser(event) {
      this.users.push({
        id: this.users.length + 1,
        name: event.name,
        email: event.email,
        password: event.password,
      });
      this.logged_user = this.users.find(user => user.email === event.email && user.password === event.password);
    },
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
