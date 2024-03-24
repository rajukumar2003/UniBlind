import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCaHqbNFaW4t0KKICyfjxmUPolkmNPe1r8",
    authDomain: "uniblind-fd882.firebaseapp.com",
    projectId: "uniblind-fd882",
    storageBucket: "uniblind-fd882.appspot.com",
    messagingSenderId: "643779017579",
    appId: "1:643779017579:web:042b08a2eef17855c86a2e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const db = getFirestore(app);

export { app, auth, db };
