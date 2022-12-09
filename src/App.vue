<template>
  <v-app>
    <v-snackbar v-model="snackbar" timeout=1500 :color="snack_color">
      {{ snack_message }}
    </v-snackbar>
    <login-form :users="users" @login="logged_user = $event" @show_message="snackbar = $event" @login_message="snack_message = $event" @login_color="snack_color = $event"/>
    <sign-up-form @new_user="addUser($event)" @show_message="snackbar = $event" @login_message="snack_message = $event" @login_color="snack_color = $event"/>
  </v-app>
</template>

<script>
import LoginForm from './components/LoginForm.vue';
import SignUpForm from './components/SignUpForm.vue';

export default {
  name: 'App',

  components: {
    LoginForm,
    SignUpForm,
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

  methods: {
    addUser(event) {
      this.users.push({
        id: this.users.length + 1,
        name: event.name,
        email: event.email,
        password: event.password,
      });
      this.logged_user = this.users.find(user => user.email === event.email && user.password === event.password);
    },
  },
};
</script>
