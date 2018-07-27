<template>
<section>
<div class="container">

<b-jumbotron>
  <template slot="header">
    Bootstrap Vue
  </template>
  <template slot="lead">
    This is a simple hero unit, a simple jumbotron-style component for
    calling extra attention to featured content or information.
  </template>
  <hr class="my-4">
  <p>
    It uses utility classes for typography and spacing to space content
    out within the larger container.
  </p>
  <b-btn variant="primary" href="#">Do Something</b-btn>
  <b-btn variant="success" href="#">Do Something Else</b-btn>
</b-jumbotron>

 <b-alert variant="success" show>Success Alert</b-alert>

<div class="my-3">
  <b-btn v-b-popover.hover="'I am popover content!'" title="Popover Title">
    Hover Me
  </b-btn>
</div>

</div>
</section>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
  mounted() {
   
  },
  data(){
      return {

      }
  }
};
</script>

<style>
</style>
