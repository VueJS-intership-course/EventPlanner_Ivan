<template>
  <button
    type="button"
    class="btn btn-primary"
    data-toggle="modal"
    data-target="#exampleModal"
    @click="switchModal"
  >
    Open Map
  </button>
  <Teleport to="body">
    <div class="modal d-block" v-if="isOpen" @click="switchModal">
      <div class="modal-dialog modal-dialog-centered" @click.stop="">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Event Location</h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
              @click="switchModal"
            >
              <span>&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <MapInitialization />
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" @click="switchModal">Close</button>
            <button type="button" class="btn btn-primary">Save Location</button>
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
import { ref } from "vue";
import MapInitialization from "./MapInitialization.vue";

const isOpen = ref(false);

const switchModal = () => {
  isOpen.value = !isOpen.value;
};
</script>

<style scoped>
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
}
</style>
