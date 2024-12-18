import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  getDocs,
  writeBatch,
  doc,
  serverTimestamp,
  query,
  orderBy,
  setDoc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";

const firebaseConfig = {
  // Свой конфиг из сервиса console.firebase
};

export function createStorage(key) {
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  return {
    key,
    db,
    pull: async function () {
      const ref = collection(this.db, this.key);
      const q = query(ref, orderBy("createdAt"));

      const querySnapshot = await getDocs(q);
      console.log(querySnapshot);
      const movies = [];
      querySnapshot.forEach((doc) => {
        movies.push({
          id: doc.id,
          title: doc.data().title,
          done: doc.data().done,
        });
      });

      return movies;
    },
    push: async function (movie) {
      try {
        await setDoc(doc(this.db, this.key, movie.id), {
          title: movie.title,
          done: movie.done,
          createdAt: serverTimestamp(),
        });
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    },
    deleteMovie: async function (id) {
      const ref = doc(this.db, this.key, id);

      await deleteDoc(ref);
    },
    deleteAllMovies: async function ({ moviesIds }) {
      const batch = writeBatch(this.db);

      moviesIds.forEach((id) => {
        const ref = doc(this.db, this.key, id);

        batch.delete(ref);
      });

      await batch.commit();
    },
    update: async function (movie) {
      const ref = doc(this.db, this.key, movie.id);

      await updateDoc(ref, {
        title: movie.title,
        done: movie.done,
      });
    },
  };
}
