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
        signUp() {
            if (!this.name) {
                this.$emit('show_message', true);
                this.$emit('login_message', 'El nombre es requerido');
                this.$emit('login_color', 'error');
                return;
            }
            if (!this.email) {
                this.$emit('show_message', true);
                this.$emit('login_message', 'El email es requerido');
                this.$emit('login_color', 'error');
                return;
            }
            if (!/.+@.+\..+/.test(this.email)) {
                this.$emit('show_message', true);
                this.$emit('login_message', 'El email es inválido');
                this.$emit('login_color', 'error');
                return;
            }
            if (!this.password) {
                this.$emit('show_message', true);
                this.$emit('login_message', 'El password es requerido');
                this.$emit('login_color', 'error');
                return;
            }
            if (!this.password2) {
                this.$emit('show_message', true);
                this.$emit('login_message', 'El password es requerido');
                this.$emit('login_color', 'error');
                return;
            }
            if (this.password !== this.password2) {
                this.$emit('show_message', true);
                this.$emit('login_message', 'Los passwords no coinciden');
                this.$emit('login_color', 'error');
                return;
            }
            
            const newUser = {
                name: this.name,
                email: this.email,
                password: this.password,
                isAdmin: this.isAdmin,
            };

            axios.post('http://dev-entropia2.cvmd.com.ar/api/users', newUser)
                .then(() => {
                    this.$emit('show_message', true);
                    this.$emit('login_message', 'Registro exitoso');
                    this.$emit('login_color', 'success');

                    axios.get('http://dev-entropia2.cvmd.com.ar/api/users')
                        .then(response => {
                            this.$emit('users', response.data);
                        })
                        .catch(error => {
                            console.log(error);
                        });
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