<template>
  <div class="container d-flex justify-content-center my-4">
    <div>
      <form @submit="onSubmit">
        <h2>Add expense</h2>
        <div class="input-wrapper mt-4">
          <BasicInput label="Category" name="category" />
        </div>
        <div class="input-wrapper my-4">
          <BasicInput label="Amount" type="number" name="amount" />
        </div>
        <button class="mt4 btn btn-success">Add</button>
      </form>
    </div>
    <PieChart />
  </div>
</template>

<script setup>
import BasicInput from "@/components/BasicInput.vue";
import PieChart from "@/components/Highchart/PieChart.vue";
import eventStore from "@/store/eventsStore";
import { useForm } from "vee-validate";
import * as yup from "yup";

const useEventStore = eventStore();

const { handleSubmit } = useForm({
  validationSchema: yup.object({
    category: yup.string().required("This field is required!"),
    amount: yup
      .number()
      .typeError("This field is required!")
      .positive("Expense can't be negative!")
      .required("This field is required!"),
  }),
});

const onSubmit = handleSubmit((values, { resetForm }) => {
  useEventStore.addExpense(values);
  resetForm();
});
</script>

<style lang="scss" scoped>
.input-wrapper {
  position: relative;
}

.container {
  padding: 4rem 2rem;
  border: 0.25rem solid #ccc;
  border-radius: 2rem;
  box-shadow: 0 0.25rem 0.5rem rgba(0, 0, 0, 0.1);
}
</style>
