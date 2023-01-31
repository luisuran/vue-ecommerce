<template>
    <v-simple-table>
        <template v-slot:default>
            <thead>
                <tr>
                    <th class="text-left">ID</th>
                    <th class="text-left">Usuario</th>
                    <th class="text-left">Fecha</th>
                    <th class="text-left">Estado</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="pedido in pedidos" :key="pedido.id">
                    <td>{{ pedido.id }}</td>
                    <td>{{ getUserName(pedido.user_id) }}</td>
                    <td>{{ formatFecha(pedido.created_at) }}</td>
                    <td>
                        <v-chip v-if="pedido.estado === 'nuevo'" color="green" text-color="white">
                            Nuevo
                        </v-chip>
                        <v-chip v-else-if="pedido.estado === 'en viaje'" color="cyan" text-color="white">
                            En viaje
                        </v-chip>
                        <v-chip v-else-if="pedido.estado === 'entregado'" color="orange" text-color="white">
                            Entregado
                        </v-chip>

                        <detalle-pedido :pedido="pedido" class="float-right" @update-pedidos="pedidos = $event"></detalle-pedido>
                    </td>
                </tr>
            </tbody>
        </template>
    </v-simple-table>    
</template>

<script>
import axios from 'axios';
import DetallePedido from './DetallePedido.vue';

export default {
    name: 'ListadoPedidos',

    components: {
        DetallePedido,
    },

    data() {
        return {
            pedidos: [],
        };
    },

    created() {
        axios.get('https://dev-entropia2.cvmd.com.ar/api/orders')
        .then((response) => {
            this.pedidos = response.data;
        });
    },

    methods: {
        getUserName(id) {
            const user = this.$store.getters.getUserList.find(user => user.id === id);

            return user.name;
        },
        formatFecha (fecha) {
            return new Date(fecha).toLocaleDateString();
        }
    }
};
</script>