import firebaseData from "./firebaseConfig";
import {
  setPersistence,
  signInWithEmailAndPassword,
  browserLocalPersistence,
  getAuth,
  updatePassword,
  updateEmail,
} from "firebase/auth";

import { useRouter } from "vue-router";

export default {
  async getAll() {
    try {
      const data = [];
      const querySnapshot = await firebaseData.fireStore.collection("users").get();

      querySnapshot.forEach((doc) => {
        const { username, email } = doc.data();

        const id = doc.id;

        const user = new Employee(username, email, id);

        data.push(user);
      });

      return data;
    } catch (error) {
      console.error("Error fetching user profiles:", error);
      throw error;
    }
  },

  async signUp(user) {
    try {
      const userCredential = await firebaseData.fireAuth.createUserWithEmailAndPassword(
        user.email,
        user.password
      );

      if (userCredential && userCredential.user) {
        await firebaseData.fireStore.collection("users").doc(userCredential.user.uid).set({
          email: user.email,
          id: crypto.randomUUID(),
          role: user.role,
          timezone: user.timezone,
        });
      }
    } catch (error) {
      console.error("Error signing up:", error);
      throw error;
    }
  },

  async signIn(email, password) {
    try {
      await firebaseData.fireAuth.signInWithEmailAndPassword(email, password);
      const auth = getAuth();

      setPersistence(auth, browserLocalPersistence)
        .then(() => {
          return signInWithEmailAndPassword(auth, email, password);
        })
        .catch((err) => {
          throw err.message;
        });
    } catch (error) {
      throw new Error("Invalid email or password");
    }
  },

  async getUserTimezoneAndRole(email) {
    const querySnapshot = await firebaseData.fireStore
      .collection("users")
      .where("email", "==", email)
      .get();

    const doc = querySnapshot.docs[0]?.data();
    if (doc.timezone !== undefined) return { timezone: doc.timezone, role: doc.role };
  },

  async logout() {
    await firebaseData.fireAuth.signOut();
  },

  async changeUserPassword(password) {
    const auth = getAuth();
    const user = auth.currentUser;

    try {
      await updatePassword(user, password);
      console.log("Password changed successfully!");
    } catch (error) {
      console.log("There was an error changing the password: ", error);
    }
  },
  async changeEmail(newEmail, oldEmail, timezone) {
    const auth = getAuth();
    const user = auth.currentUser;
    const querySnapshot = await firebaseData.fireStore
      .collection("users")
      .where("email", "==", oldEmail)
      .get();
    const doc = querySnapshot.docs[0];

    try {
      await updateEmail(user, newEmail);
      await doc.ref.update({
        email: newEmail,
        timezone,
      });
      console.log("Email changed successfully!");
    } catch (error) {
      console.log("There was an error changing the email: ", error);
    }
  },
};
