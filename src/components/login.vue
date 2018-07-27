<template>
<div class="container py-5">
    <div class="row">
        <div class="col-md-12">            
            <div class="row">
                <div class="col-md-6 mx-auto">
                    <!-- form card login -->
                    <div class="card rounded-0">
                        <div class="card-header">                            
                            <h3 class="mb-0">Inicio de Sesión</h3>
                        </div>
                        <div class="card-body">
                            <form  @submit.prevent="sighIn()"  class="form" role="form" autocomplete="off" id="formLogin" data-toggle="validator" >
                                <div class="form-group">
                                    <label for="nameusuer">Usuario</label>
                                    <input type="text" v-model="login.username" class="form-control form-control-lg rounded-0" name="nameusuer" id="nameusuer" required="true" placeholder="Ingrese su correo">
                                    <div class="invalid-feedback">Usted olvido ingresar su usuario.</div>
                                </div>
                                <div class="form-group">
                                    <label for ="pwd1">Contraseña</label>
                                    <input type="password" v-model="login.password" class="form-control form-control-lg rounded-0" name="pwd1" id="pwd1" required="true" autocomplete="new-password" placeholder="Password">
                                    <div class="invalid-feedback">Por favor ingrese su contraseña!</div>
                                </div>
                                <div>
                                    <label class="custom-control custom-checkbox">
                                      <input type="checkbox" class="form-check-input" id="exampleCheck1">
                                      <span class="custom-control-indicator"></span>
                                      <span class="custom-control-description small text-dark">Recordar mi credenciales</span>
                                    </label>
                                </div>
                               <div class="form-group" v-if="loading">
                                    <div class="loader"></div>
                               </div>                                
                                <div  class="form-group" v-if="intentos>0">
                                     <div class="alert alert-warning alert-dismissable">
                                    <button type="button" class="close" data-dismiss="alert">&times;</button>
                                    <strong>¡Cuidado!</strong> Usuario o contraseña incorrecto.
                                    </div>
                                </div>
                                <button type="submit" class="btn btn-success btn-lg float-right" id="btnLogin">Entrar</button>
                            </form>
                        </div>
                        <!--/card-block-->
                    </div>
                    <!-- /form card login -->
                </div>
            </div><i class="fa fa-glass"></i>
            <!--/row-->

        </div>
        <!--/col-->
    </div>
    <!--/row-->
</div>
<!--/container-->
</template>
<script>
export default {
  data() {
    return {
      login: { username: 'dax7xad@gmail.com', password: '@Prestanic1' },
      intentos: 0,
      loading:false,
    };
  },
  methods: {
    volverHome() {
      this.$router.push("/", () => console.log("Ruta cambiada")); // Home
    },
    sighIn() {
      this.intentos += 0;
      this.loading =true;
      this.$store      
        .dispatch("sighInAsync", this.login)
        .then(response => {
          if (!response) {
            console.log("El response de 'sighInAsync'", response);        
            //return response;
          }else{
            this.$store.dispatch("currentUserAsync");               
           //return response;
          }
        })
        .catch(error => {
          console.log("error=>", error);
          this.intentos += 1;
          return false;
        })
        .finally(() => { 
          this.loading = false; this.volverHome(); 
        });
    }

    //methods: mapMutations(["sighIn"])
  },
  computed: {
    auth() {
      return this.$store.getters.getAuth;
    }
  }
};
</script>

<style>

.loader {
  border: 12px solid #f3f3f3;
  border-radius: 50%;
  border-top: 12px solid blue;
  border-bottom: 12px solid blue;
  width: 120px;
  height: 120px;
  -webkit-animation: spin 2s linear infinite;
  animation: spin 2s linear infinite;
}

@-webkit-keyframes spin {
  0% { -webkit-transform: rotate(0deg); }
  100% { -webkit-transform: rotate(360deg); }
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

</style>
