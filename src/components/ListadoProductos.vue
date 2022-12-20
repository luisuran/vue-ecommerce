<template>
    <v-container>
        <v-layout row wrap>
            <v-flex xs12 md6 lg4 v-for="watch in watches" :key="watch.id" class="d-flex child-flex" cols="3">
                <producto-detalle :watch="watch" @add_to_cart="addToCart($event)" />
            </v-flex>
            <v-layout justify-center v-if="this.$store.getters.getLoggedUser && this.$store.getters.getLoggedUser.isAdmin">
                <v-icon x-large @click="addProduct">mdi-plus</v-icon>
            </v-layout>
        </v-layout>
    </v-container>
</template>

<script>
import ProductoDetalle from './ProductoDetalle.vue';

export default {
    name: 'ListadoProductos',

    components: {
        ProductoDetalle,
    },

    props: {
        watches: Array,
    },

    methods: {
        addToCart(event) {
            this.$emit('add_to_cart', event);
        },
        addProduct() {
            this.$router.push('/admin/new_product')
        }
    },
}
</script>

<style>

</style>