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
  onModalAction: () => void;
}

export const EditModal: React.FC<iModalProps> = ({
  isOpen,
  onOpenChange,
  onModalClose,
  onModalAction,
}) => {
  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        {(onModalClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Delete Expense
            </ModalHeader>
            <ModalBody>Really ?</ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={onModalClose}>
                Close
              </Button>
              <Button color="primary" onPress={onModalAction}>
                Action
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};
