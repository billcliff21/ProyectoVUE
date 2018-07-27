import * as firebase from 'firebase';
// These imports load individual services into the firebase namespace.
import 'firebase/auth';
import 'firebase/database'

const ConnectModulo = (function (Myfirebase) {
  // Initialize Firebase
  const _config = {
    apiKey: "AIzaSyBB5xH1Z69do0Fyv-YmBZvvLxeidNGUlak",
    authDomain: "apicom360.firebaseapp.com",
    databaseURL: "https://apicom360.firebaseio.com",
    projectId: "apicom360",
    storageBucket: "apicom360.appspot.com",
    messagingSenderId: "762704034133"
  };
  Myfirebase.initializeApp(_config);
  const _db = Myfirebase.database();
  const _auth = Myfirebase.auth();

  // Utilidad en todos los otros modulos
  const snapshotToArray = (snapshot) => {
    let _returnArr = [];
    snapshot.forEach(childSnapshot => {
      let item = childSnapshot.val();
      item.key = childSnapshot.key;
      _returnArr.push(item);
    });
    console.log("returnArr:", _returnArr);
    return _returnArr;

  };

  function _createUserWithEmailAndPassword(email, password) {
    return new Promise((resolve, reject) => {
      // Llamamos a resolve(...) cuando lo que estabamos haciendo finaliza con éxito, y reject(...) cuando falla.
      // En este ejemplo, usamos setTimeout(...) para simular código asíncrono. 
      // En la vida real, probablemente uses algo como XHR o una API HTML5.      
      let _uid = null;
      let _errorcode = null;
      let _errorMessage = null;

      _auth.createUserWithEmailAndPassword(email, password).then(function (user) {
        //const user = _auth.currentUser;
        _errorcode = 0;
        _uid = user.uid;
        // Si todo pasa bien mando el id del usuario
        resolve({
          uid: _uid,
          errorcode: _errorcode,
          errorMessage: _errorMessage,
        });
      }, function (error) {
        _errorcode = error.code;
        _errorMessage = error.message;
        // Si ocurre un error mando el objecto con dos valores referente al error
        reject({
          uid: null,
          errorcode: _errorcode,
          errorMessage: _errorMessage,
        });
      });
    });
  }

  function _signInWithEmailAndPassword(email, password) {
    return new Promise((resolve, reject) => {
      _auth.signInWithEmailAndPassword(email, password)
        .then(function (firebaseUser) {
          // success
          //_currentUser = firebaseUser;
          console.log("response to _signInWithEmailAndPassword =>", firebaseUser);
          resolve(true);
        })
        .catch(function (error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          // ...
          reject(false);
        });
    });
  }

  function GetCurrentUser() {
    return new Promise((resolve, reject) => {
      let _datosUsuario = {};
      let usercurrent = _auth.currentUser;
      _GetUser(usercurrent.uid)
        .then(response => {
          _datosUsuario = response;
          console.log("_datosUsuario=>", _datosUsuario);
          resolve(_datosUsuario);
        }).catch(error => {
          console.log("error al intentar recuperar los datos del usuario:=>", error);
          reject(_datosUsuario);
        });
    });

    //#region [ obsolect ]
    /*
    const UserRef = _db.ref('usuarios/'+usercurrent.uid);       

    UserRef.once("value", function(snapshot) {
      const dbuser ={};
      snapshot.forEach(function(child) {        
        dbuser[child.key] = child.val();
        //console.log(child.key+": "+child.val());
        console.log("dbuser:",dbuser);
      });
    */
    //#endregion
    /*
    UserRef.orderByChild('uid')
    //.equalTo(key)
    .once('child_added', snapshot => {
      response.uid= usercurrent.uid;
      response.email= usercurrent.email;
      //response.snapshot.val.nombre;
      console.log(snapshot.key, snapshot.val());
    });
    */
  }

  function _GetUser(root) {
    return new Promise((resolve, reject) => {
      const dbuser = {};
      const UserRef = _db.ref('usuarios/' + root);
      UserRef.once("value", function (snapshot) {
        snapshot.forEach(function (child) {
          dbuser[child.key] = child.val();
          //console.log(child.key+": "+child.val());
          console.log("dbuser:", dbuser);
        });
        resolve(dbuser);
      });
    });
  }

  //console.log(_createUserWithEmailAndPassword);

  return {
    db: _db,
    createUserWithEmailAndPassword: _createUserWithEmailAndPassword,
    signInWithEmailAndPassword: _signInWithEmailAndPassword,
    CurrentUser: GetCurrentUser,
    auth: _auth,
    snapshotToArray:snapshotToArray,
  }
})(firebase);

export default {
  db: ConnectModulo.db,
  createUserWithEmailAndPassword: ConnectModulo.createUserWithEmailAndPassword,
  signInWithEmailAndPassword: ConnectModulo.signInWithEmailAndPassword,
  CurrentUser: ConnectModulo.CurrentUser,
  auth: ConnectModulo.auth,
  snapshotToArray:ConnectModulo.snapshotToArray,
}