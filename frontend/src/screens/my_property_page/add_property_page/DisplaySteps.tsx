import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";

const DisplaySteps = () => {
  const { step } = useSelector((state: RootState) => state.form);
  return (
    <header className="w-4/5 mx-auto p-4 flex flex-1 justify-between items-center">
      {/* 1. The basic information  */}
      <div className="w-full flex items-center">
        <div className="relative flex flex-col items-center gap-1">
          <div
            className={`w-8 h-8 ${
              step < 1 ? "bg-gray-400" : "bg-white border-primary"
            } rounded-full border-[9px]`}
          />
          <p className={`absolute top-0 mt-10 font-semibold text-center`}>
            Basic Information
          </p>
        </div>

        <div
          className={`flex-auto border-t-2 ${step >= 1 && "border-primary"}`}
        />
      </div>

      {/* 2. The Property Detail */}
      <div className="w-full flex items-center">
        <div className="relative flex flex-col items-center gap-1">
          <div
            className={`w-8 h-8 ${
              step < 2 ? "bg-gray-400" : "bg-white border-primary"
            } rounded-full border-[9px]`}
          />
          <p className={`absolute top-0 mt-10 font-semibold text-center`}>
            Property Detail
          </p>
        </div>

        <div
          className={`flex-auto border-t-2 ${step >= 2 && "border-primary"}`}
        />
      </div>

      {/* 3. Property Images*/}
      <div className="flex items-center">
        <div className="relative flex flex-col items-center gap-1">
          <div
            className={`w-8 h-8 ${
              step < 3 ? "bg-gray-400" : "bg-white border-primary"
            } rounded-full border-[9px]`}
          />
          <p className={`absolute top-0 mt-10 font-semibold text-center`}>
            Photos
          </p>
        </div>
      </div>
    </header>
  );
};

export default DisplaySteps;
