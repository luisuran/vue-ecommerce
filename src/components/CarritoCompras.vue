<template>
    <div class="full-width">
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
    <v-btn 
        class="mt-5 float-right" 
        @click="sendOrder()"
        v-if="cart.length > 0"
    > 
        Finalizar pedido
    </v-btn>
    </div>
</template>

<script>
import { mapMutations } from 'vuex';
import axios from 'axios';

export default {
    name: 'CarritoCompras',

    data() {
        return {
            cart: [],
        }
    },

    created() {
        this.cart = this.$store.getters.getCart;
    },

    methods: {
        ...mapMutations(['setSnackbar', 'setSnackbarColor', 'setSnackbarText', 'removeFromCart', 'emptyCart']),
        deleteFromCart(id) {
            const product = this.cart.find(product => product.id === id);
            this.removeFromCart(product);

            this.cart = this.$store.getters.getCart;

            this.setSnackbar(true);
            this.setSnackbarColor('success');
            this.setSnackbarText('Producto eliminado del carrito');
        },
        sendOrder() {
            const user = this.$store.getters.getLoggedUser;

            axios.post('http://dev-entropia2.cvmd.com.ar/api/orders', {
                user_id: user.id,
                cart: this.cart,
            })
            .then(() => {
                this.emptyCart();

                this.cart = this.$store.getters.getCart;

                this.setSnackbar(true);
                this.setSnackbarColor('success');
                this.setSnackbarText('Pedido enviado con éxito');
            })
            .catch(error => {
                console.log(error);

                this.setSnackbar(true);
                this.setSnackbarColor('error');
                this.setSnackbarText('Error al enviar el pedido');
            });
        },
    },
}
</script>

<style>
    .full-width {
        width: 100%;
    }
</style>