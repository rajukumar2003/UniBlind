import { collection, query, where, getDocs, doc, setDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { generateRandomUsername } from '../anonymousNames';

// Function to add user with random username------------------------------------------
export async function addUserWithRandomUsername(uid, email, setuserId) {

    let generatedUsername = generateRandomUsername();
    let isUsernameUnique = false;
    // Checking if username is unique
    while (!isUsernameUnique) {
        const q = query(
            collection(db, "users"),
            where("username", "==", generatedUsername)
        );
        const usernameExists = (await getDocs(q)).empty;
        if (usernameExists) {
            isUsernameUnique = true;
        } else {
            generatedUsername = generateRandomUsername();
        }
    }

    // Adding user to database 
    const userDocRef = doc(db, "users", uid);
    await setDoc(userDocRef, {
        email: email,
        username: generatedUsername,
    });
    setuserId(uid); // Setting userId in context
    alert("Signup Successful");
}