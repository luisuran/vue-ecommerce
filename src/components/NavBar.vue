<template>
    <v-app-bar app color="primary">
      <v-toolbar-title class="white--text" @click="$router.push('/')">Vue-commerce</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-dialog v-model="showLoginForm" max-width="400px" v-if="logged_in_user == null">
        <template v-slot:activator="{ on, attrs }">
          <v-btn color="primary" dark v-bind="attrs" v-on="on">
            Ingreso
          </v-btn>
        </template>
        <login-form :users="users" @login="logged_in_user = $event"></login-form>
      </v-dialog>

      <v-dialog v-model="showSignUpForm" max-width="400px" v-if="logged_in_user == null">
        <template v-slot:activator="{ on, attrs }">
          <v-btn color="primary" dark v-bind="attrs" v-on="on">
            Registro
          </v-btn>
        </template>
        <sign-up-form></sign-up-form>
      </v-dialog>

    <v-menu bottom min-width="200px" rounded offset-y v-if="logged_in_user != null">
        <template v-slot:activator="{ on, attrs }">
            <v-avatar v-if="logged_in_user != null" color="orange darken-3" size="40" class="mr-2 white--text"
                v-bind="attrs" v-on="on">
                {{ userInitials }}
            </v-avatar>
        </template>

        <v-card>
          <v-list-item-content class="justify-center">
            <div class="mx-auto text-center">
              <v-avatar
                color="orange darken-3"
              >
                <span class="white--text text-h5">{{ userInitials }}</span>
              </v-avatar>
              <h3>{{ logged_in_user.name }}</h3>
              <p class="text-caption mt-1">
                {{ logged_in_user.email }}
              </p>
              <v-divider class="my-3"></v-divider>
              <v-btn
                depressed
                rounded
                text
                @click="$router.push('/carrito')"
              >
                Mi carrito
              </v-btn>
              <v-divider class="my-3"></v-divider>
              <v-btn
                depressed
                rounded
                text
                @click="logged_in_user = null"
              >
                Cerrar sesión
              </v-btn>
            </div>
          </v-list-item-content>
        </v-card>
    </v-menu>

    </v-app-bar>
</template>

<script>
import axios from 'axios';
import LoginForm from '@/components/LoginForm.vue';
import SignUpForm from '@/components/SignUpForm.vue';

export default {
    name: 'NavBar',
    data: () => ({
        users: [],
        logged_in_user: null,
        showLoginForm: false,
        showSignUpForm: false,
    }),
    components: {
        LoginForm,
        SignUpForm,
    },
    created() {
      axios.get('http://dev-entropia2.cvmd.com.ar/api/users')
        .then(response => {
          this.users = response.data;
        })
        .catch(error => {
          console.log(error);
        });
    },
    computed: {
        userInitials() {
            return this.logged_in_user.name.split(' ').map(word => word[0].toUpperCase()).join('');
        }
    }
}
</script>

<style>

</style>