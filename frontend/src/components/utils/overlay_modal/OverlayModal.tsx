import { motion } from "framer-motion";
import { IoCloseSharp } from "react-icons/io5";
import Overlay from "./Overlay";
import CustomButton from "../CustomButton";

interface OverlayModalProps {
  width?: string;
  height?: string;
  modalColor?: string;
  imageURL?: string;
  title: string;
  message: string;
  buttonText: string;
  buttonColor?: string;
  onCloseModal: () => void;
  onConfirm: () => void;
}

const OverlayModal: React.FC<OverlayModalProps> = ({
  width = "lg:w-[35%] md:w-[50%] w-[80%]",
  height = "",
  modalColor = "bg-white",
  imageURL = null,
  title,
  message,
  buttonText,
  buttonColor = "",
  onCloseModal,
  onConfirm
}) => {
  return (
      <Overlay>
        <motion.div
          initial={{ opacity: 0, translateY: "-100%", translateX: "-50%" }}
          animate={{ opacity: 1, translateY: "-50%", translateX: "-50%" }}
          exit={{ opacity: 0, translateY: "100" }}
          transition={{ duration: 0.3 }}
          className={`fixed top-1/2 left-1/2 flex flex-col items-center gap-5 p-8 ${width} ${height} ${modalColor} rounded-md z-60`}
        >
          {/* 1. the close button */}
          <IoCloseSharp
            onClick={onCloseModal}
            className="self-end text-2xl cursor-pointer"
          />
          {/* OPTIONAL: If image exist, show image in the center of the modal */}
          {imageURL && (
            <img src={imageURL} alt="Disconnect" className="w-[400px]" />
          )}
          {/* 2. The header text */}
          <h1 className="text-lg font-semibold">{title}</h1>

          {/* 3. The message: subtext */}
          <p className="w-2/3 text-gray-400 text-center text-sm">{message}</p>

          {/* 4. The cancel button and confirm button */}
          <div className="w-2/3 flex justify-between">
            <CustomButton text="I'll stay" responsiveWidth="w-1/2" buttonHandler={onCloseModal}/>
            <CustomButton
              text={buttonText}
              textColor="text-red-500"
              bgColor={buttonColor}
              buttonHandler={onConfirm}
            />
          </div>
        </motion.div>
      </Overlay>

  );
};

export default OverlayModal;
