import React, { ReactNode } from "react";
import { motion } from "framer-motion";


interface CustomButtonProps {
  text: string;
  icon?: ReactNode;
  textColor?: string;
  bgColor?: string;
  responsiveWidth?: string;
  padding?: string;
  type?: "button" | "submit" | "reset";
  customCSS?: string,
  buttonHandler?: () => void;
}

const CustomButton: React.FC<CustomButtonProps> = ({
  text,
  icon=undefined,
  textColor = "text-blue-100",
  bgColor = "bg-primary",
  responsiveWidth = "w-24",
  padding = "py-2 px-4",
  type = "button",
  customCSS= "",
  buttonHandler = undefined,
}) => {
  return (
    <motion.button
      whileHover={{ scale: 1.02, opacity: 0.9 }}
      whileTap={{ scale: 0.95 }}
      type={type}
      onClick={buttonHandler}
      className={`flex justify-center items-center gap-4 ${responsiveWidth} ${padding} ${textColor} ${bgColor} rounded-buttonRadius font-semibold active: ${customCSS}`}
    >
      {icon}
      {text}
    </motion.button>
  );
};

export default CustomButton;
