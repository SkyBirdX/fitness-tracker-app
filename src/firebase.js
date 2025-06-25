import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, collection, addDoc, query, where, orderBy, getDocs } from "firebase/firestore";

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

async function addWorkout(workoutData) {
    try {
        const workoutsCollection = collection(db, "workouts");
        const workoutDoc = await addDoc(workoutsCollection, {
            uid: auth.currentUser.uid,
            ...workoutData
        });
        console.log("Workout added successfully! Document ID:", workoutDoc.id);
    } catch (error) {
        console.error("Error adding workout:", error);
    }
}

export { addWorkout };

const handleAdd = async (e) => {
    e.preventDefault();
    if (!input.name || !input.protein || !input.fat || !input.carbs) return;
    if (!auth.currentUser) {
        alert("Du musst eingeloggt sein!");
        return;
    }
    try {
        await addDoc(collection(db, "meals"), {
            uid: auth.currentUser.uid,
            name: input.name,
            protein: Number(input.protein),
            fat: Number(input.fat),
            carbs: Number(input.carbs),
            date: new Date()
        });
        setInput({ name: "", protein: "", fat: "", carbs: "" });
        const q = query(
            collection(db, "meals"),
            where("uid", "==", auth.currentUser.uid),
            orderBy("date", "desc")
        );
        const querySnapshot = await getDocs(q);
        setMeals(querySnapshot.docs.map(doc => doc.data()));
    } catch (error) {
        alert("Fehler beim Speichern: " + error.message);
    }
}; 