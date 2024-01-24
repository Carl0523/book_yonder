import { useNavigate } from "react-router-dom";

import { BsBuildingAdd } from "react-icons/bs";

import CustomButton from "../../components/utils/CustomButton";
import { emptyProperty } from "../../assets";

const PropertyHomePage = () => {
    const navigate = useNavigate();
    return (
      <div className="flex flex-col gap-5">
        {/* 1. The header: Title and add property button */}
        <header className="flex justify-between items-center">
          <h1 className="text-2xl font-serif font-bold">My Property</h1>
          <CustomButton
            text="Add New Property"
            icon={<BsBuildingAdd className="text-xl" />}
            padding="px-4 py-3"
            buttonHandler={() => {
              navigate("/my_property/add_property");
            }}
          />
        </header>
        {/**
         *  2. (Empty icon and text) or (the list of property) or (loading icon)
         *     • Empty property => empty icon and text.
         *     • Loading => Loading animated icon
         *     • Non-empty property => the list of property
         */}
        <div className="bg-slate-50">
          {/* 2a. Empty list icon and text */}
          <div className="flex flex-col items-center my-16">
            <img src={emptyProperty} className="w-96 h-96" />
            <p className="text-gray-400 text-2xl">Add your properties here</p>
            <CustomButton
              text="Add New Property"
              icon={<BsBuildingAdd className="text-xl" />}
              bgColor="bg-transparent"
              textColor="text-primary"
              customCSS="border border-primary"
              padding="px-4 py-3 mt-4"
              buttonHandler={() => {
                navigate("/my_property/add_property");
              }}
            />
          </div>
        </div>
      </div>
    );
}

export default PropertyHomePage