<template>
        <v-card-text>
            <v-form>
                <v-text-field :value="watch.name" label="Nombre" name="name" prepend-icon="mdi-watch" type="text" :rules="rules.required"></v-text-field>
                <v-text-field :value="watch.description" label="Descripción" name="description" prepend-icon="mdi-image-text" :rules="rules.required"></v-text-field>
                <v-text-field :value="watch.picture" label="URL con la foto del producto" name="picture" prepend-icon="mdi-image" :rules="rules.required"></v-text-field>
                <v-text-field :value="watch.price" label="Precio" name="price" prepend-icon="mdi-currency-usd" type="number" :rules="[rules.required, rules.price]"></v-text-field>
                <v-layout justify-center my-3>
                    <v-btn color="primary" @click="editProduct()">Editar producto</v-btn>
                </v-layout>
            </v-form>
        </v-card-text>
</template>

<script>
import axios from 'axios';
import { mapActions } from 'vuex';

export default {
    name: 'ProductoForm',
    props: {
        watch: Object,
    },
    data: () => ({
        rules: {
            required: (v) => !!v || 'Este campo es requerido',
            price: (v) => v > 0 || 'El precio debe ser mayor a 0',
        },
    }),
    methods: {
        ...mapActions(['getProductList', 'setSnackbar', 'setSnackbarText', 'setSnackbarColor']),
        editProduct() {
            axios.put(`https://dev-entropia2.cvmd.com.ar/api/products/${this.watch.id}`, {
                name: document.querySelector('input[name="name"]').value,
                description: document.querySelector('input[name="description"]').value,
                picture: document.querySelector('input[name="picture"]').value,
                price: document.querySelector('input[name="price"]').value,
            })
                .then(() => {
                    this.getProductList();
                    this.$router.go(-1);

                    this.setSnackbar(true);
                    this.setSnackbarText('Producto editado exitosamente');
                    this.setSnackbarColor('success');
                })
                .catch((error) => {
                    this.setSnackbar(true);
                    this.setSnackbarText('Error al editar el producto');
                    this.setSnackbarColor('error');

                    console.log(error);
                });
        },
    },
}
</script>

<style>

</style>