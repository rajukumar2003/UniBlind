import React, { useState } from "react";
import { GoogleIcon } from "../assets/Icons";
import { Link } from "react-router-dom";
import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const LoginPanel = () => {

  const navigate = useNavigate();

  // States--------------------------------------------------
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  // Form Submit--------------------------------------------------
  const handleSubmit = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        navigate('/dashboard');
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorCode, errorMessage);
      });
  };



  return (
    <div id="outerpanel" className="flex bg-white m-4 rounded-xl">
      <div id="innerpanel" className="p-4 min-w-fit min-h-fit">
        <p className=" font-semibold text-4xl text-center mb-5">Log in</p>
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
              id="login_password"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
            />
            <label
              htmlFor="floating_password"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Password
            </label>
          </div>
          <div className="flex items-start mb-5">
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
              className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Remember me
            </label>
          </div>
          <Link to="/forgotpassword" className=" underline text-right">
            Forgot Password?
          </Link>
          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Login
          </button>
          <div className="text-center text-md md:text-lg lg:text-xl xl:text-2xl font-medium w-4/5 md:w-3/5 lg:w-2/5 mx-auto py-4">
            <span className="w-16 md:w-20 lg:w-24 border-b-2 border-black inline-block"></span>
            <span className="mx-4">OR</span>
            <span className="w-16 md:w-20 lg:w-24 border-b-2 border-black inline-block"></span>
          </div>
          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            <div className="flex">
              Login with Google
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

        <p>
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
