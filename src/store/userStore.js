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
    async setCurrentUser(userEmail) {
      if (userEmail) {
        const userTimezoneAndRole = await userService.getUserTimezoneAndRole(userEmail);
        this.currentUser = { email: userEmail, ...userTimezoneAndRole };
      }
    },
    async registerUser(user) {
      try {
        userService.signUp(user);
        this.setCurrentUser({ email: values.email });
      } catch (error) {
        console.log(error);
      }
    },
    logoutUser() {
      userService.logout();
      this.currentUser = null;
    },
  },
});

export default userStore;
