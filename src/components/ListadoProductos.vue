<template>
    <v-container>
        <v-layout row wrap>
            <v-flex xs12 md6 lg4 v-for="watch in watches" :key="watch.id" class="d-flex child-flex" cols="3">
                <item-producto talle :watch="watch" />
            </v-flex>
            <v-layout justify-center v-if="this.$store.getters.getLoggedUser && this.$store.getters.getLoggedUser.isAdmin">
                <v-icon x-large @click="addProduct">mdi-plus</v-icon>
            </v-layout>
        </v-layout>
    </v-container>
</template>

<script>
import ItemProducto from './ItemProducto.vue';

export default {
    name: 'ListadoProductos',

    components: {
        ItemProducto,
    },

    props: {
        watches: Array,
    },

    methods: {
        addProduct() {
            this.$router.push('/admin/new_product')
        }
    },
}
</script>

<style>

</style>