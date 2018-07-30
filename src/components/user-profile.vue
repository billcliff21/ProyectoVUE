<template>

<div class="container">
<br>
	<div class="row">
		<div class="col-md-9">
		    <div class="card">
		        <div class="card-body">
		            <div class="row">
		                <div class="col-md-12">
		                    <h4>Mi Perfil</h4>
		                    <hr>
		                </div>
		            </div>
		            <div class="row">
		                <div class="col-md-12">
		                    <form>
                              <div class="form-group row">
                                <label for="username" class="col-4 col-form-label">Nombre de Usuario</label> 
                                <div class="col-8">
                                  <input id="username" name="username" placeholder="Nombre de Usuario" class="form-control here" required="required" type="text">
                                </div>
                              </div>
                              <div class="form-group row">
                                <label for="email" class="col-4 col-form-label">Correo Electronico</label> 
                                <div class="col-8">
                                  <input id="email" name="email" placeholder="Email" class="form-control here" required="required" type="text">
                                </div>
                              </div>
                              <div class="form-group row">
                                <label for="newpass" class="col-4 col-form-label">Contraseña anterior</label> 
                                <div class="col-8">
                                  <input id="oldpassword" name="oldpassword" placeholder="Contraseña anterior" class="form-control here" type="password">
                                </div>
                              </div>                               
                              <div class="form-group row">
                                <label for="newpass" class="col-4 col-form-label">Nueva Contraseña</label> 
                                <div class="col-8">
                                  <input id="newpass" name="newpass" placeholder="Nueva Contraseña" class="form-control here" type="password">
                                </div>
                              </div> 
                              <div class="form-group row">
                                <div class="offset-4 col-8">
                                  <button name="submit" type="submit" class="btn btn-primary">Actualizar mi Perfil</button>
                                </div>
                              </div>
                            </form>
		                </div>
		            </div>
		            
		        </div>
		    </div>
		</div>
	</div>
</div>
</template>

<script>
export default {
  data() {
    return {
      userprofile: {
        username: null,
        oldpassword: null,
        newpass: null,
        name: null,        
      },
    };
  },
  mounted(){
   console.log( "mouted=>",this.$store.getters.getUsuarioActual);
  },
};
</script>

<style>
</style>


