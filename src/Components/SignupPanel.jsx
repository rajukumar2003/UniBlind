import React, { useState,useEffect } from "react";
import { GoogleIcon } from "../assets/Icons";
import { Link, useNavigate } from "react-router-dom";
import { db } from "../firebase";
import { useUserContext } from "../userContext";
import { validateEmail } from "../emailValidation";
import { initAuthListener, handleEmailSignup, handleGoogleSignup } from './authUtils'; 
import { addUserWithRandomUsername } from './addUserWithRandomName';


const SignupPanel = () => {
	const navigate = useNavigate();
	// States variables -------------------------------------------------------------------
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [repassword, setRepassword] = useState("");
	const { setuserId } = useUserContext();

	// Setting up Auth Listener
	useEffect(() => {
	const unsubscribe = initAuthListener(setuserId);
	return unsubscribe;  // Important for cleanup
	}, []); 

	// Signin using Google -------------------------------------------------------------------
	const googleSignIn = async () => {
		try {
			const user = await handleGoogleSignup();
			await addUserWithRandomUsername(user.uid, user.email, setuserId); 
			navigate("/dashboard");
		} catch (error) {
			console.log(error);
		}
	};

  // Signup using From -------------------------------------------------------------------
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== repassword) {
      alert("Passwords do not match");
      return;
	  }
    // Email Validation-------------------------------------------------------------------
    
	const validationResult = validateEmail(email);
	if (!validationResult.valid) {
		alert(validationResult.message);
		return;
	}
	
	  try {
		  const userId = await handleEmailSignup(email, password);
		  await addUserWithRandomUsername(userId, email, setuserId);
		  navigate("/dashboard");
	  } catch (error) {
		  const errorCode = error.code;
		  const errorMessage = error.message;
		  alert(errorCode, errorMessage);
	  }
  };

  return (
    <div id="outerpanel" className="flex bg-white rounded-xl m-10">
      <div id="innerpanel" className="p-4 w-96 max-h-fit">
        <p className=" font-semibold text-4xl text-center mb-5">Sign Up</p>
        <form onSubmit={handleSubmit}>
          <div className="relative z-0 w-full mb-4 group">
            <input
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              type="email"
              name="floating_email"
              id="floating_email"
              className="block py-0.5 px-0 w-full text-lg text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
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
          <div className="relative z-0 w-full mb-4 group">
            <input
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              type="password"
              name="floating_password"
              id="floating_password"
              className="block py-1.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
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

          <div className="relative z-0 w-full mb-4 group">
            <input
              onChange={(e) => {
                setRepassword(e.target.value);
              }}
              type="password"
              name="floating_repassword"
              id="floating_repassword"
              className="block py-1.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
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
          <div className="flex flex-col justify-center items-center">
            <button
              type="submit"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-fit px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Sign Up
            </button>
            <div className="flex items-center justify-center text-center text-md font-medium w-4/5  mx-auto py-1">
              <span className="w-full border-b-2 border-black inline-block"></span>
              <span className="mx-4">OR</span>
              <span className="w-full border-b-2 border-black inline-block"></span>
            </div>
            <button
              onClick={googleSignIn}
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-fit px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
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
          </div>
        </form>
        <div className="text-xs leading-4 mt-1">
          <Link to="/webnorms">Why use your University Mail?</Link>
          <p>
            By creating an account, you
            <br />
            agree to our{" "}
            <Link to="/webnorms" className="underline">
              Terms of
              <br />
              Use
            </Link>{" "}
            and{" "}
            <Link to="/webnorms" className="underline">
              Privacy Policy
            </Link>
            .
          </p>
        </div>
        <p className=" border-t-2 border-black text-sm">
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
