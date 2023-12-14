import firebase from "firebase/compat/app";
import "firebase/compat/storage";

function imageConverter(file) {
  return new Promise((resolve, reject) => {
    console.log(file);

    const storageRef = firebase.storage().ref();
    const collectionRef = storageRef.child("products/subdirectory/" + file.name);

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
