<template>
<section>
<h1>Acerca de</h1>
		<!-- Notice-->
		<h2>Modal</h2>
		<div style="padding: 1rem;">
		  <div class="modal-dialog" role="document">
		    <div class="modal-content">
		      <div class="modal-header">
		        <h5 class="modal-title">Modal title</h5>
		        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
		          <span aria-hidden="true">&times;</span>
		        </button>
		      </div>
		      <div class="modal-body">
		        <p>Modal body text goes here.</p>
		      </div>
		      <div class="modal-footer">
		        <button type="button" class="btn btn-primary">Save changes</button>
		        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
		      </div>
		    </div>
		  </div>
		</div>
<flash-message class="flash__message"></flash-message>

</section>
</template>

<script>
export default {
  data() {
    return {
      mensaje: null
    };
  },
  mounted() {
    this.flash("Hello World", "success", {
      timeout: 3000,
      beforeDestroy() {
        console.log("El mensaje se destruyo")
      }
    });
  },
  methods: {}
};
</script>

<style>
.flash__message {
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  padding: 15px 30px 15px 15px;
  margin-bottom: 10px;
  border: 1px solid transparent;
  border-radius: 4px;
  background-color: #cccccc;
  position: relative;
}

.flash__message.success {
  color: #3c763d;
  background-color: #dff0d8;
  border-color: #d6e9c6;
}

.flash__message.warning {
  color: #8a6d3b;
  background-color: #fcf8e3;
  border-color: #faebcc;
}

.flash__message.error {
  color: #a94442;
  background-color: #f2dede;
  border-color: #ebccd1;
}

.flash__message.info {
  color: #37516A;
  background-color: #F2F5FE;
  border-color: rgb(223, 227, 240);
}
</style>
