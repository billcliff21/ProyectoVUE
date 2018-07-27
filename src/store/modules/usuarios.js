// simulando la tabla de usuarios
// Load the full build.
import _ from 'lodash';
import ModuloCnx from '../connect';
// Patron de diseño "El patrón de Módulo"
// myNamespace = UsuarioModulo
const UsuarioModulo = (function (GlCnx) {
  console.log("GlCnx", GlCnx);
  const _db = GlCnx.db;
  const UserRef = _db.ref('usuarios');
  // function constructora del Usuario    
  function ClassUsuario() {
    // Propieades de un Usuario (unitario)
    const obj = {
      uid: null,
      username: null,
      password: null,
      nombre: null,
      tipocuenta: null
    };
    // Se sella el objecto para prevenir la extensibilidad
    const usuario = Object.seal(obj);
    return usuario;
  }

  function getUsuario() {
    const userId = GlCnx.auth().currentUser.uid;
    console.log("getUsuario=>",userId);
    /*
    return _db.ref('/usuarios/' + userId).once('value').then(function(snapshot) {
      var username = (snapshot.val() && snapshot.val().username) || 'Anonymous';
      console.log(username);
    });
    */
   return true;
  }

  //Registrar el email y la contraseña en el modulo de autenticacion de firebase
  function _RegistrarCuenta(user) {
    console.log("cnx=>", GlCnx);
    const RegistroResponse = GlCnx.createUserWithEmailAndPassword(user.username, user.password);
    return RegistroResponse;
  }

  function GuardarObjecto(user) {

    /// TODO: Fatal las respectivas validaciones

    // primero registro la cuenta de correo
    _RegistrarCuenta(user)
      .then((successMessage) => {
          // aqui guardo
        console.log("Estadoregistro=>", successMessage);
        if (successMessage.errorcode > 0 || successMessage.uid === null) {
          return false;
        }
        // SI TODO FUE EXITOSO 
        // REGISTRO AL USUARIO EN LA BASE DE DATOS    
        user.uid = successMessage.uid;
    
        UserRef.child(user.uid).set(
          user, (error) => {
            if (error) {
              console.warn("Data could not be saved:", error);
              return false;
            } else {
              console.log("Data saved successfully.");
              return true;
            }
          });
      })
      .catch(
        // Registrar la razón del rechazo
        function (reason) {
          console.log('Manejar promesa rechazada (' + reason + ') aquí.');
        });

  }

  return {
    usuario: ClassUsuario(),
    GuardarObjecto: GuardarObjecto,
  }
})(ModuloCnx);

const usuarios = [{
    username: 'dax7xad@gmail.com',
    password: '@Prestanic1',
    nombre: 'Alvaro Dax'
  },
  {
    username: 'Usuario2@company.com',
    password: '@Prestanic1',
    nombre: 'Alejandro Enrique'
  },
  {
    username: 'Usuario3@company.com',
    password: '321',
    nombre: 'Abdala Elias'
  },
];

const getters = {
  getAuth: (state) => {
    return state.auth;
  },
  getUsuarioActual: (state) => {
    return state.usuario;
  },
};
const mutations = {
  addUser: (state, usuario) => state.usuarios.unshift(usuario),
  currentUser: (state,user) => state.usuario = user,     
  sighIn: (state)  => state.auth=true,
  sighOut: (state) => state.auth = false,
};

const actions ={
  sighInAsync :({commit},user) =>{
    return new Promise((resolve, reject) => {
      const {
        username,
        password
      } = user;
      // Do something here... lets say, a http call using vue-resource
      ModuloCnx.signInWithEmailAndPassword(username, password).then(response => {
        // http success, call the mutator and change something in state
        commit('sighIn');
        resolve(response); // Let the calling function know that http is done. You may send some data back
      }, error => {
        // http failed, let the calling function know that action did not work out
        commit('sighOut');
        reject(false);
      })
    })
  },
  currentUserAsync:({commit}) =>{
    ModuloCnx.CurrentUser()
    .then(response => commit("currentUser",response))
    .catch(error   =>{
      console.warn(error);
      commit("currentUser",{nombre:""});
    } );
  },
}

export default {
  state: {
    usuario: UsuarioModulo.usuario,
    usuarios,
    auth: false,
  },
  getters,
  mutations,
  actions,
};