<template>
    <v-row justify="center">
        <v-dialog v-model="dialog" max-width="300">
            <template v-slot:activator="{ on, attrs }">
                <v-btn icon v-bind="attrs" v-on="on">
                    <v-icon>mdi-information-outline</v-icon>
                </v-btn>
            </template>
            <v-card>
                <v-card-title class="text-h5">
                    Detalle del pedido {{ pedido.id }}
                </v-card-title>
                <v-list-item>
                    <v-list-item>
                        <v-list-item-content>
                            <v-list-item-title>Producto</v-list-item-title>
                            <v-list-item-subtitle v-for="cart in pedido.cart" :key="cart.id">
                                {{ cart.name }}
                            </v-list-item-subtitle>
                        </v-list-item-content>
                    </v-list-item>
                    <v-list-item>
                        <v-list-item-content>
                            <v-list-item-title>Cantidad</v-list-item-title>
                            <v-list-item-subtitle v-for="cart in pedido.cart" :key="cart.id">
                                {{ cart.cantidad }}
                            </v-list-item-subtitle>
                        </v-list-item-content>
                    </v-list-item>
                </v-list-item>

                <v-divider></v-divider>

                <v-radio-group v-model="estadoPedido" column>
                    <template v-slot:label>
                        <h3>Cambiar estado</h3>
                    </template>
                    <v-radio v-for="estado in ['nuevo', 'en viaje', 'entregado']" :key="estado" :label="estado"
                        :value="estado"></v-radio>
                </v-radio-group>

                <v-card-actions>
                    <v-btn text @click="dialog = false">
                        Cancelar
                    </v-btn>

                    <v-btn text @click="actualizarPedido()">
                        Actualizar
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-row>
</template>

<script>
import axios from 'axios';

export default {
    name: 'DetallePedido',

    props: {
        pedido: {
            type: Object,
            required: true,
        },
    },

    data() {
        return {
            dialog: false,
            estadoPedido: this.pedido.estado,
        }
    },

    methods: {
        getUserName(id) {
            const user = this.$store.getters.getUserList.find(user => user.id === id);

            return user.name;
        },
        actualizarPedido() {
            axios.put(`https://dev-entropia2.cvmd.com.ar/api/orders/${this.pedido.id}`, {
                estado: this.estadoPedido,
            })
            .then(() => {
                axios.get('https://dev-entropia2.cvmd.com.ar/api/orders')
                .then((response) => {
                    this.$emit('update-pedidos', response.data);
                });

                this.dialog = false;
            })
            .catch((error) => {
                console.log(error);
            });
        }
    },
}
</script>