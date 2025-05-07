import { BG_LOGO } from "../utils/constants";
import Header from "./Header";
import { useState } from "react";

const Login = () => {
  const [isSignInform, setIsSignInForm] = useState(true);

  const toggleSignInForm = () => {
    setIsSignInForm(!isSignInform);
    //this will be false and vice versa <---if this is true
  };
  return (
    <div>
      <Header />
      <div className="absolute">
        <img
          className=" h-screen w-screen bg-cover bg-no-repeat"
          src={BG_LOGO}
          alt="bg-logo"
        ></img>
      </div>
      <form
        className="absolute p-12  w-80 h-100 my-36 mx-auto right-0 left-0 rounded-lg bg-black opacity-90
      " // use formik doc to build forms
      >
        <h1 className="font-bold text-white text-3xl py-4">
          {isSignInform ? "Sign In" : "Sign Up"}
        </h1>
        {!isSignInform && (
          <input
            type="text"
            placeholder="Full Name"
            className="p-2 my-2 w-full bg-gray-700 text-white"
          />
        )}
        <input
          type="text"
          placeholder="Email"
          className="p-2 my-2 w-full bg-gray-700 text-white"
        />

        <input
          type="text"
          placeholder="Password
        "
          className="p-2 my-2 bg-gray-700 w-full text-white"
        />
        <button className="p-2 my-2  bg-red-700 rounded-lg w-full">
          {isSignInform ? "Sign In" : "Sign Up"}
        </button>
        <p
          className="py-4 text-white cursor-pointer"
          onClick={toggleSignInForm}
        >
          {isSignInform
            ? "New to Netflix? Sign Up now!"
            : "Already a user, Sign In Now"}
        </p>
      </form>
    </div>
  );
};

export default Login;
