import axios from 'axios';
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    logged_in_user: null,
    users: [],
    products: [],
  },
  getters: {
    getLoggedUser: state => {
      return state.logged_in_user;
    },
    getUserList: state => {
      return state.users;
    },
    getProductList: state => {
      return state.products;
    },
    getCart: state => {
      return state.logged_in_user.cart;
    },
  },
  mutations: {
    setLoggedUser: (state, user) => {
      state.logged_in_user = user;
    },
    setUserList: (state, users) => {
      state.users = users;
    },
    setProductList: (state, products) => {
      state.products = products;
    },
  },
  actions: {
    getUserList: function() {
      axios.get('http://dev-entropia2.cvmd.com.ar/api/users')
      .then(response => {
        this.commit('setUserList', response.data)
      })
      .catch(error => {
        console.log(error);
      });
    },
    getProductList: function() {
      axios.get('http://dev-entropia2.cvmd.com.ar/api/products')
      .then(response => {
        this.commit('setProductList', response.data)
      })
      .catch(error => {
        console.log(error);
      });
    },
  },
  modules: {
  }
})
