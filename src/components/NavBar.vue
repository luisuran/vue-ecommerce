<template>
    <v-app-bar app color="primary">
      <v-toolbar-title class="white--text pointer" @click="redirectHome()">Vue-commerce</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-dialog v-model="showLoginForm" max-width="400px" v-if="this.$store.getters.getLoggedUser == null">
        <template v-slot:activator="{ on, attrs }">
          <v-btn color="primary" dark v-bind="attrs" v-on="on">
            Ingreso
          </v-btn>
        </template>
        <login-form></login-form>
      </v-dialog>

      <v-dialog v-model="showSignUpForm" max-width="400px" v-if="this.$store.getters.getLoggedUser == null">
        <template v-slot:activator="{ on, attrs }">
          <v-btn color="primary" dark v-bind="attrs" v-on="on">
            Registro
          </v-btn>
        </template>
        <sign-up-form></sign-up-form>
      </v-dialog>

    <v-menu bottom min-width="200px" rounded offset-y v-if="this.$store.getters.getLoggedUser">
        <template v-slot:activator="{ on, attrs }">
            <v-avatar color="orange darken-3" size="40" class="mr-2 white--text" v-bind="attrs" v-on="on">
                <span class="white--text text-h5">{{ userInitials }}</span> 
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
              <h3>{{ this.$store.getters.getLoggedUser.name }}</h3>
              <p class="text-caption mt-1">
                {{ this.$store.getters.getLoggedUser.email }}
              </p>
              <div v-if="!this.$store.getters.getLoggedUser.isAdmin">
                <v-divider class="my-3"></v-divider>
                <v-btn
                  depressed
                  rounded
                  text
                  @click="$router.push('/carrito')"
                >
                  Mi carrito
                </v-btn>
              </div>
              <v-divider class="my-3"></v-divider>
              <v-btn
                depressed
                rounded
                text
                @click="signOut"
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
import { mapMutations } from 'vuex';
import LoginForm from '@/components/LoginForm.vue';
import SignUpForm from '@/components/SignUpForm.vue';

export default {
    name: 'NavBar',
    data: () => ({
        showLoginForm: false,
        showSignUpForm: false,
    }),
    components: {
        LoginForm,
        SignUpForm,
    },
    computed: {
        userInitials() {
            return this.$store.getters.getLoggedUser.name.split(' ').map(word => word[0].toUpperCase()).join('');
        }
    },
    methods: {
        ...mapMutations(['setLoggedUser']),
        signOut() {
            this.setLoggedUser(null);
            this.$router.push('/');
        },
        redirectHome() {
            if (!this.$store.getters.getLoggedUser) {
                this.$router.push('/');
            } else {
                if (this.$store.getters.getLoggedUser.isAdmin) {
                    this.$router.push('/admin');
                } else {
                    this.$router.push('/home');
                }
            }
        }
    },
    watch: {
        $route() {
            this.showLoginForm = false;
            this.showSignUpForm = false;
        }
    }
}
</script>

<style>
  .pointer {
    cursor: pointer;
  }
</style>