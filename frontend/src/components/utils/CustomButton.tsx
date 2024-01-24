import React, { ReactNode } from "react";
import { motion } from "framer-motion";


interface CustomButtonProps {
  text?: string;
  icon?: ReactNode;
  textColor?: string;
  bgColor?: string;
  responsiveWidth?: string;
  radius?: string;
  padding?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  customCSS?: string,
  buttonHandler?: () => void;
}

const CustomButton: React.FC<CustomButtonProps> = ({
  text=null,
  icon=undefined,
  textColor = "text-blue-100",
  bgColor = "bg-primary",
  responsiveWidth = "",
  radius="rounded-buttonRadius",
  padding = "py-2 px-4",
  type = "button",
  disabled = false,
  customCSS= "",
  buttonHandler = undefined,
}) => {
  return (
    <motion.button
      whileHover={{ scale: 1.02, opacity: 0.9 }}
      whileTap={{ scale: 0.95 }}
      type={type}
      disabled={disabled}
      onClick={buttonHandler}
      className={`flex justify-center items-center gap-4 ${responsiveWidth} ${padding} ${textColor} ${bgColor} ${radius} font-semibold disabled:bg-gray-300 disabled:text-gray-600 ${customCSS}`}
    >
      {icon}
      {text}
    </motion.button>
  );
};

export default CustomButton;
