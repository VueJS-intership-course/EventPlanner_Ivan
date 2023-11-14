<template>
  <div class="d-flex flex-column p-2 main-container">
    <h1>Login Page</h1>
    <form @submit="onSubmit">
      <div class="input-wrapper">
        <BasicInput name="email" type="email" label="Email address" />
      </div>
      <div class="input-wrapper">
        <BasicInput name="password" type="password" label="Password" class="from-control" />
      </div>
      <div>
        <span
          >Don't have an account yet?
          <RouterLink :to="{ name: 'register' }">Sign up</RouterLink></span
        >
      </div>
      <button type="submit" class="btn btn-primary">Login</button>
    </form>
  </div>
</template>

<script setup>
import BasicInput from "../../components/BasicInput.vue";
import { useForm } from "vee-validate";
import * as yup from "yup";
import userService from "@/services/userServices.js";
import { useRouter } from "vue-router";
import userStore from "@/store/userStore.js";
import { ref } from "vue";

const router = useRouter();

const store = userStore();

const { handleSubmit } = useForm({
  validationSchema: yup.object({
    email: yup.string().email("Enter a valid email!").required("This field is required!"),
    password: yup
      .string()
      .min(6, "Password must be at least 6 symbols!")
      .required("This field is required!"),
  }),
});

const onSubmit = handleSubmit(async (values, { resetForm }) => {
  try {
    await userService.signIn(values.email, values.password);
    store.setCurrentUser({ email: values.email });
    resetForm();
    router.push({ name: "events" });
  } catch (error) {
    alert(`There was a problem with your login: ${error}`);
  }
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
