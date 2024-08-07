import React, { useState } from "react";
import { GoogleIcon } from "../assets/Icons";
import { Link } from "react-router-dom";
import { auth } from "../firebase";
import {
  signInWithPopup,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../userContext";
import { handleGoogleSignup } from "./authUtils";
import { addUserWithRandomUsername } from "./addUserWithRandomName";

const LoginPanel = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setuserId } = useUserContext();

  // Signin using Google -------------------------------------------------------------------
  const googleSignIn = async () => {
    try {
      const user = await handleGoogleSignup();
      await addUserWithRandomUsername(user.uid, user.email);
      setuserId(user.uid);
      navigate("/dashboard");
    } catch (error) {
      console.log(error);
    }
  };

  // Form Submit--------------------------------------------------
  const handleSubmit = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        localStorage.setItem("userId", user.uid);
        navigate("/dashboard");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorCode, errorMessage);
      });
  };

  return (
    <div id="outerpanel" className="flex bg-white m-10 rounded-xl">
      <div id="innerpanel" className="p-4 min-w-fit min-h-fit w-80">
        <p className=" font-semibold text-4xl text-center mb-5">Log in</p>
        <form onSubmit={handleSubmit}>
          <div className="relative z-0 w-full mb-3 group">
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
              className="px-2 peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Email address
            </label>
          </div>
          <div className="relative z-0 w-full mb-3 group">
            <input
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              type="password"
              name="floating_password"
              id="login_password"
              className="block py-2.5 px-2 w-full text-sm text-gray-900 bg-transparent shadow-md rounded-md appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
            />
            <label
              htmlFor="floating_password"
              className="px-2 peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Password
            </label>
          </div>
          <div className="flex flex-row justify-between">
            <div className="flex items-start mb-3">
              <div className="flex items-center h-5">
                <input
                  id="remember"
                  type="checkbox"
                  value=""
                  className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
                />
              </div>
              <label
                htmlFor="remember"
                className="ms-2 text-xs font-medium text-gray-500 my-auto"
              >
                Remember me
              </label>
            </div>
            <Link
              to="/forgotpassword"
              className=" underline text-xs text-gray-500"
            >
              Forgot Password?
            </Link>
          </div>
          <div className="flex flex-col items-center">
            <button
              type="submit"
              className="leading-none text-white bg-[#86B6F6] focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg text-[16.29px] px-5 py-2.5 text-center font-montserrat font-semibold w-[120px] h-[45px]"
            >
              Login
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

        <p className=" mt-3 border-t-2 border-[#A8A8A8] text-sm text-[#A8A8A8] font-medium">
          New User?{" "}
          <Link to="/signup" className=" underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPanel;
