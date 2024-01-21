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
  header: string;
  body: string | JSX.Element;
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
  header,
  body,
}) => {
  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        {(onModalClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">{header}</ModalHeader>
            <ModalBody>{body}</ModalBody>
            <ModalFooter>
              <Button color="default" onPress={onModalClose}>
                Close
              </Button>
              <Button
                color={isEdit ? "primary" : "danger"}
                onPress={onModalAction}
                type={isEdit ? "submit" : "button"}
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
