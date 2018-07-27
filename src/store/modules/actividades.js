import ModuloCnx from '../connect';

const ModuloActividades = (function (GlCnx) {

  // Propiedades    
  console.log("GlCnx", GlCnx);
  const _db = GlCnx.db;
  const actividadesRef = _db.ref('Actividades');
  //let _actividades = [];
  // Metodos
  function getActividades(actividades)  {
   return new Promise((resolve, reject) => {
    actividadesRef.on('value',snapshot => {
      actividades = GlCnx.snapshotToArray(snapshot);      
      console.log("actividades:", actividades);
        resolve(actividades);
        return actividades;
      });
   }) 
  }

  // Publicacion
  return {
    getActividades: getActividades,
  };

})(ModuloCnx);

const getters ={
    getActividades: (state) => {
      return state.actividades
    },
};

const mutations={
    setActividades:(state,actividades) => {
      console.log("setActividades=>",actividades)
      state.actividades = actividades;
    },  
};


const actions = {

  GetAllActividades: ({
    commit
  }) => {
    // Do something here... lets say, a http call using vue-resource
    ModuloActividades.getActividades(state.actividades).then(response => {
        // http success, call the mutator and change something in state
        console.log("GetAllActividades=>", response);
        commit('setActividades', response);
      })
      .catch(e => {
        console.warn("error=>", e);
      });
  },
}

export default {
    state: {
        actividades: [],      
        actividadesdb:ModuloActividades.getActividades,
    },
    getters,
    mutations,
    actions,
  };