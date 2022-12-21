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
        ...mapMutations(['setLoggedUser', 'setSnackbar', 'setSnackbarText', 'setSnackbarColor']),
        ...mapActions(['getUserList']),
        signUp() {
            if (!this.name) {
                this.setSnackbar(true);
                this.setSnackbarText('El nombre es requerido');
                this.setSnackbarColor('error');

                return;
            }
            if (!this.email) {
                this.setSnackbar(true);
                this.setSnackbarText('El email es requerido');
                this.setSnackbarColor('error');

                return;
            }
            if (!/.+@.+\..+/.test(this.email)) {
                this.setSnackbar(true);
                this.setSnackbarText('El email es inválido');
                this.setSnackbarColor('error');

                return;
            }
            if (!this.password) {
                this.setSnackbar(true);
                this.setSnackbarText('El password es requerido');
                this.setSnackbarColor('error');

                return;
            }
            if (!this.password2) {
                this.setSnackbar(true);
                this.setSnackbarText('El password es requerido');
                this.setSnackbarColor('error');

                return;
            }
            if (this.password !== this.password2) {
                this.setSnackbar(true);
                this.setSnackbarText('Los passwords no coinciden');
                this.setSnackbarColor('error');

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

                    this.setSnackbar(true);
                    this.setSnackbarText(`Bienvenido ${response.data.name}`);
                    this.setSnackbarColor('success');
                })
                .catch(error => {
                    this.setSnackbar(true);
                    this.setSnackbarText('Ocurrió un error al registrarse');
                    this.setSnackbarColor('error');

                    console.log(error);
                });
        },
    },
}
</script>