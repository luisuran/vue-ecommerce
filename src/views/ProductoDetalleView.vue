<template>
    <v-container
        class="fill-height"
        fluid
        style="min-height: 434px"
    >
        <v-btn @click="$router.go(-1)" color="primary" dark>
            <v-icon dark left>
                mdi-arrow-left
            </v-icon>Volver
        </v-btn>
      
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
                const cart = this.$store.getters.getCart;

                // Verifico si el producto ya está en el carrito
                const product_cart = cart.find((product) => product.product_id === product_id);

                if (product_cart) {
                    // Si ya está, sumarle 1 a la cantidad
                    product_cart.cantidad += 1;
                } else {
                    // Si no está, agregarlo al carrito
                    cart.push({
                        name: this.watch.name,
                        picture: this.watch.picture,
                        price: this.watch.price,
                        id: product_id,
                        cantidad: 1,
                    })
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