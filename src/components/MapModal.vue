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
    <Transition name="modal">
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
              <MapElement />
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" @click="switchModal">
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { ref } from "vue";
import MapElement from "./MapElement.vue";

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

.modal-enter-active,
.modal-leave-active {
  transition: all 0.25s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
  transform: scale(1.2);
}
</style>
