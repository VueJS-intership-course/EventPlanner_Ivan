<template>
  <div class="d-flex flex-column p-2 main-container">
    <h1>Register Page</h1>
    <form @submit="onSubmit">
      <div class="input-wrapper">
        <BasicInput name="email" type="email" label="Email address" />
      </div>
      <div class="input-wrapper">
        <BasicInput name="password" type="password" label="Password" class="from-control" />
      </div>
      <div class="input-wrapper">
        <BasicInput name="passwordConfirm" type="password" label="Repeat Password" />
      </div>
      <div class="input-wrapper">
        <DropdownSelect v-model="searchValue" />
      </div>
      <div class="input-wrapper">
        <BasicInput
          type="checkbox"
          name="checkbox"
          label="I have read and agreed to the Terms and Conditions"
          class="form-check-input"
        />
      </div>
      <button type="submit" class="btn btn-primary">Submit</button>
    </form>
  </div>
</template>

<script setup>
import DropdownSelect from "../../components/dropdownSelect.vue";
import BasicInput from "../../components/BasicInput.vue";
import { ref } from "vue";
import { useForm } from "vee-validate";
import * as yup from "yup";

const { handleSubmit } = useForm({
  validationSchema: yup.object({
    email: yup.string().email("Enter a valid email!").required("This field is required!"),
    password: yup
      .string()
      .min(6, "Password must be at least 6 symbols!")
      .required("This field is required!"),
    passwordConfirm: yup
      .string()
      .required("This field is required!")
      .min(6, "Password must be at least 6 symbols!")
      .oneOf([yup.ref("password")], "Passwords does not match!"),
    checkbox: yup.boolean().required("T&C is required!").oneOf([true], "T&C is required!"),
  }),
});

const searchValue = ref("");

const onSubmit = handleSubmit((values) => {
  console.log(values);
  console.log(searchValue.value);
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
