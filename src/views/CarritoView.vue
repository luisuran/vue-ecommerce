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
import { mapActions } from 'vuex';
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
    this.cart = this.$store.getters.getCart;
  },
  methods: {
    ...mapActions(['getUserList', 'getProductList']),
  },
}
</script>