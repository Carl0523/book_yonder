import { motion } from "framer-motion";
import { IoCloseSharp } from "react-icons/io5";
import Overlay from "./Overlay";
import CustomButton from "../CustomButton";

interface OverlayModalProps {
  width?: string;
  height?: string;
  modalColor?: string;
  imageURL?: string;
  header?: string,
  title?: string;
  message?: string;
  buttonText: string;
  buttonTextColor?: string;
  buttonColor?: string;
  buttonDisabled?: boolean;
  onCloseModal: () => void;
  onConfirm: () => void;
}

const OverlayModal: React.FC<OverlayModalProps> = ({
  width = "lg:w-[35%] md:w-[50%] w-[80%]",
  height = "",
  modalColor = "bg-white",
  imageURL = null,
  header = null,
  title = null,
  message = null,
  buttonText,
  buttonTextColor = "text-red-500",
  buttonColor = "",
  buttonDisabled = false,
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
          {/* Optional: The header of the modal */}
          {header && <h1 className="text-2xl">{header}</h1>}
          {/* 1. the close button */}
          <IoCloseSharp
            onClick={onCloseModal}
            className="absolute top-5 right-5 text-2xl cursor-pointer"
          />
          {/* Optional: If image exist, show image in the center of the modal */}
          {imageURL && (
            <img src={imageURL} alt="image" className="w-[400px] h-[300px] object-contain" />
          )}
          {/* Optional. The title of the message */}
          {title && <h1 className="text-lg font-semibold">{title}</h1>}

          {/* Optional. The message: subtext */}
          {message && <p className="w-2/3 text-gray-400 text-center text-sm">{message}</p>}

          {/* 2. The cancel button and confirm button */}
          <div className="w-10/12 flex justify-between">
            <CustomButton text="Cancel" responsiveWidth="w-[40%]" buttonHandler={onCloseModal} disabled={buttonDisabled}/>
            <CustomButton
              text={buttonText}
              textColor={buttonTextColor}
              bgColor={buttonColor}
              responsiveWidth="w-[50%]"
              disabled={buttonDisabled}
              buttonHandler={onConfirm}
            />
          </div>
        </motion.div>
      </Overlay>

  );
};

export default OverlayModal;
