import { defineStore } from "pinia";
import userService from "@/services/userServices.js";

const userStore = defineStore("user", {
  state: () => ({
    currentUser: null,
  }),
  getters: {
    getCurrentUserEmail(state) {
      if (state.currentUser !== null) return state.currentUser.email;
    },
  },
  actions: {
    setCurrentUser(user) {
      this.currentUser = user;
    },
    async registerUser(user) {
      try {
        userService.signUp(user);
        this.setCurrentUser({ email: values.email, timezone: searchValue.value });
      } catch (error) {
        console.log(error);
      }
    },
  },
});

export default userStore;
