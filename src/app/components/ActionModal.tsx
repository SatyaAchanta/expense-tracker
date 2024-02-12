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
import { Provider } from "jotai";
import { expenseStore } from "../store/expense";

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
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      hideCloseButton={true}
      className="font-serif"
    >
      <ModalContent>
        {(onModalClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">{header}</ModalHeader>
            <ModalBody>{body}</ModalBody>
            {!isEdit && (
              <ModalFooter>
                <Button color="default" onPress={onModalClose}>
                  Close
                </Button>
                <Button color={"danger"} onPress={onModalAction}>
                  {actionButtonTitle}
                </Button>
              </ModalFooter>
            )}
          </>
        )}
      </ModalContent>
    </Modal>
  );
};
