import { collection, query, where, getDocs, doc, setDoc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { generateRandomUsername } from '../anonymousNames';

// Function to add user with random username------------------------------------------
export async function addUserWithRandomUsername(uid, email) {
    // Checking if a document already exists for this uid
    const userDocRef = doc(db, "users", uid);
    const userDocSnap = await getDoc(userDocRef);

    if (userDocSnap.exists()) {
        console.error('User with this UID already exists!');
        return;
    }
    
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
    await setDoc(userDocRef, {
        email: email,
        username: generatedUsername,
    });
    console.log("User added to database");
};
