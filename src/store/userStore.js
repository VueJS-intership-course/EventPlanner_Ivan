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
    async updatePassword(password) {
      userService.changeUserPassword(password);
      this.logoutUser();
    },

    async updateEmailandTz(newEmail, timezone) {
      userService.changeEmail(newEmail, this.currentUser.email, timezone);

      if (this.currentUser.email !== newEmail) this.logoutUser();
    },
  },
});

export default userStore;
