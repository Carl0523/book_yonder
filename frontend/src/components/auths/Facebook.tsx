import { FaFacebook } from "react-icons/fa";
import { FacebookAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { app } from "../../firebase";
import { useDispatch } from "react-redux";
import axios from "axios";

import CustomButton from "../utils/CustomButton";
import { setCredential } from "../../redux/slices/userSlice";

const baseUrl = import.meta.env.VITE_SERVER_BASE_URL;

const Facebook = () => {
  const dispatch = useDispatch();

  const handleFacebookAuth = async () => {
    const provider = new FacebookAuthProvider();
    const auth = getAuth(app);
    const result = await signInWithPopup(auth, provider);
    axios
      .post(
        `${baseUrl}/api/auth/oauth`,
        {
          email: result.user.email,
          displayName: result.user.displayName,
          photoURL: result.user.photoURL,
        },
        { withCredentials: true }
      )
      .then((res) => {
        dispatch(setCredential(res.data));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <CustomButton
      text="Continue With Facebook"
      padding="py-3"
      icon={<FaFacebook className="text-xl" />}
      bgColor="bg-white"
      textColor="text-primary"
      responsiveWidth="w-full"
      customCSS="mt-1 border border-primary"
      buttonHandler={handleFacebookAuth}
    />
  );
};

export default Facebook;
