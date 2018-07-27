import Vue from 'vue';
import Vuex from 'vuex';
import usuarios from './modules/usuarios';
import actividades from './modules/actividades';
import tareas from './modules/tareas';
Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        
    },
    getters:{

    },
    actions:{

    },    
    mutations: {

     },
    modules: {
        usuarios,
        actividades,
        tareas,
    }
});
