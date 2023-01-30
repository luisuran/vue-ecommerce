<template>
    <v-container
        class="fill-height"
        fluid
        style="min-height: 434px"
    >
    <v-row 
        align="center"
        justify="center"
    >
        <v-col
            cols="12"
            md="6"
        >
            <v-img
                :src="watch.picture"
                aspect-ratio="1"
                contain
            ></v-img>
        </v-col>
        <v-col
            cols="12"
            md="6"
        >
            <h1 class="text-uppercase mb-5">{{ watch.name }}</h1>
            <h4>{{ watch.description }}</h4>
            <h3 class="mt-3">${{ watch.price }}</h3>

            <v-btn 
                v-if="this.$store.getters.getLoggedUser && !this.$store.getters.getLoggedUser.isAdmin" 
                color="primary" 
                class="mt-6" 
                @click="addToCart()"
            >
                Agregar al carrito
            </v-btn>
        </v-col>
    </v-row>
    </v-container>
</template>

<script>
    import { mapActions, mapMutations } from 'vuex';
    import axios from 'axios';

    export default {
        name: 'ProductoDetalleView', 
        data: () => ({
            watch: {},
        }),
        mounted() {
            const watch_id = this.$route.params.id;
            const watches = this.$store.getters.getProductList;
            this.watch = watches.find(watch => watch.id == watch_id);
        },
        methods: {
            ...mapActions(['getProductList', 'getUserList']),
            ...mapMutations(['setSnackbar', 'setSnackbarColor', 'setSnackbarText']),
            addToCart() {
                const product_id = Number(this.$route.params.id);
                const user_id = this.$store.getters.getLoggedUser.id;
                const cart = this.$store.getters.getCart;

                const product_cart = cart.find((product) => product.product_id === product_id && product.user_id === user_id);

                if (product_cart) {
                    axios.put(`http://dev-entropia2.cvmd.com.ar/api/cart/${product_cart.id}`, {
                        cantidad: product_cart.cantidad + 1,
                    })
                        .then(() => {
                            this.getUserList();
                        })
                        .catch((err) => {
                            console.log(err);
                        });
                    return;
                } else {
                    axios.post(`http://dev-entropia2.cvmd.com.ar/api/cart`, {
                        product_id: this.watch.id,
                        user_id: this.$store.getters.getLoggedUser.id,
                        cantidad: 1,
                    })
                        .then(() => {
                            this.getUserList();
                        })
                        .catch((err) => {
                            console.log(err);
                        });
                }

                this.setSnackbar(true);
                this.setSnackbarColor('success');
                this.setSnackbarText('Producto agregado al carrito');
            }
        }
    }
</script>

<style lang="sass" scoped>

</style>