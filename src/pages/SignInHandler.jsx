import React from 'react';
import { useNavigate } from 'react-router-dom';
import { isSignInWithEmailLink, signInWithEmailLink, createUserWithEmailAndPassword } from 'firebase/auth';
import { useUserContext } from '../userContext';
import { addUserWithRandomUsername } from '../Components/addUserWithRandomName';
import { useEffect } from "react";
import { auth } from "../firebase"


const SignInHandler = () => {
    const navigate = useNavigate();
    const { setuserId } = useUserContext();

    const handleSignIn = async () => {
        if (isSignInWithEmailLink(auth, window.location.href)) {
            let email = window.localStorage.getItem('emailForSignIn');
            if (!email) {
                email = window.prompt('Please provide your email for sign-in');
            }

            try {
                signInWithEmailLink(auth, email, window.location.href)
                    .then(async (result) => {
                        window.localStorage.removeItem('emailForSignIn');
                        const user = result.user;
                        // const userId = await createUserWithEmailAndPassword(auth, user.email, '000000'); // Or generate a more secure password if needed
                        setuserId(user.uid);
                        await addUserWithRandomUsername(user.uid, user.email);
                        navigate('/dashboard');
                    })
                    .catch((error) => {
                        console.error("Error signing in:", error);
                    });
            } catch (error) {
                console.error("Error creating user:", error);
            }
        }
    };

    // Trigger sign-in logic on component mount
    useEffect(() => {
        handleSignIn();
    }, []);

    return (
        <div >Completing sign-in...</div> // Temporary message
    );
};

export default SignInHandler;
