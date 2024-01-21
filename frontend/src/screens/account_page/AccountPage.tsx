import { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import axios from "axios";

import { RootState } from "../../redux/store";
import TabSection from "./TabSection";
import EditProfile from "./EditProfile";
import EditPassword from "./EditPassword";
import OverlayModal from "../../components/utils/overlay_modal/OverlayModal";
import { deleteAccount } from "../../assets";
import { userLogout, setCredential } from "../../redux/slices/userSlice";

import { AnimatePresence } from "framer-motion";
import { app } from "../../firebase";

const baseURL = import.meta.env.VITE_SERVER_BASE_URL;

const AccountPage = () => {
  const [tabIndex, setTabIndex] = useState(0);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isAvatarModalOpen, setIsAvatarModalOpen] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [uploadPercentage, setUploadPercentage] = useState(0);
  const [isUploadSuccess, setIsUploadSuccess] = useState(true);
  const [newAvatar, setNewAvatar] = useState<string | null>(null);

  const fileRef = useRef<HTMLInputElement>(null);

  // Extract the user's info from redux
  const { userInfo } = useSelector((state: RootState) => state.user);

  const dispatch = useDispatch();

  // Handle the tab selection
  const handleTab = (index: number) => {
    setTabIndex(index);
  };

  /**
   * Send a POST request along with user's id to delete the account
   */
  const handleDeleteAccount = () => {
    axios
      .post(
        `${baseURL}/api/user/delete_account/${userInfo!._id}`,
        {},
        { withCredentials: true }
      )
      .then((res) => {
        console.log(res.data);
        dispatch(userLogout());
      })
      .catch((error) => {
        console.log(error);
      });
  };

  /**
   * Upload the image file into firebase storage
   * @param file The file object (the avatar user selected)
   */
  const handleAvatarUpload = (file: File) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, `avatars/${fileName}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const process = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUploadPercentage(Math.round(process));
      },
      (error) => {
        setIsUploadSuccess(false);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref)
          .then((avatarURL) => {
            setNewAvatar(avatarURL);
          })
          .catch((error) => {
            setIsUploadSuccess(false);
            console.log(error);
          });
      }
    );
  };

  /**
   * Send a POST request to update the photo in database
   */
  const updateAvatar = () => {
    axios
      .post(
        `${baseURL}/api/user/update_avatar/${userInfo!._id}`,
        { newAvatarURL: newAvatar },
        { withCredentials: true }
      )
      .then((res) => {
        dispatch(setCredential(res.data));
        setIsAvatarModalOpen(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    if (file) {
      handleAvatarUpload(file);
    }
  }, [file]);

  //---------------------------------------- RETURN STATEMENT ----------------------------------------
  return (
    <>
      <input
        type="file"
        ref={fileRef}
        onChange={(e) => {
          setFile(e.target.files![0]);
        }}
        accept="image/*"
        className="hidden"
      />
      <AnimatePresence mode="wait">
        {/**
         * MODAL:
         *  Show "Edit Avatar modal" when click on edit icon
         *  Or show "Delete account modal" when click on delete button
         */}
        {isDeleteModalOpen ? (
          <OverlayModal
            title="Are you sure you want to leave us?"
            imageURL={deleteAccount}
            message="Going forward with this will delete all your data from BookYonder"
            buttonText="Delete"
            onCloseModal={() => {
              setIsDeleteModalOpen(false);
            }}
            onConfirm={handleDeleteAccount}
          />
        ) : isAvatarModalOpen ? (
          <OverlayModal
            header="Edit Photo"
            imageURL={newAvatar ? newAvatar : userInfo!.avatar}
            buttonText={
              uploadPercentage > 0 && uploadPercentage < 100
                ? `${uploadPercentage}%`
                : newAvatar
                ? "Save Photo"
                : "Edit Photo"
            }
            buttonDisabled={
              uploadPercentage > 0 && uploadPercentage < 100 ? true : false
            }
            buttonTextColor="text-blue-100"
            buttonColor="bg-primary"
            onCloseModal={() => {
              setIsAvatarModalOpen(false);
              setNewAvatar(null);
              setFile(null);
            }}
            onConfirm={() => {
              if (newAvatar) {
                updateAvatar();
              } else {
                if (fileRef.current) fileRef.current.click();
              }
            }}
          />
        ) : (
          ""
        )}
      </AnimatePresence>

      <div className="flex">
        {/* 1. The tab sections: Profile, Payment, and Security */}
        <div className="flex-1">
          <TabSection
            tabIndex={tabIndex}
            onHandleTab={handleTab}
            userEmail={userInfo!.email}
            userAvatar={userInfo!.avatar}
            userName={userInfo!.firstName + " " + userInfo!.lastName}
            onOpenDeleteModal={() => {
              setIsDeleteModalOpen(true);
            }}
            onOpenAvatarModal={() => {
              setIsAvatarModalOpen(true);
            }}
          />
        </div>

        {/* 2. Display content based on the tabIndex */}
        <div className="flex-3 w-screen h-screen lg:px-32 px-10 py-20 bg-gray-100">
          {tabIndex === 0 ? (
            <EditProfile
              firstName={userInfo!.firstName}
              lastName={userInfo!.lastName}
              email={userInfo!.email}
              userId={userInfo!._id}
            />
          ) : tabIndex === 1 ? (
            "Payment"
          ) : (
            <EditPassword userId={userInfo!._id} />
          )}
        </div>
      </div>
    </>
  );
};

export default AccountPage;
