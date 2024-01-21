import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";

interface iModalProps {
  isOpen: boolean;
  onOpenChange: () => void;
  onModalClose: () => void;
}

export const DeleteModal: React.FC<iModalProps> = ({
  isOpen,
  onOpenChange,
  onModalClose,
}) => {
  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        {(onModalClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Edit Expense
            </ModalHeader>
            <ModalBody>Temp Modal</ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onClick={onModalClose}>
                Close
              </Button>
              <Button color="primary" onClick={onModalClose}>
                Action
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};
