<template>
        <v-card class="mx-auto my-12">
            <v-card-title>Ingreso</v-card-title>
            <v-card-text>
                <v-form>
                    <v-text-field v-model="email" label="Email" name="email" prepend-icon="mdi-email" type="email"></v-text-field>
                    <v-text-field v-model="password" label="Password" name="password" prepend-icon="mdi-lock" type="password"></v-text-field>
                    <v-layout justify-center>
                        <v-btn color="primary" @click="login">Login</v-btn>
                    </v-layout>
                </v-form>
            </v-card-text>
        </v-card>
</template>

<script>
export default {
    name: 'LoginForm',
    props: {
        users: Array,
    },
    data: () => ({
        email: '',
        password: '',
    }),

    methods: {
        login() {
            const user = this.users.find(user => user.email === this.email && user.password === this.password);

            if (user) {
                this.$emit('login', user);
                this.$emit('show_message', true);
                this.$emit('login_message', 'Inicio exitoso');
                this.$emit('login_color', 'success');
            } else {
                this.$emit('show_message', true);
                this.$emit('login_message', 'Vuelva a intentarlo');
                this.$emit('login_color', 'error');
            }
        },
    },
}
</script>

<style>

</style>