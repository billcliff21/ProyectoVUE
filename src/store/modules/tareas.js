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

  function _detelebyKey(key){
    return new Promise((resolve, reject) => {
      TareasRef.child(key).remove()                   
      .then(() => {
          resolve(true);
      })
      .catch(error => {
          reject(error);
      });
    })
  }

  function _getTareasByforeKey(foreKey,_commit){       
    //foreKey="005_SIBOIF_Desarrollo";
    return new Promise((resolve, reject) => {
      TareasRef.orderByChild('foreKey').equalTo(foreKey).limitToFirst(50).on('value',snapshot => {
        _tareas = GlCnx.snapshotToArray(snapshot);
        //_actividades.push( _snapshotToArray(snapshot));
          console.log("desde getTareas", _tareas);
          _commit('setTareas', _tareas);
          resolve(true);
        });
     }) 
  }

  // Publicacion
  return {
    Save: _SaveTarea,
    getTareasByForekey: _getTareasByforeKey,
    Delete:_detelebyKey, 
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
    ModuloTareas.getTareasByForekey(foreKey,commit).then(response => {
      // http success, call the mutator and change something in state
      if(response) console.log('tareas recuperadas con exito');
      //commit('setTareas', response);
      return true;
    })
      .catch(e => {
        console.warn("error=>", e);
      });
  },
  GrabarTareasAsync: ({ commit }, tarea) => {
    ModuloTareas.Save(tarea).then(response => {
      if (response) console.info('tarea guardada exitosamente');
    });
  },
  EliminarTareaAsync:({ commit }, key) => {
    ModuloTareas.Delete(key).then(response =>{
      if(response) { 
        console.info('Se ha removido exitosamente');
        return true;        
      }else{
        conselo.warn('Fallo al remover la tarea');
        return false;
      }
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
