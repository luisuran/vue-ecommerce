<template>
 <v-card class="mx-auto my-auto" max-width="300">
    <v-img :src="watch.picture"></v-img>
    <v-layout justify-center>
        <v-card-title class="text-center">{{tituloMayusculas}}</v-card-title>
    </v-layout>
    <v-card-text class="py-0">{{watch.description}}</v-card-text>
    <v-layout justify-center>
        <v-card-subtitle class="text-subtitle-2">${{watch.price}}</v-card-subtitle>
    </v-layout>
    <v-layout justify-center>
        <v-btn color="primary" class="mb-3" @click="addToCart()">Agregar al carrito</v-btn>
    </v-layout>
 </v-card> 
</template>

<script>
export default {
    name: 'ProductoDetalle',

    data: () => ({
        cantidad: 0,
    }),

    props: {
        watch: Object,
    },

    computed: {
        tituloMayusculas() {
            return this.watch.name.toUpperCase();
        },
    },

    methods: {
        addToCart() {
            this.$emit('add_to_cart', this.watch);
        }
    },
}
</script>

<style>

</style>