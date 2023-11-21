import firebase from "firebase/compat/app";
import "firebase/compat/storage";

function imageConverter(file) {
  return new Promise((resolve, reject) => {
    console.log(file);

    const storageRef = firebase.storage().ref();
    const collectionRef = storageRef.child("products/subdirectory/" + file.name);

    // if (file.size > 1920 * 1080) {
    //   console.log("Image size bigger than 1920x1080 limit");
    //   reject("Image size exceeded limit");
    //   throw new Error("Image size exceeded limit");
    //   return;
    // }

    const imageRef = collectionRef.child(file.name);

    imageRef
      .put(file)
      .then((snapshot) => {
        console.log("Image uploaded successfully.");
        snapshot.ref
          .getDownloadURL()
          .then((downloadURL) => {
            resolve(downloadURL);
          })
          .catch((_) => {
            return;
          });
      })
      .catch((_) => {
        return;
      });
  });
}

export default imageConverter;
