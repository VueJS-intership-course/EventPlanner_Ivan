<template>
  <BasicModal :btnLabel="'Change Password'">
    <template #default="{ switchModal }">
      <div class="d-flex flex-column p-2 main-container">
        <h5 class="modal-title">Change Password</h5>
      </div>
      <div class="modal-body">
        <div class="d-flex flex-column p-2 main-container my-4">
          <form @submit.prevent="onSubmit">
            <div class="input-wrapper">
              <BasicInput name="password" type="password" label="New Password" />
            </div>
            <div class="input-wrapper">
              <BasicInput name="passwordConfirm" type="password" label="Repeat Password" />
            </div>
            <button type="submit" class="btn btn-primary mt-4">Save changes</button>
          </form>
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" @click="switchModal">Cancel</button>
      </div>
    </template>
  </BasicModal>
</template>

<script setup>
import userStore from "@/store/userStore";
import BasicInput from "@/components/BasicInput.vue";
import * as yup from "yup";
import { useForm } from "vee-validate";
import { useRouter } from "vue-router";
import BasicModal from "@/components/BasicModal.vue";

const router = useRouter();

const useUserStore = userStore();

const { handleSubmit } = useForm({
  validationSchema: yup.object({
    password: yup
      .string()
      .min(6, "Password must be at least 6 symbols!")
      .required("This field is required!"),
    passwordConfirm: yup
      .string()
      .required("This field is required!")
      .min(6, "Password must be at least 6 symbols!")
      .oneOf([yup.ref("password")], "Passwords does not match!"),
  }),
});

const onSubmit = handleSubmit((values, { resetForm }) => {
  useUserStore.updatePassword(values.password);
  resetForm();
  switchModal();
  router.push({ name: "login" });
});
</script>

<style lang="scss" scoped>
label {
  font-weight: bold;
}

.input-wrapper {
  position: relative;
  margin-bottom: 1.5rem;
}
</style>
