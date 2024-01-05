import { ReactNode } from "react"

interface IconTextProps {
    text: string,
    icon: ReactNode,
    gap?: string,
    textColor?: string,
    textSize?: string,
    customCSS?: string
}

const IconText : React.FC<IconTextProps> = ({
    text,
    icon,
    gap = "gap-3",
    textColor = "text-blue-100",
    textSize = "text-lg",
    customCSS = ""
}) => {
  return (
    <div className={`flex items-center ${gap} ${customCSS} hover:scale-95`}>
        {icon}
        <p className={`${textColor} ${textColor} ${textSize}`}>{text}</p>
    </div>
  )
}

export default IconText