import React, { ReactNode } from 'react'

interface OverlayProp {
    children: ReactNode
}

const Overlay: React.FC<OverlayProp> = ({children}) => {
  return (
    <div className='fixed h-screen w-screen bg-overlay z-50'>
        {children}
    </div>
  )
}

export default Overlay