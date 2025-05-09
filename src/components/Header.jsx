import { APP_LOGO } from "../utils/constants";
import { signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Login from "./Login";

const Header = () => {
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        navigate("/error");
      });
  };

  return (
    <div
      className="absolute w-screen
     px-8 py-5 bg-gradient-to-b from-black z-10 flex justify-between"
    >
      <img className="w-50 " src={APP_LOGO} alt="app-logo"></img>
      {user && (
        <div className="flex p-4">
          <img
            className="w-12 h-12 "
            src={user?.photoURL}
            alt="user-icon"
          ></img>
          <button
            onClick={handleSignOut}
            className="font-bold text-white cursor-pointer"
          >
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
};

export default Header;
