<template>
  <v-app>
    <nav-bar></nav-bar>
    <v-main>
      <router-view />
    </v-main>
    <v-snackbar
      v-model="this.$store.getters.getSnackbar"
      color="this.$store.getters.getSnackbarColor"
    >
      {{ this.$store.getters.getSnackbarText }}

      <template v-slot:action="{ attrs }">
        <v-btn
          icon
          v-bind="attrs"
          @click="closeSnackbar"
        >
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </template>
    </v-snackbar>
  </v-app>
</template>

<script>
import { mapActions, mapMutations } from 'vuex';
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
    ...mapMutations(['setSnackbar', 'setSnackbarText', 'setSnackbarColor']),
    closeSnackbar() {
      this.setSnackbar(false);
      this.setSnackbarText('');
      this.setSnackbarColor('');
    },
  },
};
</script>
