<template>
        <v-card-text>
            <v-form>
                <v-text-field v-model="name" label="Nombre" name="name" prepend-icon="mdi-watch" type="text" :rules="rules"></v-text-field>
                <v-text-field v-model="description" label="Descripción" name="description" prepend-icon="mdi-image-text" :rules="rules"></v-text-field>
                <v-text-field v-model="picture" label="URL con la foto del producto" name="picture" prepend-icon="mdi-image" :rules="rules"></v-text-field>
                <v-text-field v-model="price" label="Precio" name="price" prepend-icon="mdi-currency-usd" type="number" :rules="rules"></v-text-field>
                <v-layout justify-center my-3>
                    <v-btn color="primary" @click="addProduct">Agregar producto</v-btn>
                </v-layout>
            </v-form>
        </v-card-text>
</template>

<script>
import axios from 'axios';
import { mapActions } from 'vuex';

export default {
    name: 'ProductoForm',
    data: () => ({
        name: '',
        description: '',
        picture: '',
        price: 0,
        rules: [
            (v) => !!v || 'Este campo es requerido',
        ],
    }),
    methods: {
        ...mapActions(['getProductList']),
        addProduct() {
            axios.post('http://dev-entropia2.cvmd.com.ar/api/products', {
                name: this.name,
                description: this.description,
                picture: this.picture,
                price: this.price,
            })
                .then(() => {
                    this.getProductList();
                    this.$router.go(-1);
                })
                .catch((error) => {
                    console.log(error);
                });
        },
    },
}
</script>

<style>

</style>