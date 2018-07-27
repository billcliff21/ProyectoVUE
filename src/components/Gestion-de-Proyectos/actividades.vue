<!-- Vista -->
<template>
<b-container fluid>
      <!-- Main table element -->
    <b-table show-empty
             stacked="md"
             :items="items"
             :fields="fields"
             :current-page="currentPage"
             :per-page="perPage"
             :filter="filter"
             :sort-by.sync="sortBy"
             :sort-desc.sync="sortDesc"
             :sort-direction="sortDirection"
             @filtered="onFiltered"
    >
      <template slot="name" slot-scope="row">{{row.value.first}} {{row.value.last}}</template>
      <template slot="isActive" slot-scope="row">{{row.value?'Yes :)':'No :('}}</template>
      <template slot="actions" slot-scope="row">
        <!-- We use @click.stop here to prevent a 'row-clicked' event from also happening -->
        <b-button size="sm" @click.stop="info(row.item, row.index, $event.target)" class="mr-1">
          + tarea
        </b-button>
        <b-button size="sm" @click.stop="row.toggleDetails">
          {{ row.detailsShowing ? 'Hide' : 'Ver' }} detalle
        </b-button>

        <b-button size="sm" @click.stop="irTareas(row.item)" class="mr-1">
          Ver treas
        </b-button>
      </template>
      <template slot="row-details" slot-scope="row">
        <b-card>
          <ul>
            <li v-for="(value, key) in row.item" :key="key">{{ key }}: {{ value}}</li>
          </ul>
        </b-card>
      </template>
    </b-table>

    <b-row>
        <b-col md="6" class="my-1">
          <b-pagination :total-rows="totalRows" :per-page="perPage" v-model="currentPage" class="my-0" />
        </b-col>
      </b-row>

      <!-- Info modal -->
      <b-modal id="modalInfo" @hide="resetModal" @ok="guardarTarea" title="Nueva tarea">
        <div >
        <form>
          <div class="form-group">
             <label for="description">Tarea a realizar</label>
            <textarea  cols="40" rows="5" id="description" class="form-control" v-model="NuevaTarea.description"
              placeholder="Description"/>
          </div>

          <div class="form-group">
             <label for="fechaComprimiso">Fecha de compromiso</label>
            <input type="date" id="fechaComprimiso" class="form-control" v-model="NuevaTarea.fechaComprimiso"/>
          </div>         
        </form>
      </div>
      </b-modal>

</b-container>
</template>

<!-- Controlador -->
<script>
/*
const items = [
  { isActive: true, age: 40, name: { first: "Dickerson", last: "Macdonald" } },
  { isActive: false, age: 21, name: { first: "Larsen", last: "Shaw" } },
  {
    isActive: false,
    age: 9,
    name: { first: "Mini", last: "Navarro" },
    _rowVariant: "success"
  },
  { isActive: false, age: 89, name: { first: "Geneva", last: "Wilson" } },
  { isActive: true, age: 38, name: { first: "Jami", last: "Carney" } },
  { isActive: false, age: 27, name: { first: "Essie", last: "Dunlap" } },
  { isActive: true, age: 40, name: { first: "Thor", last: "Macdonald" } },
  {
    isActive: true,
    age: 87,
    name: { first: "Larsen", last: "Shaw" },
    _cellVariants: { age: "danger", isActive: "warning" }
  },
  { isActive: false, age: 26, name: { first: "Mitzi", last: "Navarro" } },
  { isActive: false, age: 22, name: { first: "Genevieve", last: "Wilson" } },
  { isActive: true, age: 38, name: { first: "John", last: "Carney" } },
  { isActive: false, age: 29, name: { first: "Dick", last: "Dunlap" } }
];
*/
//import Tareas from './tareas.vue';
export default {

created() {    
    this.getactividades(this.items).then(response => {
      console.log("desde aqui me estoy ejecutando..",this.items);      
      this.items= response;
      this.totalRows = response.length;
      //GetAllTareasAsync
      //const foreKey = "005_SIBOIF_Desarrollo";
      //this.$store.dispatch("GetAllTareasAsync", foreKey);
    });
  },
  data() {
    return {
      items: [],      
      getactividades:this.$store.state.actividades.actividadesdb,
      //#region Encabezados
      fields: [
        {
          key: "key",
          label: "Id",
          sortDirection: "desc",
          sortable: true
        },
        /*
        {
          class: "text-center",
          key: "Origen",
          label: "Origen",
          sortable: true
        },
        {
          key: "Area",
          label: "Area"
        },
        */
        /*
        {
          key: "Referencia",
          label: "Referencia"
        },
        */
        {
          key: "Requerimiento",
          label: "Requerimiento"
        },
        /*
        {
          key: "Accion",
          label: "Accion"
        },
        */
        {
          key: "Solucion",
          label: "Solucion"
        },
        /*
        {
          key: "Estado",
          label: "Estado"
        },
        */
        /*
        {
          key: "Encargado_TI",
          label: "Encargado TI"
        },
        */
        /*
        {
          key: "Complejidad",
          label: "Complejidad"
        },
        */
        {
          key: "Fecha_Limite",
          label: "Fecha Limite"
        },
        /*
        {
          key: "Fecha TI",
          label: "Fecha TI"
        },
        */
        {
          key: "InvGate",
          label: "InvGate"
        },

        {
          key: "Prioridad",
          label: "Prioridad"
        },

        {
          key: "actions",
          label: "Actions"
        }
      ],
      //#endregion

      currentPage: 1,
      perPage: 5,
      totalRows:10, //this.items.length,
      pageOptions: [5, 10, 15],
      sortBy: null,
      sortDesc: false,
      sortDirection: "asc",
      filter: null,
      modalInfo: { title: "", content: "", CurrentItem: "" },
      NuevaTarea: {
        fechaComprimiso: new Date().toJSON().slice(0, 10),
        description: null
      }
    };
  },
  computed: {
    sortOptions() {
      // Create an options list from our fields
      return this.fields.filter(f => f.sortable).map(f => {
        return { text: f.label, value: f.key };
      });
    },
    /*
    items() { 
      return this.$store.getters.getActividades;
      },   
    */   
  },
  methods: {
    info(item, index, button) {
      this.modalInfo.title = `Row index: ${index + 1}  `;
      this.modalInfo.content = JSON.stringify(item, null, 2);
      this.modalInfo.CurrentItem = item;
      //this.$router.push("/", () => console.log("Ruta cambiada")); // Home
      this.$root.$emit("bv::show::modal", "modalInfo", button);
    },
    guardarTarea() {
      //console.log(this.modalInfo.CurrentItem.key);
      const _tarea = {
        comentario: this.NuevaTarea.description,
        fechaComprimiso: this.NuevaTarea.fechaComprimiso,
        foreKey: this.modalInfo.CurrentItem.key
      };
      this.$store.dispatch("GrabarTareasAsync", _tarea);
    },
    resetModal() {
      this.modalInfo.title = "";
      this.modalInfo.content = "";
      this.modalInfo.CurrentItem = null;
      this.NuevaTarea.description = "";
      this.NuevaTarea.fechaComprimiso = new Date().toJSON().slice(0, 10);
    },
    irTareas({key}){
       this.$router.push('/Tareas/'+key, ()=> console.log('Ruta cambiada')); // Home
    },
    onFiltered(filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length;
      this.currentPage = 1;
    }
  }
};
</script>

<!-- Vista -->
<style>
</style>


