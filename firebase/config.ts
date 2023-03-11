// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore"
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCkAPFzxg51b6Z4L7br-s5WiPaF1G4ng9s",
  authDomain: "cap23-5728d.firebaseapp.com",
  projectId: "cap23-5728d",
  storageBucket: "cap23-5728d.appspot.com",
  messagingSenderId: "23402521675",
  appId: "1:23402521675:web:63770198737990cd0a19ce"
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);

export default app

export const db = getFirestore(app)
export const auth = getAuth(app)
