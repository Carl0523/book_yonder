import { useSelector } from "react-redux";

import { RootState } from "../../../redux/store";

import DisplaySteps from "./DisplaySteps";
import BasicInfo from "./BasicInfo";
import PropertyDetail from "./PropertyDetail";
import PropertyImages from "./PropertyImages";

export type PropertyForm = {
  name: string;
  pricePerNight: number;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  type: string;
  description: string;
  adultCount: number;
  childCount: number;
  amenities: string[];
  rating: number;
  imageUrls: string[];
};

const AddPropertyPage = () => {
  const { step } = useSelector((state: RootState) => state.form);

  const currPage = (step: number) => {
    switch (step) {
      case 0: {
        return <BasicInfo />;
      }
      case 1: {
        return <PropertyDetail />;
      }
      default: {
        return <PropertyImages />;
      }
    }
  };

  return (
    <div className="mx-auto flex flex-col items-center gap-10">
      {/* 1. Display the steps */}
      <DisplaySteps />
      {/* 2. The current form */}
      <div className="my-10 border-2 md:w-4/5 w-full p-10 flex flex-col">
        {currPage(step)}
      </div>
    </div>
  );
};

export default AddPropertyPage;
