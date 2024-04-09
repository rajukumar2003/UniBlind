import React, { useState, useEffect } from "react";
import { GoogleIcon } from "../assets/Icons";
import { Link, useNavigate } from "react-router-dom";
import { useUserContext } from "../userContext";
import { validateEmail } from "../emailValidation";
import {
  initAuthListener,
  handleEmailSignup,
  handleGoogleSignup,
} from "./authUtils";
import { addUserWithRandomUsername } from "./addUserWithRandomName";

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
    return unsubscribe; // Important for cleanup
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
<<<<<<< HEAD
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
=======
    
  // Email Validation-------------------------------------------------------------------
	const validationResult = validateEmail(email);
	if (!validationResult.valid) {
		alert(validationResult.message);
		return;
	}
	
	  try {
		  const userId = await handleEmailSignup(email, password);
		  // await addUserWithRandomUsername(userId, email, setuserId);
		  // navigate("/dashboard");
	  } catch (error) {
		  const errorCode = error.code;
		  const errorMessage = error.message;
		  console.log(errorCode, errorMessage);
	  }
>>>>>>> a9b4684cf395c531601e0db1959c9e8945d0ac78
  };

  return (
    <div id="outerpanel" className="flex bg-white rounded-xl m-10 grey-shad">
      <div id="innerpanel" className="p-4 w-96 max-h-fit">
        <p className=" font-bold text-[42px] text-center mb-5 font-monasans">Sign Up</p>
        <form onSubmit={handleSubmit}>
          <div className="relative z-0 w-full mb-4 group">
            <input
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              type="email"
              name="floating_email"
              id="floating_email"
              className="block py-1.5 px-2 w-full text-lg text-gray-900 bg-transparent shadow-md rounded-md appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
            />
            <label
              htmlFor="floating_email"
              className=" px-2 peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
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
              className="block py-2.5 px-2 w-full text-sm text-gray-900 bg-transparent shadow-md rounded-md appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              // required
            />
            <label
              htmlFor="floating_password"
              className="px-2 peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
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
              className="block py-2.5 px-2 w-full text-sm text-gray-900 bg-transparent shadow-md rounded-md appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              // required
            />
            <label
              htmlFor="floating_repassword"
              className="px-2 peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Re-Enter Password
            </label>
          </div>
          <div className="mt-7 mb-10 flex flex-col justify-center items-center">
            <button
              type="submit"
              className=" leading-none text-white bg-[#86B6F6] focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg text-[16.29px] px-5 py-2.5 text-center font-montserrat font-semibold w-[145.43px] h-[49px]"
            >
              Sign Up
            </button>
            <div className="flex items-center justify-center text-center text-md font-medium w-4/5  mx-auto py-1">
              <span className="w-full border-b-2 border-[#A8A8A8] inline-block"></span>
              <span className="mx-4 text-[#A8A8A8]">OR</span>
              <span className="w-full border-b-2 border-[#A8A8A8] inline-block"></span>
            </div>
            <button
              onClick={googleSignIn}
              className="text-white bg-[#86B6F6] focus:ring-4 focus:outline-none focus:ring-blue-300 font-semibold rounded-lg text-[14px] text-center font-montserrat leading-none w-[265px] h-[43px]"
            >
              <div className="flex justify-center">
                <span className="my-auto">Continue with Google</span>
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
        <div className="text-xs mb-2 leading-4 mt-1 font-monasans text-[#A8A8A8]">
          <Link to="/webnorms">Why use your University Mail?</Link>
          <p className=" ">
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
        <p className=" border-t-2 pt-2 border-[#A8A8A8] text-xs font-montserrat text-[#A8A8A8]">
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
