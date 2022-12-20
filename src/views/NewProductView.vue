<template>
    <v-container>
        <v-layout wrap>
            <producto-form></producto-form>
        </v-layout>
    </v-container>
</template>

<script>
import ProductoForm from '@/components/ProductoForm.vue';

export default {
    name: 'NewProductView',

    components: {
        ProductoForm,
    },

    data: () => ({
        watch: {
            name: '',
            price: '',
            picture: '',
            description: '',
        },
    }),

    methods: {
        addProduct() {
            this.$store.dispatch('addProduct', this.watch);
            this.$router.push('/admin/products');
        },
    },
}
</script>

<style>

</style>