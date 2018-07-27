<template>
  <div id="app">
    
      	<div class="container">
          <!-- Nav -->     
          <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
          <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <a class="navbar-brand" href="#">Menu</a>        
            <!-- Brand/logo -->
            <a class="navbar-brand" href="#">
                <img src="./images/logo.png" alt="logo" style="width:40px;">
            </a>
             <div id="navbarNavDropdown" class="navbar-collapse collapse">
                <!-- Links -->
                <ul class="navbar-nav mr-auto">               
                    <li class="nav-item">
                    <router-link to="/" exact active-class="nav-link active"  class="nav-link">Inicio</router-link>
                    </li>
                    <li class="nav-item">
                    <router-link to="/About" exact active-class="nav-link active"  class="nav-link">Acerca de</router-link>
                    </li>
                    <li class="nav-item">
                    <router-link to="/Actividades" exact active-class="nav-link active"  class="nav-link">Actividades</router-link>
                    </li>
                </ul>

            <ul class="navbar-nav" v-if="getAuth">
                <li class="nav-item">
                    <a class="nav-link">Bienvenido {{ getUsuarioActual.nombre }}</a>                    
                </li>  

                <li class="nav-item">
                    <router-link to="/UserProfile" exact active-class="nav-link active"  class="nav-link">Perfil de Usuario</router-link>
                </li>
                
                <li class="nav-item">
                    <a @click="sighOut" class="nav-link">Cerrar Sesión</a>                    
                </li>
            </ul>
            </div>
            </nav>            
              <transition
              v-if="getAuth"
              name="Animate.css"
              mode="out-in"
              enter-active-class="animated fadeIn">
                <router-view/>                
              </transition>                          
              <transition
              v-else
              mode="out-in"
              name="Animate.css"
              enter-active-class="animated fadeIn"
              leave-active-class="animated zoomOutUp">
                <Login></Login>
              </transition>
    </div>
  </div>
</template>

<script>
import $ from "jquery";
import './styles/app.css';
import "bootstrap";
import Login from "./components/login.vue";
import { mapMutations, mapGetters } from "vuex";
export default {
  name: "app",
  components: { Login },
  mounted(){
     //currentUserAsync
     //this.$store.dispatch("currentUserAsync");
     console.log("mouted del app");
  },
  computed: mapGetters(['getAuth','getUsuarioActual']),
  methods: {
    sighOut(){
      this.$store.commit('sighOut');
    },

  },
  
  

};
</script>

<style lang="scss">

@import "styles/custom-bootstrap.scss";
@import "../node_modules/bootstrap/scss/bootstrap.scss";
</style>