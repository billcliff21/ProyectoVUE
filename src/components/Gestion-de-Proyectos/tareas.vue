<template>
<section>
  <h2> Listas de Tareas realizadas: {{id}}</h2>
  <div>
    <h6>Default</h6>
    <b-pagination size="md" :total-rows="total" v-model="currentPage" :per-page="per_page">
    </b-pagination>
  </div>
  <div class="card-deck"> 
  <div class="card" v-for="(tarea, index) in tareas" :key=index>            
      <div class="card-header">Tarea # {{ partition + (index+1) }}</div>
      <div class="card-body">
          <h5 class="card-title"></h5>
          Compromiso: <span class="badge badge-pill badge-danger ml-2"> {{tarea.fechaComprimiso}} </span>
          <p class="card-text">{{ tarea.comentario }}</p>
          <button class="btn btn-danger" @click="eliminar(tarea.key)">Eliminar</button>
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
  name: "tareas",
  mounted() {
    const foreKey = this.$route.params.id;
    this.$store.dispatch("GetAllTareasAsync", foreKey).then(response => {
      console.log("tareas cargadas exitosamente");
    });
  },
  data() {
    return {
      id: this.$route.params.id,
      currentPage:1,
      per_page:5
    };
  },
  computed: {
    tareas() {
                  // se resta -1 por que los arreglos son en base 0
      let init = (this.currentPage-1)*this.per_page; 
      let final = (this.currentPage*this.per_page);  
      console.log("init",init);
      return this.$store.getters.getTareas.slice(init,final);
      //return this.$store.getters.getTareas;
    },
    total(){
      return this.$store.getters.getTareas.length;
    },
    partition(){
      return ((this.per_page * this.currentPage ) - this.per_page);
    },
  },
  methods: {
    eliminar(id) {
      //EliminarTareaAsync
      this.$store.dispatch("EliminarTareaAsync", id).then(response => {
        if (response) {
          console.log("La tarea se elimino satisfactoriamente");
          return true;
        }else{
          console.warn("Error al eliminar");
        }
      });
    }
  }
};
</script>

<style>
</style>


