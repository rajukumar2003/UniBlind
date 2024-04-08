import { getAuth, onAuthStateChanged, signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword, sendSignInLinkToEmail } from 'firebase/auth';
import { auth } from "../firebase";


export const handleEmailSignup = async (email, password) => {

    try {
        const actionCodeSettings = {
            // URL must be in the authorized domains list in the Firebase Console.
            url: 'https://uniblind-fd882.web.app/complete-signin',  //'http://localhost:5173/complete-signin',
            handleCodeInApp: true
        };
        try {
            await sendSignInLinkToEmail(auth, email, actionCodeSettings);
            // Store email in local storage to remember it on return
            window.localStorage.setItem('emailForSignIn', email);
            alert('Sign-in link sent! Check your Christ mail.');
        } catch (error) {
            console.error('Error sending sign-in link:', error);
            alert('Error sending sign-in link, please try again.');
        }
        
    } catch (error) {
        throw error;  
    }
}

export const handleGoogleSignup = async () => {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: "select_account" });

    try {
        const result = await signInWithPopup(auth, provider);
        const user = result.user;
        return user;
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
