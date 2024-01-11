import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";

import { RootState } from "../../redux/store";
import TabSection from "./TabSection";
import EditProfile from "./EditProfile";
import EditPassword from "./EditPassword";
import OverlayModal from "../../components/utils/overlay_modal/OverlayModal";
import { deleteAccount } from "../../assets";
import { userLogout } from "../../redux/slices/userSlice";

import { AnimatePresence } from "framer-motion";

const baseURL = import.meta.env.VITE_SERVER_BASE_URL;

const AccountPage = () => {
  const [tabIndex, setTabIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Extract the user's info from redux
  const { userInfo } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();

  // Handle the tab selection
  const handleTab = (index: number) => {
    setTabIndex(index);
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleDeleteAccount = () => {
    axios.post(`${baseURL}/api/user/delete_account/${userInfo!._id}`, {}, {withCredentials: true}).then((res) => {
      console.log(res.data);
      dispatch(userLogout());
    }).catch((error) => {
      console.log(error);
    })
  }

  return (
    <>
      <AnimatePresence mode="wait">
        {isModalOpen && (
          <OverlayModal
            title="Are you sure you want to leave us?"
            imageURL={deleteAccount}
            message="Going forward with this will delete all your data from BookYonder"
            buttonText="Delete"
            onCloseModal={handleCloseModal}
            onConfirm={handleDeleteAccount}
          />
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
            onOpenModal={handleOpenModal}
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
