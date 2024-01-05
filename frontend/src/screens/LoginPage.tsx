import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import axios from "axios";

import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { ToastContainer, toast } from "react-toastify";

import { loginImage } from "../assets";
import { RootState } from "../redux/store";
import { setCredential } from "../redux/slices/userSlice";
import CustomButton from "../components/utils/CustomButton";

import "react-toastify/dist/ReactToastify.css";

// The type of login form data
export type LoginForm = {
  email: string;
  password: string;
};

const baseUrl = import.meta.env.VITE_SERVER_BASE_URL;

const LoginPage = () => {
  // State of visibility of password
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userInfo } = useSelector((state: RootState) => state.user);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>();

  // Handle the state of visibility of password: either true or false
  const handleShowPassword = () => {
    setShowPassword((prevState) => !prevState);
  };

  // Send a post request to server side with email and password object
  const onSubmit = handleSubmit((data) => {
    axios
      .post(`${baseUrl}/api/auth/login`, data, { withCredentials: true })
      .then((res) => {
        dispatch(setCredential(res.data));
      })
      .catch((error) => {
        const customMessage = error.response.data.message;
        toast.error(customMessage || error.message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      });
  });

  useEffect(() => {
    if (userInfo) {
      navigate("/");
    }
  }, [userInfo]);

  return (
    <div className="flex p-5">
      {/* ERROR MESSAGE */}
      <ToastContainer />
      {/* 1. The login form */}
      <form
        onSubmit={onSubmit}
        className="flex-1 flex flex-col gap-3 py-8 px-2 justify-center "
      >
        {/* 1A. The Header text */}
        <h1 className="text-3xl font-bold mb-4 text-primary">
          Welcome back, Login in
        </h1>
        {/* 1B. The Email section */}
        <label htmlFor="email" className="font-semibold text-primary">
          Email
          <input
            type="text"
            id="email"
            placeholder="bookyonder@gmail.com"
            className={`w-full block font-normal border border-primary ${
              errors.email && "border-red-500"
            } rounded-md py-2 px-3`}
            {...register("email", {
              validate: (input) => {
                if (!input) {
                  return "Enter your email please";
                } else if (!input.includes("@")) {
                  return "Enter a valid email that includes @";
                }
              },
            })}
          />
          {errors.email && (
            <p className="text-red-500 font-normal">{errors.email.message}</p>
          )}
        </label>
        {/* 1C. The password section */}
        <label htmlFor="password" className="font-semibold text-primary">
          Password
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              placeholder="********"
              className={`w-full block font-normal border border-primary ${
                errors.email && "border-red-500"
              } rounded-md py-2 px-3`}
              {...register("password", {
                required: "Enter your password please",
                minLength: {
                  value: 8,
                  message:
                    "Your password need to contains at least 8 characters",
                },
              })}
            />
            {showPassword ? (
              <FaEye
                onClick={handleShowPassword}
                className="absolute top-1/2 right-2 transform -translate-y-1/2 cursor-pointer"
              />
            ) : (
              <FaEyeSlash
                onClick={handleShowPassword}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer"
              />
            )}
          </div>
          {errors.password && (
            <p className="text-red-500 font-normal">
              {errors.password.message}
            </p>
          )}
        </label>

        {/* 1D. The login button */}
        <div className="flex flex-col gap-2">
          <CustomButton
            type="submit"
            padding="py-3"
            text="Sign in"
            responsiveWidth="w-full"
            customCSS="mt-5"
          />
          <p className="self-center text-primary">
            Don't have an account?{" "}
            <Link to="/login" className="underline font-bold">
              Sign up now
            </Link>
          </p>
        </div>

        {/* 1E. The google login button */}
        <CustomButton
          text="Login With Google"
          padding="py-3"
          icon={<FcGoogle className="text-xl" />}
          bgColor="bg-white"
          textColor="text-primary"
          responsiveWidth="w-full"
          customCSS="mt-1 border border-primary"
        />
      </form>

      {/* 2. The login decorated image on the left */}
      <div className="md:flex-1 md:block hidden p-6">
        <motion.img
          initial={{ y: -500 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.8, type: "spring", bounce: 0.6 }}
          src={loginImage}
          alt="Login image"
          className="w-full h-[90vh]"
        />
      </div>
    </div>
  );
};

export default LoginPage;
