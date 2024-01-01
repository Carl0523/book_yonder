import React from "react";
import { motion } from "framer-motion";

interface CustomButtonProps {
  text: string;
  textColor?: string;
  bgColor?: string;
  responsiveWidth?: string;
  padding?: string;
  type?: "button" | "submit" | "reset";
  buttonHandler?: () => void;
}

const CustomButton: React.FC<CustomButtonProps> = ({
  text,
  textColor = "text-blue-100",
  bgColor = "bg-primary",
  responsiveWidth = "w-24",
  padding = "py-2 px-4",
  type = "button",
  buttonHandler = undefined,
}) => {
  return (
    <motion.button
      whileHover={{ scale: 1.05, opacity: 0.9 }}
      whileTap={{ scale: 0.95 }}
      type={type}
      onClick={buttonHandler}
      className={`${responsiveWidth} ${padding} ${textColor} ${bgColor} rounded-buttonRadius font-semibold active:`}
    >
      {text}
    </motion.button>
  );
};

export default CustomButton;
