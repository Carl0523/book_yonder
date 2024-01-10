import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";

import CustomButton from "../../components/utils/CustomButton";
import { setCredential } from "../../redux/slices/userSlice";

interface ProfileProps {
  firstName: string;
  lastName: string;
  email: string;
  userId: string;
}

type ProfileForm = {
  newFirstName: string;
  newLastName: string;
  newEmail: string;
};

const baseUrl = import.meta.env.VITE_SERVER_BASE_URL;

const EditProfile: React.FC<ProfileProps> = ({
  firstName,
  lastName,
  email,
  userId,
}) => {
  // Determine if update button is disabled
  const [disabledButton, setDisabledButton] = useState(true);
  const dispatch = useDispatch();
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<ProfileForm>();

  /**
   * Send a POST request to update user's profile, after success, update the
   * info in redux state: userinfo
   */
  const onSubmit = handleSubmit((data) => {
    let updatedData = {};
    if (email !== data.newEmail)
      updatedData = { ...updatedData, newEmail: data.newEmail };
    if (firstName !== data.newFirstName)
      updatedData = { ...updatedData, newFirstName: data.newFirstName };
    if (lastName !== data.newLastName)
      updatedData = { ...updatedData, newLastName: data.newLastName };

    axios
      .post(`${baseUrl}/api/user/update/${userId}`, updatedData, {
        withCredentials: true,
      })
      .then((res) => {
        dispatch(setCredential(res.data));
        toast.success("Update success", {
          position: "bottom-center",
          autoClose: 4000,
          pauseOnHover: false,
          progress: undefined,
          theme: "light",
        });
      }).catch(error => {
        const customMessage = error.response.data.message;
        toast.error(customMessage || error.message, {
          position: "bottom-center",
          autoClose: 4000,
          pauseOnHover: false,
          progress: undefined,
          theme: "light",
        });
        
      });
  });

  useEffect(() => {
    if (
      watch("newEmail") != email ||
      watch("newFirstName") != firstName ||
      watch("newLastName") != lastName
    ) {
      setDisabledButton(false);
    } else {
      setDisabledButton(true);
    }
  });
  return (
    <>
      {/* The popup message container when update success */}
      <ToastContainer/>

      <form onSubmit={onSubmit} className="flex flex-col flex-wrap gap-6 ">
        {/* 1. The Heading */}
        <h1 className="text-4xl font-semibold mb-4">
          {firstName + " " + lastName}'s Profile
        </h1>

        {/* 2. The first and last name */}
        <div className="w-full flex lg:flex-row flex-col gap-6">
          <label htmlFor="firstName" className="flex-1 font-semibold">
            First Name
            <input
              type="text"
              id="firstName"
              defaultValue={firstName}
              className={`w-full block font-normal border ${
                errors.newFirstName && "border-red-500"
              } rounded-md py-2 px-3`}
              {...register("newFirstName", {
                required: "This field cannot be empty",
              })}
            />
            {errors.newFirstName && (
              <p className="text-red-500 font-normal">
                {errors.newFirstName.message}
              </p>
            )}
          </label>

          <label htmlFor="lastName" className="flex-1 font-semibold">
            Last Name
            <input
              type="text"
              id="lastName"
              defaultValue={lastName}
              className={`w-full block font-normal border ${
                errors.newLastName && "border-red-500"
              } rounded-md py-2 px-3`}
              {...register("newLastName", {
                required: "This field cannot be empty",
              })}
            />
            {errors.newLastName && (
              <p className="text-red-500 font-normal">
                {errors.newLastName.message}
              </p>
            )}
          </label>
        </div>
        {/* 3. The email */}
        <label htmlFor="email" className="font-semibold">
          Email
          <input
            type="text"
            id="email"
            defaultValue={email}
            className={`w-full block font-normal border ${
              errors.newEmail && "border-red-500"
            } rounded-md py-2 px-3`}
            {...register("newEmail", {
              validate: (input) => {
                if (!input) {
                  return "This field cannot be empty";
                } else if (!input.includes("@")) {
                  return "Enter a valid email that includes @";
                }
              },
            })}
          />
          {errors.newEmail && (
            <p className="text-red-500 font-normal">
              {errors.newEmail.message}
            </p>
          )}
        </label>
        {/* The update button */}
        <CustomButton
          type="submit"
          disabled={disabledButton}
          padding="py-3"
          text="Update"
          responsiveWidth="w-full self-center"
          customCSS="mt-5"
        />
      </form>
    </>
  );
};

export default EditProfile;
