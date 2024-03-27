import React, { useState } from "react";
import { GoogleIcon } from "../assets/Icons";
import { Link,useNavigate } from "react-router-dom";
import { signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword } from "firebase/auth";
import { db, auth } from '../firebase';
import { doc, setDoc, collection, query, where, getDocs } from "firebase/firestore"; 
import { generateRandomUsername } from "../anonymousNames";

const SignupPanel = () => {

	const navigate = useNavigate();	
	// States variables -------------------------------------------------------------------
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [repassword, setRepassword] = useState('');

	// Function to add user with random username------------------------------------------
	async function addUserWithRandomUsername(uid, email) {
		let generatedUsername = generateRandomUsername();
		let isUsernameUnique = false;
		// Checking if username is unique
		while (!isUsernameUnique) {
			const q = query(collection(db, "users"), where("username", "==", generatedUsername));
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
			username: generatedUsername
		});
		console.log("User added to database with random username: ", generatedUsername);
	}

	// Signin using Google -------------------------------------------------------------------
	const provider = new GoogleAuthProvider();
	provider.setCustomParameters({ prompt: 'select_account' });
	const googleSignIn = async () => {
		try {
			const result = await signInWithPopup(auth, provider);
			const user = result.user;
			await addUserWithRandomUsername(user.uid, user.email); 
			navigate('/dashboard')
		} catch (error) {
			alert(error);
		};
	};
	
	// Signup using From -------------------------------------------------------------------
	const handleSubmit = async(e) => {
		e.preventDefault();
		if (password !== repassword) {
			alert("Passwords do not match");
			return;
		}

		// Validate email and password
		const functionResult = await functions.httpsCallable('validateSignupData')({
			email,
			password,
		});
		if (!functionResult.data.valid) {
			alert(functionResult.data.error);
			return;
		}
		// If email and password are valid, create user
		try {
			const userCredential = await createUserWithEmailAndPassword(auth, email, password);
			const user = userCredential.user.uid;
			await addUserWithRandomUsername(user, email);
			
			navigate('/dashboard');
		}
		catch (error) {
			const errorCode = error.code;
			const errorMessage = error.message;
			alert(errorCode, errorMessage);
		}
	};
	


	return (
		
		<div id="outerpanel" className="flex bg-white m-4 rounded-xl">
		<div id="innerpanel" className="p-4 w-96 max-h-fit">
			<p className=" font-semibold text-4xl text-center mb-5">Sign Up</p>
			<form onSubmit={handleSubmit}>
			<div className="relative z-0 w-full mb-5 group">
				<input
				onChange={(e) => { setEmail(e.target.value); }}
				type="email"
				name="floating_email"
				id="floating_email"
				className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
				placeholder=" "
				required
				/>
				<label
				htmlFor="floating_email"
				className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
				>
				Email address
				</label>
			</div>
			<div className="relative z-0 w-full mb-5 group">
				<input
				onChange={(e) => { setPassword(e.target.value); }}
				type="password"
				name="floating_password"
				id="floating_password"
				className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
				placeholder=" "
				required
				/>
				<label
				htmlFor="floating_password"
				className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
				>
				Enter Password
				</label>
			</div>

			<div className="relative z-0 w-full mb-5 group">
				<input
				onChange={(e) => { setRepassword(e.target.value); }}
				type="password"
				name="floating_repassword"
				id="floating_repassword"
				className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
				placeholder=" "
				required
				/>
				<label
				htmlFor="floating_repassword"
				className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
				>
				Re-Enter Password
				</label>
			</div>
				<button
				type="submit"
				className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
			>
				Sign Up
			</button>
			<div className="flex items-center justify-center text-center text-md md:text-lg lg:text-xl xl:text-2xl font-medium w-4/5 md:w-3/5 lg:w-2/5 mx-auto py-4">
				<span className="w-16 md:w-20 lg:w-24 border-b-2 border-black inline-block"></span>
				<span className="mx-4">OR</span>
				<span className="w-16 md:w-20 lg:w-24 border-b-2 border-black inline-block"></span>
			</div>
			<button
				onClick={googleSignIn}
				className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
			>
				<div className="flex">
				SignUp with Google
				<img
					src={GoogleIcon}
					alt="Google Icon"
					height={20}
					width={20}
					className="ml-2"
				/>
				</div>
			</button>
			</form>
			<div>
			<Link to="/webnorms">Why use your University Mail?</Link>
			<p>
				By creating an account, you
				<br />
				agree to our{" "}
				<Link to="/webnorms">
				Terms of
				<br />
				Use
				</Link>{" "}
				and <Link to="/webnorms">Privacy Policy</Link>.
			</p>
			</div>
			<p className=" border-t-2 border-black">
			Already have an account?{" "}
			<Link to="/login" className=" underline">
				Login
			</Link>
			</p>
		</div>
		</div>
	);
};

export default SignupPanel;
