<template>
  <div class="home">
    <v-container>
      <v-row>
        <v-col cols="12">
          <v-layout justify-center>
            <h2 class="grey--text">Productos</h2>
          </v-layout>
          <listado-productos :watches="this.$store.getters.getProductList"></listado-productos>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import ListadoProductos from '@/components/ListadoProductos.vue';

export default {
  name: 'UserView',
  components: {
    ListadoProductos,
  },
}
</script>