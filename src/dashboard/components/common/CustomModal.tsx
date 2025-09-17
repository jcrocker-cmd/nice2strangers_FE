import type React from "react";

interface ModalProps
{
    isOpen: boolean;
    onClose: () => void;
    children?: React.ReactNode;
}

const CustomModal = ({isOpen, onClose, children}: ModalProps) => {
    if(!isOpen) return null;

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/50">
      <div className="bg-white w-[600px] max-w-[90%] p-6 z-50 shadow-md rounded-lg max-h-[80vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-end border-b border-gray-300 pb-2 shrink-0">
          <button className="text-2xl cursor-pointer" onClick={onClose}>&times;</button>
        </div>

        {/* Scrollable content */}
        <div className="mt-2 overflow-y-auto py-2 flex-1 main-scroll">
          {children}
        </div>
      </div>
    </div>
  )
}


export default CustomModal
