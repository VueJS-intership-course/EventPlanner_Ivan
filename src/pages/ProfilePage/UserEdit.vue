<template>
  <BasicModal :btnLabel="'Edit Email and Password'">
    <template #default="{ switchModal }">
      <div class="modal-header">
        <h5 class="modal-title">Edit Email and Timezone</h5>
      </div>
      <div class="modal-body">
        <div class="d-flex flex-column p-2 main-container my-4">
          <form @submit.prevent="onSubmit">
            <div class="input-wrapper mt-4">
              <label class="form-label">Email:</label>
              <input v-model="emailInput" class="form-control" />
            </div>
            <div class="input-wrapper mt-4">
              <DropdownSelect v-model="timezoneInput" />
              <p class="mt-2">If nothing is selected , the previous value will be saved .</p>
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
import BasicModal from "@/components/BasicModal.vue";
import DropdownSelect from "@/components/dropdownSelect.vue";
import userStore from "@/store/userStore";
import { ref, computed } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const useUserStore = userStore();

const timezoneInput = ref(null);

const user = computed(() => {
  return useUserStore.currentUser;
});

const emailInput = ref(user.value.email);

const tzResult = computed(() => timezoneInput.value || user.value.timezone);

const onSubmit = () => {
  useUserStore.updateEmailandTz(emailInput.value, tzResult.value);
  switchModal();
  router.push({ name: "login" });
};
</script>

<style lang="scss" scoped>
label {
  font-weight: bold;
}
</style>
