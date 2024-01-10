import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

import TabSection from "./TabSection";
import EditProfile from "./EditProfile";

const AccountPage = () => {
  const [tabIndex, setTabIndex] = useState(0);

  // Extract the user's info from redux
  const { userInfo } = useSelector((state: RootState) => state.user);

  // Handle the tab selection
  const handleTab = (index: number) => {
    setTabIndex(index);
  };

  return (
    <div className="flex">
      {/* 1. The tab sections: Profile, Payment, and Security */}
      <div className="flex-1">
        <TabSection
          tabIndex={tabIndex}
          onHandleTab={handleTab}
          userEmail={userInfo!.email}
          userAvatar={userInfo!.avatar}
          userName={userInfo!.firstName + " " + userInfo!.lastName}
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
          "content2"
        ) : (
          "content3"
        )}
      </div>
    </div>
  );
};

export default AccountPage;
