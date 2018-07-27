<template>
<section>
  <h2> Listas de Tareas realizadas: {{id}}</h2>
  <div class="card-deck"> 
  <div class="card" v-for="(tarea, index) in tareas" :key=index>            
      <div class="card-header">Tarea # {{ index +1 }}</div>
      <div class="card-body">
          <h5 class="card-title"></h5>
          <span class="badge badge-pill badge-danger ml-2"> {{tarea.fechaComprimiso}} </span>
          <p class="card-text">{{ tarea.comentario }}</p>
          <a href="#" class="btn btn-primary">Go somewhere</a>
      </div>
      <div class="card-footer">
          <span class="badge badge-pill badge-light ml-2">
          posteado: {{ tarea.FechaAlta }}
          </span>
      </div>
  </div> 
  </div>
</section>


</template>

<script>
export default {
  mounted() {
    const foreKey = this.$route.params.id;
    this.$store.dispatch("GetAllTareasAsync", foreKey).then(response=>{
      console.log("tareas cargadas exitosamente");      
    });
  },
  data() {
    return {
      id: this.$route.params.id,
      //tareas: []      
    }
  },
  computed:{
    tareas(){
      return this.$store.getters.getTareas;
    }
  },
};
</script>

<style>
</style>


