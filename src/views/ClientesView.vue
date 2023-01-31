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

          <listado-clientes></listado-clientes>

        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import ListadoClientes from '@/components/ListadoClientes.vue';

export default {
  name: 'ClientesView',
  components: {
    ListadoClientes,
  }
}
</script>