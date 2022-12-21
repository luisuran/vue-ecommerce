<template>
    <v-simple-table class="full-width">
        <template v-slot:default>
            <thead>
                <tr>
                    <th class="text-left">
                        Producto
                    </th>
                    <th class="text-left">
                        Cantidad
                    </th>
                    <th class="text-left">
                        Precio
                    </th>
                    <th class="text-left">
                        Eliminar
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr v-if="cart.length === 0">
                    <td colspan="4" class="text-center">
                        No hay productos en el carrito
                    </td>
                </tr>
                <tr v-else v-for="watch in cart" :key="watch.id">
                    <td class="d-flex align-center">
                        <div class="d-flex align-center justify-center">
                            <img :src="getProduct(watch.product_id).picture" alt="" height="45">
                            <span class="text-capitalize">{{ getProduct(watch.product_id).name }}</span>
                        </div>
                    </td>
                    <td>{{ watch.cantidad }}</td>
                    <td>{{ getProduct(watch.product_id).price }}</td>
                    <td>
                        <v-btn icon @click="deleteFromCart(watch.id)">
                            <v-icon>mdi-delete</v-icon>
                        </v-btn>
                    </td>
                </tr>
            </tbody>
        </template>
    </v-simple-table>
</template>

<script>
import axios from 'axios';
import { mapMutations } from 'vuex';

export default {
    name: 'CarritoCompras',

    props: {
        cart: Array,
    },

    methods: {
        ...mapMutations(['setSnackbar', 'setSnackbarColor', 'setSnackbarText']),
        getProduct(id) {
            return this.$store.getters.getProductList.find(product => product.id === id);
        },
        deleteFromCart(id) {
            axios.delete(`http://dev-entropia2.cvmd.com.ar/api/cart/${id}`)
                .then(() => {
                    this.$router.go(-1);

                    this.setSnackbar(true);
                    this.setSnackbarColor('success');
                    this.setSnackbarText('Producto eliminado del carrito');
                })
                .catch((error) => {
                    this.setSnackbar(true);
                    this.setSnackbarColor('error');
                    this.setSnackbarText('Error al eliminar el producto del carrito');

                    console.log(error);
                });
        }
    },
}
</script>

<style>
    .full-width {
        width: 100%;
    }
</style>