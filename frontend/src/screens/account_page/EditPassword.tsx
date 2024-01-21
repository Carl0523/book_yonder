import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";

import CustomButton from "../../components/utils/CustomButton";
import { setCredential, userLogout } from "../../redux/slices/userSlice";

interface PasswordProp {
  userId: string;
}

type PasswordForm = {
  oldPassword: string;
  newPassword: string;
  confirmNewPassword: string;
};

const baseUrl = import.meta.env.VITE_SERVER_BASE_URL;

const EditPassword: React.FC<PasswordProp> = ({ userId }) => {
  const dispatch = useDispatch();

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<PasswordForm>();

  const onSubmit = handleSubmit((data) => {
    axios
      .post(`${baseUrl}/api/user/update_password/${userId}`, data, {
        withCredentials: true,
      })
      .then((res) => {
        dispatch(setCredential(res.data));
        dispatch(userLogout());
      })
      .catch((error) => {
        const customMessage = error.response.data.message;
        console.log(customMessage);
        toast.error(customMessage || error.message, {
          position: "bottom-center",
          autoClose: 4000,
          pauseOnHover: false,
          progress: undefined,
          theme: "light",
        });
      });
  });

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-6">
      <ToastContainer />
      {/* 1. The heading text */}
      <h1 className="text-4xl font-semibold mb-4">Security</h1>
      {/* 2. The old password text field */}
      <label htmlFor="oldPassword" className="font-semibold">
        Old password
        <input
          type="password"
          id="oldPassword"
          placeholder="••••••••"
          className={`w-full block font-normal border ${
            errors.oldPassword && "border-red-500"
          } rounded-md py-2 px-3`}
          {...register("oldPassword", {
            required: "This field cannot be empty",
          })}
        />
        {errors.oldPassword && (
          <p className="text-red-500 font-normal">
            {errors.oldPassword.message}
          </p>
        )}
      </label>
      {/* 3. The new password text field */}
      <label htmlFor="newPassword" className="font-semibold">
        New password{" "}
        <span className="text-sm text-gray-400">- minimum 8 characters</span>
        <input
          type="password"
          id="newPassword"
          placeholder="••••••••"
          className={`w-full block font-normal border ${
            errors.newPassword && "border-red-500"
          } rounded-md py-2 px-3`}
          {...register("newPassword", {
            required: "This field cannot be empty",
            minLength: {
              value: 8,
              message: "Your password need to contains at least 8 characters",
            },
          })}
        />
        {errors.newPassword && (
          <p className="text-red-500 font-normal">
            {errors.newPassword.message}
          </p>
        )}
      </label>
      {/* 4. The confirm new password text field */}
      <label htmlFor="confirmNewPassword" className="font-semibold">
        Confirm new password
        <input
          type="password"
          id="confirmNewPassword"
          placeholder="••••••••"
          className={`w-full block font-normal border ${
            errors.confirmNewPassword && "border-red-500"
          } rounded-md py-2 px-3`}
          {...register("confirmNewPassword", {
            validate: (input) => {
              if (!input) {
                return "This field cannot be empty";
              } else if (watch("newPassword") !== input) {
                return "The Password entered does not matched";
              }
            },
          })}
        />
        {errors.confirmNewPassword && (
          <p className="text-red-500 font-normal">
            {errors.confirmNewPassword.message}
          </p>
        )}
      </label>
      {/* 5. The Reset password button */}
      <CustomButton
        type="submit"
        padding="py-3"
        text="Reset password"
        responsiveWidth="w-full self-center"
        customCSS="mt-5"
      />
    </form>
  );
};

export default EditPassword;
