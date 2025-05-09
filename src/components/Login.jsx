import { BG_LOGO } from "../utils/constants";
import Header from "./Header";
import { useRef, useState } from "react";
import { checkValid } from "../utils/validate";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const Login = () => {
  const [isSignInform, setIsSignInForm] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const name = useRef(null);
  const email = useRef(null);
  const password = useRef(null);

  const handleClickButton = () => {
    const message = checkValid(email.current.value, password.current.value);
    setErrorMessage(message);
    if (message) return;

    if (!isSignInform) {
      createUserWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          const user = userCredential.user;
          updateProfile(user, {
            displayName: name.current.value,
            photoURL:
              "https://avatars.githubusercontent.com/u/177932031?s=400&u=7e9e5d872de8ec7e2839851c18d9afe5c317a217&v=4",
          })
            .then(() => {
              const { uid, email, displayName, photoURL } = auth.currentUser;
              dispatch(
                addUser({
                  uid: uid,
                  email: email,
                  displayName: displayName,
                  photoURL: photoURL,
                })
              );
              navigate("/browse");
            })
            .catch((error) => {
              setErrorMessage(error.message);
            });
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + "-" + errorMessage);
        });
    } else {
      signInWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          console.log(user);
          navigate("/browse");
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + "-" + errorMessage);
        });
    }
  };

  const toggleSignInForm = () => {
    setIsSignInForm(!isSignInform);
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
        onSubmit={(e) => {
          e.preventDefault();
        }}
        className="absolute p-12  w-80 h-110 my-36 mx-auto right-0 left-0 rounded-lg bg-black opacity-90
      " // use formik doc to build forms
      >
        <h1 className="font-bold text-white text-3xl py-4">
          {isSignInform ? "Sign In" : "Sign Up"}
        </h1>
        {!isSignInform && (
          <input
            ref={name}
            type="text"
            placeholder="Full Name"
            className="p-2 my-2 w-full bg-gray-700 text-white"
          />
        )}
        <input
          ref={email}
          type="text"
          placeholder="Email"
          className="p-2 my-2 w-full bg-gray-700 text-white"
        />

        <input
          ref={password}
          type="password"
          placeholder="Password
        "
          className="p-2 my-2 bg-gray-700 w-full text-white"
        />
        <p className="text-red-500 py-2">{errorMessage}</p>
        <button
          className="p-2 my-2  bg-red-700 rounded-lg w-full"
          onClick={handleClickButton}
        >
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
