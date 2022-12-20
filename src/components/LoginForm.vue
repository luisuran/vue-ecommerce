<template>
    <v-card class="mx-auto my-auto">
        <v-card-title>Ingreso</v-card-title>
        <v-card-text>
            <v-form>
                <v-text-field v-model="email" label="Email" name="email" prepend-icon="mdi-email" type="email" :rules="rules"></v-text-field>
                <v-text-field v-model="password" label="Password" name="password" prepend-icon="mdi-lock" type="password" :rules="rules"></v-text-field> 
                <v-layout justify-center my-3>
                    <v-btn color="primary" @click="login">Iniciar sesión</v-btn>
                </v-layout>
            </v-form>
        </v-card-text>
    </v-card>
</template>

<script>
import { mapMutations } from 'vuex';

export default {
    name: 'LoginForm',
    data: () => ({
        email: '',
        password: '',
        rules: [
            v => !!v || 'Campo requerido',
        ],
    }),

    methods: {
        ...mapMutations(['setLoggedUser']),
        login() {
            if (!this.email) {
                this.$emit('show_message', true);
                this.$emit('login_message', 'El email es requerido');
                this.$emit('login_color', 'error');
                return;
            }
            if (!this.password) {
                this.$emit('show_message', true);
                this.$emit('login_message', 'El password es requerido');
                this.$emit('login_color', 'error');
                return;
            }

            const user = this.$store.getters.getUserList.find(user => user.email === this.email && user.password === this.password);

            if (user) {
                this.setLoggedUser(user);   // Guardo el user logueado en el store

                if (user.isAdmin) {
                    this.$router.push('/admin');
                } else {
                    this.$router.push('/user');
                }
                //this.$emit('show_message', true);
                //this.$emit('login_message', 'Inicio exitoso');
                //this.$emit('login_color', 'success');
            } else {
                //this.$emit('show_message', true);
                //this.$emit('login_message', 'Vuelva a intentarlo');
                //this.$emit('login_color', 'error');
            }
        },
    },
}
</script>

<style>

</style>