<template>
  <div class="home">
    <v-img src="/banner_ofertas.png" class="banner"></v-img>
    <v-container>
      <v-row>
        <v-col cols="12">
          <v-layout justify-center>
            <h2 class="grey--text">Productos destacados</h2>
          </v-layout>
          <listado-productos :watches="watches"></listado-productos>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import axios from 'axios';
import ListadoProductos from '@/components/ListadoProductos.vue';

export default {
  name: 'HomeView',
  components: {
    ListadoProductos,
  },
  data: () => ({
    watches: [],
  }),
  created: function () {
    axios.get('http://dev-entropia2.cvmd.com.ar/api/products')
      .then(response => {
        this.watches = response.data;
      })
      .catch(error => {
        console.log(error);
      });
  },
}
</script>
