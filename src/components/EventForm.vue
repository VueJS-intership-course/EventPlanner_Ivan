<template>
  <div class="d-flex flex-column p-2 main-container">
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

      <div class="input-wrapper mt-4">
        <div class="mr-4 mb-2">
          <span>{{ selectedLocation }}</span>
        </div>
        <MapModal />
      </div>
      <div class="input-wrapper mt-4">
        <label for="exampleFormControlTextarea1">Description</label>
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
import { ref } from "vue";
import * as yup from "yup";
import { useForm } from "vee-validate";
import eventServices from "@/services/eventServices.js";
import { useRouter } from "vue-router";

const router = useRouter();

const description = ref("");
const timezone = ref("");
const selectedLocation = ref("Press the button to select location:");

const { handleSubmit } = useForm({
  validationSchema: yup.object({
    name: yup.string().required("This field is required!"),
    ticketCount: yup
      .number("This field is required!")
      .integer("Must be an integer!")
      .min(20, "Tickets cannot be less than 20!")
      .max(20000, "Maximum capacity exceeded!")
      .required("This field is required!"),
    ticketPrice: yup
      .number("This field is required!")
      .min(5, "Price must be greater than 5 bucks!")
      .max(10000, "Price cannot be grater than 10000 bucks!")
      .required("This field is required!"),
    budget: yup
      .number("This field is required!")
      .min(100, "Budget cannot be less than 100 bucks!")
      .max(1000000, "Budget cannot be greater than 1000000!")
      .required("This field is required!"),
  }),
});

const onSubmit = handleSubmit((values, { resetForm }) => {
  const event = {
    id: crypto.randomUUID(),
    name: values.name,
    ticketCount: values.ticketCount,
    ticketPrice: values.ticketPrice,
    budget: values.budget,
    timezone: timezone.value,
    description: description.value,
  };
  if (description.value !== "" && timezone.value !== "") {
    try {
      eventServices.addEvent(event);
    } catch (error) {
      console.log(error);
    }
  }

  resetForm();
  description.value = "";
  timezone.value = "";
  router.push({ name: "events" });
});
</script>

<style lang="scss" scoped>
.main-container {
  max-width: 30rem;
  margin: auto;
}

.input-wrapper {
  position: relative;
  margin-bottom: 1.5rem;
}

.btn-primary {
  margin-top: 1rem;
}
</style>
