import { useDispatch } from "react-redux";
import { motion } from "framer-motion";

import { IoPersonSharp } from "react-icons/io5";
import { BsCreditCard2FrontFill } from "react-icons/bs";
import { FaLock } from "react-icons/fa";
import { RiLogoutBoxRFill } from "react-icons/ri";
import { TbPhotoEdit } from "react-icons/tb";

import IconText from "../../components/utils/IconText";
import { userLogout } from "../../redux/slices/userSlice";

interface TabSectionProps {
  userEmail: string;
  userName: string;
  userAvatar: string | undefined;
  tabIndex: number;
  onHandleTab: (index: number) => void;
  onOpenDeleteModal: () => void;
  onOpenAvatarModal: () => void;
}

const TabSection: React.FC<TabSectionProps> = ({
  userName,
  userEmail,
  userAvatar,
  tabIndex,
  onHandleTab,
  onOpenDeleteModal,
  onOpenAvatarModal,
}) => {
  const dispatch = useDispatch();
  return (
    <motion.div
      initial={{ x: -200 }}
      animate={{ x: 0 }}
      transition={{ duration: 0.5, type: "spring", bounce: "0.6" }}
      className="flex flex-col gap-7 h-screen p-8 bg-white border-r"
    >
      {/* 1. The brief user info section: Avatar, email, and name */}
      <div className="flex flex-col items-center gap-2 self-center">
        {/* 1A. The avatar and edit icon */}
        <div className="relative">
          <img
            src={userAvatar}
            alt="user avatar"
            className="w-24 border rounded-full border-primary"
          />
          <TbPhotoEdit
            onClick={onOpenAvatarModal}
            className="absolute top-2/3 right-0 text-3xl bg-primary text-white p-[0.35rem] rounded-full cursor-pointer"
          />
        </div>
        {/* 1B. The user's full name */}
        <h1 className="text-lg ">{userName}</h1>
        {/* 1C. The user's email */}
        <h2 className="text-sm text-gray-400">{userEmail}</h2>
      </div>

      {/* 2. The tab list */}
      <div className="flex flex-col gap-5">
        {/* DIVIDER LINE */}
        <hr className="mb-1" />
        {/* 2A. The profile tab */}
        <IconText
          text="My Profile"
          icon={
            <IoPersonSharp
              className={tabIndex === 0 ? "text-primary" : "text-black"}
            />
          }
          textColor={tabIndex === 0 ? "text-primary" : "text-black"}
          customCSS="font-light"
          onClick={() => {
            onHandleTab(0);
          }}
        />

        {/* 2B. Payment details tab */}
        <IconText
          text="Payment details"
          icon={
            <BsCreditCard2FrontFill
              className={tabIndex === 1 ? "text-primary" : "text-black"}
            />
          }
          textColor={tabIndex === 1 ? "text-primary" : "text-black"}
          customCSS="font-light"
          onClick={() => {
            onHandleTab(1);
          }}
        />

        {/* 2C. Security tab */}
        <IconText
          text="Security"
          icon={
            <FaLock
              className={tabIndex === 2 ? "text-primary" : "text-black"}
            />
          }
          textColor={tabIndex === 2 ? "text-primary" : "text-black"}
          customCSS="font-light"
          onClick={() => {
            onHandleTab(2);
          }}
        />
        {/* DIVIDER LINE */}
        <hr />
        {/* 2D. Logout button */}
        <IconText
          text="Logout"
          icon={<RiLogoutBoxRFill />}
          textColor="black"
          customCSS="font-light"
          onClick={() => {
            dispatch(userLogout());
          }}
        />
        {/* DIVIDER LINE */}
        <hr />
        {/* 2E. Delete account */}
        <p
          className="text-red-500 font-light cursor-pointer"
          onClick={onOpenDeleteModal}
        >
          Delete Account
        </p>
      </div>
    </motion.div>
  );
};

export default TabSection;
