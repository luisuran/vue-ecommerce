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
                            <img :src="getProduct(watch.id).picture" alt="" height="45">
                            <span class="text-capitalize">{{ getProduct(watch.id).name }}</span>
                        </div>
                    </td>
                    <td>{{ watch.cantidad }}</td>
                    <td>{{ getProduct(watch.id).price }}</td>
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
export default {
    name: 'CarritoCompras',

    props: {
        cart: Array,
    },

    methods: {
        getProduct(id) {
            return this.$store.getters.getProductList.find(product => product.id === id);
        },
        deleteFromCart(id) {
            this.$emit('delete_from_cart', id);
        }
    },
}
</script>

<style>
    .full-width {
        width: 100%;
    }
</style>