import { getAuth, onAuthStateChanged, signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from "../firebase";
// import { useUserContext } from "../userContext";

// const { setUserId } = useUserContext();

export const handleEmailSignup = async (email, password) => {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        return userCredential.user.uid; // Return the userId
    } catch (error) {
        throw error;  // Re-throw to allow error handling in SignupPanel
    }
}

export const handleGoogleSignup = async () => {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: "select_account" });

    try {
        const result = await signInWithPopup(auth, provider);
        return result.user.uid; 
    } catch (error) {
        throw error;
    }
}

export const initAuthListener = (setUserId) => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (user) {
            setUserId(user.uid);
        } else {
            setUserId(null);
        }
    });
    return unsubscribe;
}
