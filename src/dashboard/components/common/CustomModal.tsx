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
      <div className="bg-white w-[500px] max-w-[90%] p-6 z-50 shadow-md rounded-lg">
        <div className="flex items-center justify-end border-b border-gray-300 pb-2">
          {/* <h2 className=" text-lg font-semibold  font-kalam">Modal Title</h2> */}
          <button className="text-2xl cursor-pointer" onClick={onClose}>&times;</button>
        </div>
        <div className="mt-2">
          {children}
        </div>
      </div>
    </div>
  )
}

export default CustomModal
