import { Link } from "react-router-dom";
import CustomButton from "./utils/CustomButton";
import { logo } from "../assets";

const Navbar = () => {
  return (
    <div className="w-full fixed flex justify-between p-5 bg-blue-100">
      {/* 1. The LOGO */}
      <Link to="/">
        <img src={logo} alt="logo" className="w-28" />
      </Link>

      {/* 2. The nav links and others */}
      <div className="flex gap-5">
        <Link to="/register">
          <CustomButton text="Register" />
        </Link>

        <Link to="/login">
          <CustomButton text="Login" />
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
