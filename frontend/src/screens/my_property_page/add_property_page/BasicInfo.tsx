import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

import { nextStep, addDataToForm } from "../../../redux/slices/formSlice";
import { RootState } from "../../../redux/store";
import CustomButton from "../../../components/utils/CustomButton";
import { PropertyForm } from "./AddPropertyPage";
import { MdArrowBack } from "react-icons/md";
import { propertyType } from "../../../constants";
import countryData from "../../../constants/countries_states.json";

const inputStyle = "w-full block border border-gray-400 font-normal py-2 px-3";

const BasicInfo = () => {
  // The overall data of current form
  const { formData } = useSelector((state: RootState) => state.form);

  // State indicating if button is disabled
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  const { register, watch, handleSubmit } = useForm<PropertyForm>({
    // Set default value to current form data from local storage, if existed
    defaultValues: {
      name: formData.name ?? "",
      country: formData.country ?? "none",
      address: formData.address ?? "",
      city: formData.city ?? "",
      state: formData.state ?? "none",
      zipCode: formData.zipCode ?? "",
      type: formData.type ?? "",
    },
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  /**
   * When continue button is click, 
   * 1. add or update the form data in local storage
   * 2. Go to the next page
   */
  const onSubmit = handleSubmit((data) => {
    dispatch(addDataToForm(data));
    dispatch(nextStep());
  });

  /**
   * The button will not be able until all fields are filled or selected
   */
  useEffect(() => {
    if (
      watch("name") &&
      watch("country") &&
      watch("address") &&
      watch("city") &&
      watch("state") &&
      watch("zipCode") &&
      watch("type")
    ) {
      setIsButtonDisabled(false);
    } else {
      setIsButtonDisabled(true);
    }
  }, [
    watch("name"),
    watch("country"),
    watch("address"),
    watch("city"),
    watch("state"),
    watch("zipCode"),
    watch("type"),
  ]);

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-5">
      {/* 1. The heading text */}
      <h1 className="font-bold text-3xl mb-2">Basic Information</h1>

      {/* 2. Property Name */}
      <label htmlFor="name" className="font-semibold">
        Property Name
        <input
          type="text"
          id="name"
          placeholder="Home Yonder Hotel"
          className={inputStyle}
          {...register("name", {
            required: "This field is required",
          })}
        />
      </label>

      {/* 3. Country */}
      <div className="flex flex-col">
        <label className="font-semibold">Country / Region</label>
        <select className="p-2 border border-gray-400" {...register("country")}>
          <option value="none">Select a Country</option>
          {countryData.map((country) => {
            return (
              <option key={country.name} value={country.name}>
                {country.name}
              </option>
            );
          })}
        </select>
      </div>

      {/* NOTE: This sections will not display until the country is selected */}
      {watch("country") !== "none" && (

        // 4. Property Street Name and City
        <div className="flex flex-col gap-5">
          <div className="flex md:flex-row flex-col gap-5">
            <label htmlFor="address" className="flex-4 font-semibold">
              Street Name
              <input
                type="text"
                id="address"
                placeholder="Start typing street address"
                className={inputStyle}
                {...register("address")}
              />
            </label>
            <label htmlFor="city" className="flex-2 font-semibold">
              City
              <input
                type="text"
                id="city"
                placeholder="Blacksburg"
                className={inputStyle}
                {...register("city")}
              />
            </label>
          </div>

          {/* 5. State name and Zip code */}
          <div className="flex md:flex-row flex-col gap-5">
            {/* 5A. The state value */}
            <div className="flex-3 flex flex-col">
              <label className="font-semibold">State</label>
              <select
                className="p-2 border border-gray-400"
                {...register("state")}
              >
                <option value="none">Select a State</option>
                {countryData
                  .find((country) => country.name === watch("country"))!
                  .states.map((state) => {
                    return (
                      <option key={state.code} value={state.name}>
                        {state.name}
                      </option>
                    );
                  })}
              </select>
            </div>

            {/* 5A. The Zip Code value */}
            <label htmlFor="zipCode" className="flex-1 font-semibold">
              Zip Code
              <input
                type="text"
                id="zipCode"
                placeholder="24060"
                className={inputStyle}
                {...register("zipCode")}
              />
            </label>
          </div>

          {/* 6. Property type*/}
          <div>
            {/* 6A. The title */}
            <h2 className="font-semibold text-xl mb-3">
              Select a Property Type
            </h2>

            {/* 6B. The property type item */}
            <div className="flex flex-wrap justify-between gap-4">
              {propertyType.map(({ type, icon, description }) => {
                return (
                  <label
                    key={type}
                    className={`sm:w-1/3 lg:w-1/4 w-full flex flex-col items-center gap-2 border-2 p-3 text-center cursor-pointer ${
                      watch("type") === type && "border-primary"
                    }`}
                  >
                    {/* • Property Type Icon */}
                    <img src={icon} className="w-10 h-10" />
                    {/* • Property Type */}
                    <h2 className="font-semibold">{type}</h2>
                    {/* • Property Description */}
                    <p>{description}</p>
                    {/* • HIDDEN: The radio box */}
                    <input
                      type="radio"
                      value={type}
                      className="hidden"
                      {...register("type")}
                    />
                  </label>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* 7. The buttons */}
      <div className="flex justify-between gap-4 mt-6">
        <CustomButton
          radius="rounded-sm"
          icon={<MdArrowBack className="text-xl text-primary" />}
          bgColor="bg-white"
          responsiveWidth="flex-1"
          customCSS="border border-primary"
          buttonHandler={() => {
            navigate("/my_property");
          }}
        />
        <CustomButton
          text="Continue"
          type="submit"
          disabled={isButtonDisabled}
          radius="rounded-sm"
          responsiveWidth="flex-5"
          customCSS="disabled:cursor-not-allowed"
        />
      </div>
    </form>
  );
};

export default BasicInfo;
