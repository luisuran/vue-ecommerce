<template>
     <v-card class="mx-auto my-auto">
        <v-card-title>Registro</v-card-title>
        <v-card-text>
            <v-form>
                <v-text-field v-model="name" label="Nombre" name="name" prepend-icon="mdi-account" type="text" :rules="rules"></v-text-field>
                <v-text-field v-model="email" label="Email" name="email" prepend-icon="mdi-email" type="email" :rules="rules_email"></v-text-field>
                <v-text-field v-model="password" label="Password" name="password" prepend-icon="mdi-lock" type="password" :rules="rules_password"></v-text-field>
                <v-text-field v-model="password2" label="Repetir Password" name="password2" prepend-icon="mdi-lock" type="password" :rules="rules_password"></v-text-field>
                <v-layout>
                    <v-checkbox
                        v-model="isAdmin"
                        label="¿Es administrador?"
                        color="primary"
                    ></v-checkbox>
                </v-layout>
                <v-layout justify-center my-3>
                    <v-btn color="primary" @click="signUp">Registrate</v-btn>
                </v-layout>
            </v-form>
        </v-card-text>
     </v-card>
</template>

<script>
import axios from 'axios';
import { mapMutations, mapActions } from 'vuex';

export default {
    name: 'SignUpForm',
    props: {},
    data: () => ({
        name: '',
        email: '',
        password: '',
        password2: '',
        isAdmin: false,
        rules: [
            v => !!v || 'Campo requerido',
        ],
        rules_email: [
            v => !!v || 'Campo requerido',
            v => /.+@.+\..+/.test(v) || 'Email inválido',
        ],
        rules_password: [
            v => !!v || 'Campo requerido',
            v => !/\s/.test(v) || 'No se permiten espacios',
        ]
    }),
    methods: {
        ...mapMutations(['setLoggedUser']),
        ...mapActions(['getUserList']),
        signUp() {
            if (!this.name) {
                return;
            }
            if (!this.email) {
                return;
            }
            if (!/.+@.+\..+/.test(this.email)) {
                return;
            }
            if (!this.password) {
                return;
            }
            if (!this.password2) {
                return;
            }
            if (this.password !== this.password2) {
                return;
            }
            
            const newUser = {
                name: this.name,
                email: this.email,
                password: this.password,
                isAdmin: this.isAdmin,
            };

            axios.post('http://dev-entropia2.cvmd.com.ar/api/users', newUser)
                .then(response => {
                    this.setLoggedUser(response.data);
                    this.getUserList();
                    
                    if (response.data.isAdmin) {
                        this.$router.push('/admin');
                    } else {
                        this.$router.push('/user');
                    }
                })
                .catch(error => {
                    console.log(error);
                });
        },
    },
}
</script>

<style>

</style>