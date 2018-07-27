import ModuloCnx from '../connect';

const ModuloTareas = (function (GlCnx) {

  // Propiedades  
  console.log("GlCnx", GlCnx);
  const _db = GlCnx.db;
  const TareasRef = _db.ref('Tareas');
  let _tareas = [];

  function _SaveTarea({comentario,fechaComprimiso,foreKey}) {
    return new Promise((resolve, reject) => {
      //console.log("Comentario:", comentario);
      //console.log("fechaComprimiso:", fechaComprimiso);
      TareasRef.push({
        comentario,
        fechaComprimiso,
        foreKey,
        FechaAlta: new Date().toJSON().slice(0, 10)
      }).then(() => {
        console.info('Mensaje enviado');
        resolve(true);
      });
    });
  }

  function _getTareasByforeKey(foreKey){
    console.log("ForeKey=>",foreKey);
    //foreKey="005_SIBOIF_Desarrollo";
    return new Promise((resolve, reject) => {
      TareasRef.orderByChild('foreKey').equalTo(foreKey).limitToLast(5).once('value').then(snapshot => {
        _tareas = GlCnx.snapshotToArray(snapshot);
        //_actividades.push( _snapshotToArray(snapshot));
          console.log("desde getTareas", _tareas);
          resolve(_tareas);
        });
     }) 
  }

  // Publicacion
  return {
    Save: _SaveTarea,
    getTareasByForekey: _getTareasByforeKey,
  };
})(ModuloCnx);

const getters = {
  getTareas: (state) => state.tareas,
};

const mutations = {
  setTareas: (state, tareas) => state.tareas = tareas,
};

const actions = {
  GetAllTareasAsync: ({commit},foreKey) => {
    // Do something here... lets say, a http call using vue-resource
    ModuloTareas.getTareasByForekey(foreKey).then(response => {
      // http success, call the mutator and change something in state
      commit('setTareas', response);
    })
      .catch(e => {
        console.warn("error=>", e);
      });
  },
  GrabarTareasAsync: ({ commit }, tarea) => {
    ModuloTareas.Save(tarea).then(response => {
      if (response) console.info('tarea guardada exitosamente');
    });
  }
}

export default {
  state: {
    tareas: [],
  },
  getters,
  mutations,
  actions,
};
