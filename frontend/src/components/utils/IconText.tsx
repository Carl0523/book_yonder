import { ReactNode } from "react"

interface IconTextProps {
    text: string,
    icon: ReactNode,
    gap?: string,
    textColor?: string,
    textSize?: string,
    customCSS?: string,
    onClick?: () => void,
}

const IconText : React.FC<IconTextProps> = ({
    text,
    icon,
    gap = "gap-4",
    textColor = "text-blue-100",
    textSize = "text-base",
    customCSS = "",
    onClick=undefined
}) => {
  return (
    <div onClick={onClick} className={`flex items-center ${gap} ${customCSS} hover:scale-95 cursor-pointer`}>
        {icon}
        <p className={`${textColor} ${textColor} ${textSize}`}>{text}</p>
    </div>
  )
}

export default IconText