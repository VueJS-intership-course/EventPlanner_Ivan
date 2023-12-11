<template>
  <BasicModal :btnLabel="'Open Map'">
    <template #default="{ switchModal }">
      <div class="modal-header">
        <h5 class="modal-title">Event Location</h5>
      </div>
      <div class="modal-body">
        <MapElement />
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" @click="switchModal">Close</button>
      </div>
    </template>
  </BasicModal>
</template>

<script setup>
import MapElement from "./MapElement.vue";
import BasicModal from "./BasicModal.vue";
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
