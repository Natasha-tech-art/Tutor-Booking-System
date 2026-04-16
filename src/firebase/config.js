import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCdKYDK_i41Rwzzk69k_ZM3kJ-hwkSA2sM",
  authDomain: "tutor-booking-system-9fb13.firebaseapp.com",
  projectId: "tutor-booking-system-9fb13",
  storageBucket: "tutor-booking-system-9fb13.firebasestorage.app",
  messagingSenderId: "995482678556",
  appId: "1:995482678556:web:05081081e6228765ea36d9",
  measurementId: "G-JH1V0KK2RW"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);