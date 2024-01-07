import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { registerImage } from "../assets";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import CustomButton from "../components/utils/CustomButton";
import { Link, useNavigate } from "react-router-dom";
import { setCredential } from "../redux/slices/userSlice";
import { motion } from "framer-motion";
import axios from "axios";
import GoogleAuth from "../components/auths/GoogleAuth";
import Divider from "../components/Divider";
import Facebook from "../components/auths/Facebook";

// The type of register form data
export type RegisterForm = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const baseUrl = import.meta.env.VITE_SERVER_BASE_URL;

const RegisterPage = () => {
  // State for the visibility of password and confirm password
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Handle any errors that cannot handle by react-hook-form errors
  const [error, setError] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userInfo } = useSelector((state: RootState) => state.user);

  const {
    register, // Function to register input fields with the form
    watch, // Function to watch the value of specific element of form
    handleSubmit, // Function to handle the form submit
    formState: { errors }, // Handle error of each element in form
  } = useForm<RegisterForm>();

  // Function to toggle the visibility of password
  const handleShowPassword = () => {
    setShowPassword((prevState) => !prevState);
  };

  // Function to toggle the visibility of confirm password
  const handleShowConfirmPassword = () => {
    setShowConfirmPassword((prevState) => !prevState);
  };

  /**
   * Send the data to the server side and store info in local storage
   */
  const onSubmit = handleSubmit((data) => {
    axios
      .post(`${baseUrl}/api/auth/register`, data, { withCredentials: true })
      .then((res) => {
        setError(null);
        dispatch(setCredential(res.data));
      })
      .catch((error) => {
        const customMessage = error.response.data.message;
        setError(customMessage ? customMessage : error.message);
      });
  });

  // Make sure user is redirect to home screen when trying to access register
  // page through url
  useEffect(() => {
    if (userInfo) {
      navigate("/");
    }
  }, [userInfo]);

  return (
    <div className="flex p-5">
      {/* 1. The register decorated image on the left */}
      <div className="md:flex-1 md:block hidden px-5">
        <motion.img
          initial={{ y: -500 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.8, type: "spring", bounce: 0.6 }}
          src={registerImage}
          alt="Register image"
          className="w-full h-full"
        />
      </div>

      {/* 2. The register form */}
      <form
        onSubmit={onSubmit}
        className="flex-1 flex flex-col gap-2 py-8 px-2"
      >
        {/* 2A. The Header text */}
        <h1 className="text-3xl font-bold mb-4 text-primary">
          Create an account
        </h1>
        {/* 2B. The first name and last name */}
        <div className="flex md:flex-row flex-col md:gap-4 gap-2">
          <label
            htmlFor="firstName"
            className="font-semibold flex-1 text-primary"
          >
            First Name
            <input
              type="text"
              id="firstName"
              placeholder="Carl"
              className={`w-full block font-normal border border-primary ${
                errors.firstName && "border-red-500"
              } rounded-md py-2 px-3`}
              {...register("firstName", {
                required: "Enter your first name please",
              })}
            />
            {errors.firstName && (
              <p className="text-red-500 font-normal">
                {errors.firstName.message}
              </p>
            )}
          </label>

          <label
            htmlFor="lastName"
            className="font-semibold flex-1 text-primary"
          >
            Last Name
            <input
              type="text"
              id="lastName"
              placeholder="Yang"
              className={`w-full block font-normal border border-primary ${
                errors.lastName && "border-red-500"
              } rounded-md py-2 px-3`}
              {...register("lastName", {
                required: "Enter your last name please",
              })}
            />
            {errors.lastName && (
              <p className="text-red-500 font-normal">
                {errors.lastName.message}
              </p>
            )}
          </label>
        </div>

        {/* 2C. The email */}
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
          <p className="text-red-500 font-normal">
            {errors.email ? errors.email.message : error && error}
          </p>
        </label>

        {/* 2D. The password */}
        <label htmlFor="password" className="font-semibold  text-primary">
          Password
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              placeholder="********"
              className={`w-full relative block font-normal border border-primary ${
                errors.password && "border-red-500"
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
                className="absolute top-1/2 right-2 transform -translate-y-1/2 cursor-pointer"
                onClick={handleShowPassword}
              />
            ) : (
              <FaEyeSlash
                className="absolute top-1/2 right-2 transform -translate-y-1/2 cursor-pointer"
                onClick={handleShowPassword}
              />
            )}
          </div>
          {errors.password && (
            <p className="text-red-500 font-normal">
              {errors.password.message}
            </p>
          )}
        </label>

        {/* 2D. The Confirm Password */}
        <label htmlFor="confirmPassword" className="font-semibold text-primary">
          Confirm Password
          <div className="relative flex">
            <input
              type={showConfirmPassword ? "text" : "password"}
              id="confirmPassword"
              placeholder="********"
              className={`w-full block font-normal border border-primary ${
                errors.confirmPassword && "border-red-500"
              } rounded-md py-2 px-3`}
              {...register("confirmPassword", {
                validate: (input) => {
                  if (!input) {
                    return "Confirm your password please";
                  } else if (watch("password") !== input) {
                    return "The Password entered does not matched";
                  }
                },
              })}
            />
            {showConfirmPassword ? (
              <FaEye
                className="absolute top-1/2 right-2 transform -translate-y-1/2 cursor-pointer"
                onClick={handleShowConfirmPassword}
              />
            ) : (
              <FaEyeSlash
                onClick={handleShowConfirmPassword}
                className="absolute top-1/2 right-2 transform -translate-y-1/2 cursor-pointer"
              />
            )}
          </div>
          {errors.confirmPassword && (
            <p className="text-red-500 font-normal">
              {errors.confirmPassword.message}
            </p>
          )}
        </label>

        {/* 2E. The submit button */}
        <div className="flex flex-col gap-2">
          <CustomButton
            type="submit"
            padding="py-3"
            text="Create Account"
            responsiveWidth="w-full"
            customCSS="mt-5"
          />
          <p className="self-center text-primary">
            Already have an account?{" "}
            <Link to="/login" className="underline font-bold">
              Login
            </Link>
          </p>
        </div>

        {/* DIVIDER LINE BETWEEN BUTTONS */}
        <Divider />

        {/* 2F. The google login button */}
        <GoogleAuth />
        <Facebook/>
      </form>
    </div>
  );
};

export default RegisterPage;
