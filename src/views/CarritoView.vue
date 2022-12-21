<template>
  <div class="home">
    <v-container>
      <v-row>
        <v-col cols="12">
          <v-layout justify-center>
            <h2 class="grey--text">Carrito de compras</h2>
          </v-layout>
          <v-layout justify-center>
            <carrito-compras :cart="cart"></carrito-compras>
          </v-layout>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import axios from 'axios';
import CarritoCompras from '@/components/CarritoCompras.vue';

export default {
  name: 'CarritoView',
  components: {
    CarritoCompras,
  },
  data() {
    return {
      cart: [],
    };
  },
  created() {
    axios.get('http://dev-entropia2.cvmd.com.ar/api/cart')
      .then((response) => {
        this.cart = response.data.filter(product => product.user_id === this.$store.getters.getLoggedUser.id)
      })
      .catch((err) => {
        console.log("No se pudo obtener el carrito de compras");
        console.log(err);
      });
  },
}
</script>