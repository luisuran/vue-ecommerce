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
  }),

  created() {
    this.getUserList();
    this.getProductList();
  },

  methods: {
    ...mapActions(['getUserList', 'getProductList']),
  },
};
</script>
