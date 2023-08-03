import { ReactNode } from "react";
import { createPortal } from "react-dom";
import { Box } from "@chakra-ui/react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

const modalRoot = document.getElementById("modal-root");

function Modal({ isOpen, onClose, children }: ModalProps) {
  if (!modalRoot || !isOpen) return null;

  return createPortal(
    <Box
      position="fixed"
      top="0"
      left="0"
      width="100%"
      height="100%"
      display="flex"
      alignItems="center"
      justifyContent="center"
      backgroundColor="rgba(0, 0, 0, 0.5)"
      zIndex="base"
      onClick={onClose}
    >
      <div
        style={{ maxWidth: "90%", maxHeight: "90%" }}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </Box>,
    modalRoot,
  );
}

export default Modal;
