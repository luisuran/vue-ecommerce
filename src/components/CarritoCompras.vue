<template>
    <v-simple-table>
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
                <tr v-for="watch in cart" :key="watch.id">
                    <td class="d-flex align-center">
                        <div class="d-flex align-center justify-center">
                            <img :src="watch.picture" alt="" height="45">
                            <span class="text-capitalize">{{ watch.name }}</span>
                        </div>
                    </td>
                    <td>{{ watch.quantity }}</td>
                    <td>{{ watch.price }}</td>
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
        deleteFromCart(id) {
            this.$emit('delete_from_cart', id);
        }
    },
}
</script>

<style>

</style>