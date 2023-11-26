<template>
  <div class="d-flex flex-column p-2 main-container">
    <h1>Register Page</h1>
    <form @submit="onSubmit">
      <div class="input-wrapper">
        <BasicInput name="email" type="email" label="Email address" />
      </div>
      <div class="input-wrapper">
        <BasicInput name="password" type="password" label="New Password" />
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
import DropdownSelect from "@/components/dropdownSelect.vue";
import BasicInput from "@/components/BasicInput.vue";
import { ref } from "vue";
import { useForm } from "vee-validate";
import * as yup from "yup";
import userService from "@/services/userServices.js";
import { useRouter } from "vue-router";
import userStore from "@/store/userStore.js";

const router = useRouter();

const store = userStore();

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

const onSubmit = handleSubmit((values, { resetForm }) => {
  const user = {
    email: values.email,
    password: values.password,
    role: "user",
    timezone: searchValue.value,
  };

  try {
    userService.signUp(user);
    store.setCurrentUser({ email: values.email, timezone: searchValue.value });
  } catch (error) {
    console.log(error);
  }

  resetForm();
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
