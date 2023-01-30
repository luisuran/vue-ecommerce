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
                <tr v-else v-for="product in cart" :key="product.id">
                    <td class="d-flex align-center">
                        <div class="d-flex align-center justify-center">
                            <img :src="product.picture" alt="" height="45">
                            <span class="text-capitalize">{{ product.name }}</span>
                        </div>
                    </td>
                    <td>{{ product.cantidad }}</td>
                    <td>{{ product.price }}</td>
                    <td>
                        <v-btn icon @click="deleteFromCart(product.id)">
                            <v-icon>mdi-delete</v-icon>
                        </v-btn>
                    </td>
                </tr>
            </tbody>
        </template>
    </v-simple-table>
</template>

<script>
import { mapMutations } from 'vuex';

export default {
    name: 'CarritoCompras',

    props: {
        cart: Array,
    },

    methods: {
        ...mapMutations(['setSnackbar', 'setSnackbarColor', 'setSnackbarText', 'removeFromCart']),
        deleteFromCart(id) {
            const product = this.cart.find(product => product.id === id);

            this.removeFromCart(product);

            this.setSnackbar(true);
            this.setSnackbarColor('success');
            this.setSnackbarText('Producto eliminado del carrito');
        }
    },
}
</script>

<style>
    .full-width {
        width: 100%;
    }
</style>