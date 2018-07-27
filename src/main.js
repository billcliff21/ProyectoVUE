//#region [ Imports ]
import Vue from 'vue';
import VueRouter from 'vue-router';
import {routes} from './routes';
import App from './App.vue'
import {store} from './store/store';
import 'animate.css';
import BootstrapVue from 'bootstrap-vue';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import VueFlashMessage from 'vue-flash-message';
require('vue-flash-message/dist/vue-flash-message.min.css');
//#endregion

Vue.use(VueFlashMessage);
Vue.use(VueRouter);
Vue.use(BootstrapVue);
const router = new VueRouter({
  routes
});
router.beforeEach((to, from, next) => {
  console.log('to=>', to);
  console.log('auth=>', store.state.usuarios.auth);
  next(store.state.usuarios.auth);
  //next(this.$store.getters.getAuth);


});

const vm= new Vue({
  el: '#app',
  router,
  store,  
  render: h => h(App)
});
