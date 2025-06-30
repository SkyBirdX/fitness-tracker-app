// firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, collection, addDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCH1qD4eFjle1ldnxpBbmk4u8TpnRd3vZ8",
  authDomain: "fitness-app-b060f.firebaseapp.com",
  projectId: "fitness-app-b060f",
  storageBucket: "fitness-app-b060f.appspot.com",
  messagingSenderId: "577199623389",
  appId: "1:577199623389:web:648ed344c7f96578b89f34",
  measurementId: "G-XPP3HDJ77C"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);

export async function addWorkout(workoutData) {
  const workoutsCollection = collection(db, "workouts");
  return await addDoc(workoutsCollection, {
    uid: auth.currentUser.uid,
    ...workoutData,
    date: new Date(),
  });
}
