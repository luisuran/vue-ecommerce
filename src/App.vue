<template>
  <v-app>
    <v-snackbar v-model="snackbar" timeout=1500 :color="snack_color">
      {{ snack_message }}
    </v-snackbar>
    <login-form :users="users" @login="logged_user = $event" @show_message="snackbar = $event" @login_message="snack_message = $event" @login_color="snack_color = $event"/>
  </v-app>
</template>

<script>
import LoginForm from './components/LoginForm.vue';

export default {
  name: 'App',

  components: {
    LoginForm,
  },

  data: () => ({
    users: [
      {
        id: 1,
        name: 'Luis Uran',
        email: 'luisuran.bit@gmail.com',
        password: '123456',
      },
      {
        id: 2,
        name: 'Pepe',
        email: 'pepe@gmail.com',
        password: '123',
      }
    ],
    logged_user : null,
    snackbar: false,
    snack_message: "",
    snack_color: "",
  }),
};
</script>
