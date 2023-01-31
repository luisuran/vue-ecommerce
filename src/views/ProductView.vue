<template>
    <v-container>
        <v-layout wrap>
            <edit-producto-form :watch="watch"></edit-producto-form>
        </v-layout>
    </v-container>
</template>

<script>
import axios from 'axios';
import EditProductoForm from '@/components/EditProductoForm.vue';

export default {
    name: 'NewProductView',

    components: {
        EditProductoForm,
    },

    data: () => ({
        watch: {}
    }),

    created() {
        const id = this.$route.params.id;
        axios.get(`https://dev-entropia2.cvmd.com.ar/api/products/${id}`)
            .then(response => {
                this.watch = response.data;
            })
            .catch(err => {
                console.log(err);
            });
    },
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