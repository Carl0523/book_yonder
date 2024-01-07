import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import axios from "axios";
import { useDispatch } from "react-redux";

import CustomButton from "../utils/CustomButton";
import { FcGoogle } from "react-icons/fc";
import { app } from "../../firebase";
import { setCredential } from "../../redux/slices/userSlice";

const baseUrl = import.meta.env.VITE_SERVER_BASE_URL;

const GoogleAuth = () => {
  const dispatch = useDispatch();

  /**
   * Handle Google Authentication through Firebase Auth.
   * After authenticate the user through a pop-up window, return user object
   * Send a POST request with user info
   */
  const handleGoogleAuth = async () => {
    const provider = new GoogleAuthProvider();
    const auth = getAuth(app);
    const result = await signInWithPopup(auth, provider);

    provider.addScope("user_email")

    // Send a POST request to google auth api route
    axios
      .post(
        `${baseUrl}/api/auth/oauth`,
        {
          email: result.user.email,
          photoURL: result.user.photoURL,
          displayName: result.user.displayName,
        },
        { withCredentials: true }
      )
      .then((res) => {
        dispatch(setCredential(res.data));
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  return (
    <CustomButton
      text="Continue With Google"
      padding="py-3"
      icon={<FcGoogle className="text-xl" />}
      bgColor="bg-white"
      textColor="text-primary"
      responsiveWidth="w-full"
      customCSS="mt-1 border border-primary"
      buttonHandler={handleGoogleAuth}
    />
  );
};

export default GoogleAuth;
