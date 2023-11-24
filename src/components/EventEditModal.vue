<template>
  <button class="btn btn-primary" @click="switchModal">Edit</button>
  <Teleport to="body">
    <Transition name="modal">
      <div class="modal d-block" v-if="isOpen" @click="switchModal">
        <div class="modal-dialog modal-dialog-centered" @click.stop="">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Edit Event</h5>
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
              <div class="d-flex flex-column p-2 main-container my-4">
                <form @submit.prevent="onSubmit">
                  <div class="input-wrapper mt-4">
                    <label class="form-label">Event Name</label>
                    <input :value="editedEvent.name" class="form-control" id="name" />
                  </div>
                  <div class="input-wrapper mt-4">
                    <label class="form-label">Tickets count</label>
                    <input
                      :value="editedEvent.ticketCount"
                      class="form-control"
                      type="number"
                      id="ticketCount"
                    />
                  </div>
                  <div class="input-wrapper mt-4">
                    <label class="form-label">Ticket price</label>
                    <input
                      :value="editedEvent.ticketPrice"
                      class="form-control"
                      type="number"
                      id="ticketPrice"
                    />
                  </div>
                  <div class="input-wrapper mt-4">
                    <label class="form-label">Budget</label>
                    <input
                      :value="editedEvent.budget"
                      class="form-control"
                      type="number"
                      id="budget"
                    />
                  </div>
                  <div class="input-wrapper">
                    <label class="form-label mt-4">Date</label>
                    <input
                      :value="dateAndTime.date"
                      class="form-control"
                      type="date"
                      id="date"
                    />
                  </div>
                  <div class="input-wrapper">
                    <label class="form-label mt-4">Time</label>
                    <input
                      :value="dateAndTime.time"
                      class="form-control"
                      type="time"
                      id="time"
                    />
                    <p>The time shown is in UTC</p>
                  </div>
                  <div class="input-wrapper mt-4">
                    <label class="form-label">City/State or Timezone:</label>
                    <input
                      readonly
                      :value="editedEvent.timezone"
                      placeholder="Open the map in order to choose timezone"
                      class="form-control"
                    />
                  </div>
                  <div class="input-wrapper mt-4">
                    <div class="mr-4 mb-2">
                      <label class="form-label">Press the button to select location:</label>
                      <!-- <span class="map-error" v-if="isNotSelectedLoc"
                        >Please choose location!</span
                      > -->
                    </div>
                    <MapModal />
                  </div>
                  <div>
                    <label class="form-label">Upload an Event cover image:</label>
                    <input type="file" class="form-control" @change="handleImgSubmit" />
                    <span>If no image is uploaded , the previous will be used.</span>
                    <!-- <span class="map-error" v-if="isNotSelectedImg">Please upload image!</span> -->
                  </div>
                  <div class="input-wrapper mt-4">
                    <label for="exampleFormControlTextarea1">Description:</label>
                    <textarea
                      class="form-control"
                      rows="4"
                      :value="editedEvent.description"
                      id="description"
                    ></textarea>
                  </div>
                  <button type="submit" class="btn btn-primary mt-4">Save changes</button>
                </form>
              </div>
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
import { computed, ref } from "vue";
import MapModal from "./MapModal.vue";
import eventStore from "@/store/eventsStore.js";
import formatDateTime from "@/utills/formatDateTime.js";
import moment from "moment";
import timeConvert from "@/utills/convertToTimezone.js";

const useEventStore = eventStore();

const editedEvent = computed(() => useEventStore.selectedEvent);

const utcTime = computed(() => {
  return timeConvert(editedEvent.value.time);
});

const dateAndTime = computed(() => {
  return formatDateTime(utcTime.value);
});

const isOpen = ref(false);

const switchModal = () => {
  isOpen.value = !isOpen.value;
};

const onSubmit = (event) => {
  const eventDate = moment
    .tz(
      `${event.target.elements.date.value} ${event.target.elements.time.value}`,
      editedEvent.value.timezone
    )
    .toISOString();

  const finishedEvent = {
    name: event.target.elements.name.value,
    ticketCount: event.target.elements.ticketCount.value,
    ticketPrice: event.target.elements.ticketPrice.value,
    budget: event.target.elements.budget.value,
    description: event.target.elements.description.value,
    time: eventDate,
    id: editedEvent.value.id,
  };

  useEventStore.editEvent(finishedEvent);
  isOpen.value = false;
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

label {
  font-weight: bold;
}
</style>
