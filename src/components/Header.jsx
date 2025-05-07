import React from "react";
import { APP_LOGO } from "../utils/constants";

const Header = () => {
  return (
    <div className="absolute px-8 py-5 bg-gradient-to-b from-black z-10">
      <img className="w-50 " src={APP_LOGO} alt="app-logo"></img>
    </div>
  );
};

export default Header;
