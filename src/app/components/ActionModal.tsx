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
  isEdit: boolean;
  actionButtonTitle: string;
  onOpenChange: () => void;
  onModalClose: () => void;
  onModalAction: () => void;
}

export const ActionModal: React.FC<iModalProps> = ({
  isOpen,
  isEdit,
  onOpenChange,
  onModalClose,
  onModalAction,
  actionButtonTitle,
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
              <Button color="default" onPress={onModalClose}>
                Close
              </Button>
              <Button
                color={isEdit ? "primary" : "danger"}
                onPress={onModalAction}
              >
                {actionButtonTitle}
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};
