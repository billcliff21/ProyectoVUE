import ModuloCnx from '../connect';

const ModuloActividades = (function (GlCnx) {

  // Propiedades    
  console.log("GlCnx", GlCnx);
  const _db = GlCnx.db;
  const actividadesRef = _db.ref('Actividades');
  let _actividades = [];
  // Metodos
  function getActividades(_commit) {
   return new Promise((resolve, reject) => {
    actividadesRef.on('value',snapshot => {
      _actividades = GlCnx.snapshotToArray(snapshot);            
      console.log("desde getActividades", _actividades);
      _commit('setActividades', _actividades); 
      resolve(true);
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
        return state.actividades;
      },
};

const mutations={
    setActividades:(state,actividades) => state.actividades = actividades,  
};

const actions = {
  GetAllActividades: ({commit}) => {
    // Do something here... lets say, a http call using vue-resource
    ModuloActividades.getActividades(commit).then(response => {
      // http success, call the mutator and change something in state
      //commit('setActividades', response);      
    })
    .catch(e => {
      console.warn("error=>",e);
    });
  },
}

export default {
    state: {
        actividades: [],      
    },
    getters,
    mutations,
    actions,
  };