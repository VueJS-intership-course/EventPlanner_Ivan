<template>
  <div class="d-flex flex-column p-2 main-container my-4">
    <h1>Create an Event</h1>
    <form @submit="onSubmit">
      <div class="input-wrapper mt-4">
        <BasicInput name="name" label="Name" />
      </div>
      <div class="input-wrapper mt-4">
        <BasicInput name="ticketCount" type="number" label="Tickets count" />
      </div>
      <div class="input-wrapper mt-4">
        <BasicInput name="ticketPrice" type="number" label="Ticket price" />
      </div>
      <div class="input-wrapper mt-4">
        <BasicInput name="budget" type="number" label="Budget" />
      </div>
      <div class="input-wrapper mt-4">
        <DropdownSelect v-model="timezone" />
      </div>
      <div class="input-wrapper">
        <BasicInput type="date" name="date" label="Event date" />
      </div>
      <div class="input-wrapper">
        <BasicInput type="time" name="time" label="Event time" />
      </div>
      <div class="input-wrapper mt-4">
        <div class="mr-4 mb-2">
          <span>Press the button to select location:</span>
          <span class="map-error" v-if="isNotSelectedLoc">Please choose location!</span>
        </div>
        <MapModal />
      </div>
      <div class="input-wrapper mt-4">
        <label for="exampleFormControlTextarea1">Description:</label>
        <textarea
          class="form-control"
          id="exampleFormControlTextarea1"
          rows="4"
          v-model="description"
        ></textarea>
      </div>
      <button type="submit" class="btn btn-primary mt-4">Create Event</button>
    </form>
  </div>
</template>

<script setup>
import BasicInput from "@/components/BasicInput.vue";
import DropdownSelect from "@/components/dropdownSelect.vue";
import MapModal from "@/components/MapModal.vue";
import { computed, ref } from "vue";
import * as yup from "yup";
import { useForm } from "vee-validate";
import eventServices from "@/services/eventServices.js";
import { useRouter } from "vue-router";
import useEventStore from "@/store/eventsStore";
import moment from "moment";

const router = useRouter();
const store = useEventStore();
const isNotSelectedLoc = ref(false);

const description = ref("");
const timezone = ref("");
const eventLocation = computed(() => store.eventCreationCoord);
const eventAddress = computed(() => store.eventCreationAddress);

const { handleSubmit } = useForm({
  validationSchema: yup.object({
    name: yup.string().required("This field is required!"),
    ticketCount: yup
      .number()
      .typeError("This field is required!")
      .integer("Must be an integer!")
      .min(20, "Tickets cannot be less than 20!")
      .max(20000, "Maximum capacity exceeded!")
      .required("This field is required!"),
    ticketPrice: yup
      .number()
      .typeError("This field is required!")
      .min(5, "Price must be greater than 5 bucks!")
      .max(10000, "Price cannot be grater than 10000 bucks!")
      .required("This field is required!"),
    budget: yup
      .number()
      .typeError("This field is required!")
      .min(100, "Budget cannot be less than 100 bucks!")
      .max(1000000, "Budget cannot be greater than 1000000!")
      .required("This field is required!"),
    date: yup
      .string()
      .test("is-after-today", "Date must be after today", (value) => {
        const selectedDate = new Date(value);
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        tomorrow.setHours(0, 0, 0, 0);
        return selectedDate >= tomorrow;
        //Think of validation to take the timezone in mind
      })
      .required("This field is required!"),
    time: yup.string().required("This field is required!"),
  }),
});

const onSubmit = handleSubmit((values, { resetForm }) => {
  if (!eventLocation.value) {
    isNotSelectedLoc.value = true;
    return;
  }
  isNotSelectedLoc.value = false;
  if (timezone.value !== "" && eventLocation.value && eventAddress.value) {
    const eventDate = moment.tz(`${values.date} ${values.time}`, timezone.value).toISOString();

    const event = {
      id: crypto.randomUUID(),
      name: values.name,
      ticketCount: values.ticketCount,
      ticketPrice: values.ticketPrice,
      budget: values.budget,
      timezone: timezone.value,
      description: description.value,
      location: eventLocation.value,
      address: eventAddress.value,
      time: eventDate,
    };

    try {
      eventServices.addEvent(event);
      resetForm();
      description.value = "";
      timezone.value = "";
      store.eventCreationCoord = null;
      store.eventCreationAddress = null;
      router.push({ name: "events" });
    } catch (error) {
      console.log(error);
    }
  }
});
</script>

<style lang="scss" scoped>
.main-container {
  max-width: 30rem;
  margin: auto;
  padding: 20px;
  background-color: #f8f9fa;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.input-wrapper {
  position: relative;
  margin-bottom: 1.5rem;
}

.btn-primary {
  margin-top: 1rem;
}

.map-error {
  display: block;
  color: red;
}

label {
  font-weight: bold;
}
</style>
