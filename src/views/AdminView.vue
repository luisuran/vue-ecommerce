<template>
  <div class="home">
    <v-container>
      <v-row>
        <v-col cols="12">
          <v-layout justify-space-around>
            <router-link to="/admin">
              <h2 class="grey--text">Productos</h2>
            </router-link>
            <router-link to="/clientes">
              <h2 class="grey--text">Clientes</h2>
            </router-link>
            <router-link to="/pedidos">
              <h2 class="grey--text">Pedidos</h2>
            </router-link>
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
  name: 'AdminView',
  components: {
    ListadoProductos,
  }
}
</script>