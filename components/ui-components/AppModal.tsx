import { CloseButton } from "@chakra-ui/react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import React, { ReactNode, useEffect } from "react";
import { useState } from "react";

interface IAppModalProps {
  toggleButton: ReactNode;
  title: ReactNode | string;
  loading?: boolean;
  isOpen?: boolean;
  children: ReactNode;
}
export default function AppModal({
  children,
  title,
  toggleButton,
  loading,
}: IAppModalProps) {
  let [isOpen, setIsOpen] = useState(false);

  const closeModal = () => {
    if (loading) return;
    setIsOpen(false);
  };

  useEffect(() => {
    console.log("Hide modal called", isOpen);

    if (isOpen) {
      console.log("Hide modal called", isOpen);
      setIsOpen(false);
    }
  }, [isOpen]);

  function openModal() {
    setIsOpen(true);
  }

  return (
    <>
      {<span onClick={openModal}>{toggleButton} </span>}

      <Dialog open={isOpen} onClose={closeModal} className="relative z-50">
        {/* The backdrop, rendered as a fixed sibling to the panel container */}
        <DialogBackdrop className="fixed inset-0 bg-black/30" />

        {/* Full-screen container to center the panel */}
        <div className="fixed inset-0 flex w-screen items-center py-4 justify-center p-2">
          {/* The actual dialog panel  */}
          <DialogPanel className="w-full max-h-lvh overflow-y-auto max-w-xl space-y-4 bg-white p-4">
            <DialogTitle className="font-extrabold flex flex-row justify-between border-b pb-2 mb-2 items-center text-teal-500">
              {title}{" "}
              <CloseButton color={"red.800"} onClick={closeModal} size={"md"} />
            </DialogTitle>
            <div className="p-4">{children}</div>
          </DialogPanel>
        </div>
      </Dialog>
    </>
  );
}
