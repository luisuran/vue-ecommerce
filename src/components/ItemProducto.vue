<template>
    <v-card 
        class="mx-auto my-2 elevation-5" 
        max-width="300" 
        @mouseenter="addElevation"
        @mouseleave="removeElevation"
        @click="$router.push(`/product/${watch.id}`)"
    >
        <v-img :src="watch.picture"></v-img>
        <v-layout justify-center>
            <v-card-title class="text-center text-uppercase">{{ watch.name }}</v-card-title>
        </v-layout>
        <v-card-text class="py-0" min-height="200" align="center">{{ watch.short_description }}</v-card-text>
        <v-layout justify-center>
            <v-card-subtitle class="text-subtitle-2">${{ watch.price }}</v-card-subtitle>
        </v-layout>
        <v-layout justify-center v-if="this.$store.getters.getLoggedUser && !this.$store.getters.getLoggedUser.isAdmin">
            <v-btn color="primary" class="mb-3" @click="addToCart()">Agregar al carrito</v-btn>
        </v-layout>
        <v-layout justify-center v-if="this.$store.getters.getLoggedUser && this.$store.getters.getLoggedUser.isAdmin">
            <v-btn icon class="mx-6 mb-1" color="primary lighten-1" @click="editProduct(watch.id)">
                <v-icon x-large>mdi-pencil</v-icon>
            </v-btn>
            <v-dialog v-model="dialog" max-width="400px">
                <template v-slot:activator="{ on, attrs }">
                    <v-btn icon class="mx-6 mb-1" color="error lighten-1" v-bind="attrs" v-on="on">
                        <v-icon x-large>mdi-delete</v-icon>
                    </v-btn>
                </template>
                <v-card>
                    <v-card-title class="text-h5">
                        ¿Estás seguro de eliminar {{ watch.name }}?
                    </v-card-title>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="primary darken-1" text @click="deleteProduct(watch.id)">
                            Si
                        </v-btn>
                        <v-btn color="primary darken-1" text @click="dialog = false">
                            No
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </v-layout>
    </v-card>
</template>

<script>
import { mapActions, mapMutations } from 'vuex';
import axios from 'axios';

export default {
    name: 'ItemProducto',

    data: () => ({
        dialog: false,
    }),

    props: {
        watch: Object,
    },

    methods: {
        ...mapActions(['getProductList', 'getUserList']),
        ...mapMutations(['setSnackbar', 'setSnackbarColor', 'setSnackbarText']),
        addToCart() {
            const product_id = this.watch.id;
            const cart = this.$store.getters.getCart;

            // Verifico si el producto ya está en el carrito
            const product_cart = cart.find((product) => product.id === product_id);

            if (product_cart) {
                // Si ya está, sumarle 1 a la cantidad
                product_cart.cantidad += 1;
            } else {
                // Si no está, agregarlo al carrito
                cart.push({
                    name: this.watch.name,
                    picture: this.watch.picture,
                    price: this.watch.price,
                    id: product_id,
                    cantidad: 1,
                })
            }

            this.setSnackbar(true);
            this.setSnackbarColor('success');
            this.setSnackbarText('Producto agregado al carrito');
        },
        editProduct(id) {
            this.$router.push(`/admin/product/${id}`)
        },
        deleteProduct(id) {
            axios.delete(`https://dev-entropia2.cvmd.com.ar/api/products/${id}`)
                .then(() => {
                    this.getProductList();
                })
                .catch((err) => {
                    console.log(err);
                });

            this.dialog = false;
        },
        addElevation(e) {
                e.target.classList.remove("elevation-5");
                e.target.classList.add("elevation-20");
        },
        removeElevation(e) {
                e.target.classList.remove("elevation-20");
                e.target.classList.add("elevation-5");
        },
    },
}
</script>

<style>

</style>