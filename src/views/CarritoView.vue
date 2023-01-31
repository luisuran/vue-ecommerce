<template>
  <div class="home">
    <v-container>
      <v-row>
        <v-col cols="12">
          <v-layout justify-center>
            <h2 class="grey--text">Carrito de compras</h2>
          </v-layout>
          <v-layout justify-center>
            <carrito-compras></carrito-compras>
          </v-layout>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import CarritoCompras from '@/components/CarritoCompras.vue';

export default {
  name: 'CarritoView',
  components: {
    CarritoCompras,
  },
}
</script>