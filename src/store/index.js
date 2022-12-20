import axios from 'axios';
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    logged_in_user: null,
    users: [],
  },
  getters: {
    getLoggedUser: state => {
      return state.logged_in_user;
    },
    getUserList: state => {
      return state.users;
    }
  },
  mutations: {
    setLoggedUser: (state, user) => {
      state.logged_in_user = user;
    },
    setUserList: (state, users) => {
      state.users = users;
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
    } 
  },
  modules: {
  }
})
