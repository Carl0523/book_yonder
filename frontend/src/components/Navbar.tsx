import { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";

import { GiExitDoor } from "react-icons/gi";
import { RxAvatar } from "react-icons/rx";
import { IoClose } from "react-icons/io5";

import CustomButton from "./utils/CustomButton";
import { logo } from "../assets";
import { RootState } from "../redux/store";
import { userLogout } from "../redux/slices/userSlice";
import IconText from "./utils/IconText";
import axios from "axios";

const baseUrl = import.meta.env.VITE_SERVER_BASE_URL;

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { userInfo } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();

  /**
   * Send a logout POST request and remove userInfo from local storage
   */
  const handleLogout = () => {
    axios
      .post(`${baseUrl}/api/auth/logout`, {}, { withCredentials: true })
      .then((res) => {
        dispatch(userLogout());
        setIsMenuOpen(false);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  return (
    <div className="w-full top-0 left-0 sticky flex justify-between items-center py-5 px-10 bg-blue-100 z-20">
      {/* 1. The LOGO */}
      <Link to="/">
        <img src={logo} alt="logo" className="w-28" />
      </Link>

      {/* 2. The nav links and others */}
      {userInfo ? (
        <>
          {/* 2A. When user login: display avatar and user's name */}
          <div
            onClick={() => {
              setIsMenuOpen((prevState) => !prevState);
            }}
            className="flex gap-2 items-center cursor-pointer"
          >
            <motion.img
              whileHover={{ scale: 1.1 }}
              src={userInfo.avatar}
              alt="avatar"
              className="h-10 rounded-full border-2 border-primary"
            />
            <p className="text-primary font-serif">{`${userInfo.firstName}  ${userInfo.lastName}`}</p>
          </div>

          {/* MENU: DISPLAY when click the avatar */}
          <AnimatePresence mode="wait">
            {isMenuOpen && (
              <motion.div
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 10, opacity: 0 }}
                transition={{ duration: 1, type: "spring" }}
                className="absolute top-[4.5rem] right-7 flex flex-col gap-2 w-48 p-5 bg-primary text-white z-30 rounded-md"
              >
                <IoClose
                  onClick={() => {
                    setIsMenuOpen((prevState) => !prevState);
                  }}
                  className="text-xl self-end cursor-pointer"
                />
                <Link to="/profile">
                  <IconText
                    text="View Profile"
                    icon={<RxAvatar className="text-2xl" />}
                  />
                </Link>
                <Link to="/" onClick={handleLogout}>
                  <IconText
                    text="Logout"
                    icon={<GiExitDoor className="text-2xl" />}
                  />
                </Link>
              </motion.div>
            )}
          </AnimatePresence>
        </>
      ) : (
        // 2B. When logout: display register and login button
        <div className="flex gap-5">
          <Link to="/register" className="sm:block hidden">
            <CustomButton text="Register" />
          </Link>

          <Link to="/login">
            <CustomButton text="Login" />
          </Link>
        </div>
      )}
    </div>
  );
};

export default Navbar;
