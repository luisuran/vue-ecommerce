<template>
    <v-card class="mx-auto my-2" max-width="300">
        <v-img :src="watch.picture"></v-img>
        <v-layout justify-center>
            <v-card-title class="text-center text-uppercase">{{ watch.name }}</v-card-title>
        </v-layout>
        <v-card-text class="py-0" min-height="200">{{ watch.description }}</v-card-text>
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
import { mapActions } from 'vuex';
import axios from 'axios';

export default {
    name: 'ProductoDetalle',

    data: () => ({
        dialog: false,
    }),

    props: {
        watch: Object,
    },

    methods: {
        ...mapActions(['getProductList']),
        addToCart() {
            this.$emit('add_to_cart', this.watch);
        },
        editProduct(id) {
            this.$router.push(`/admin/product/${id}`)
        },
        deleteProduct(id) {
            axios.delete(`http://dev-entropia2.cvmd.com.ar/api/products/${id}`)
                .then(() => {
                    this.getProductList();
                })
                .catch((err) => {
                    console.log(err);
                });

            this.dialog = false;
        },
    },
}
</script>

<style>

</style>