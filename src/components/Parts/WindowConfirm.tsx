import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Button,
} from "@chakra-ui/react";
import React, { FC } from "react";

type WindowConfirmProps = {
  isOpen: boolean;
  onClose: () => void;
  buttonLoading: boolean;
  header: string;
  buttonText: string;
  confirmHandler: () => void;
  colorScheme: "teal" | "red";
};

export const WindowConfirm: FC<WindowConfirmProps> = ({
  isOpen,
  onClose,
  header,
  buttonLoading,
  buttonText,
  confirmHandler,
  colorScheme,
}) => {
  const cancelRef = React.useRef<HTMLButtonElement>(null);
  return (
    <AlertDialog
      isOpen={isOpen}
      leastDestructiveRef={cancelRef}
      onClose={onClose}
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            {header}
          </AlertDialogHeader>

          <AlertDialogBody>Are you sure?</AlertDialogBody>

          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose}>
              Cancel
            </Button>
            <Button
              isLoading={buttonLoading}
              colorScheme={colorScheme}
              onClick={confirmHandler}
              ml={3}
            >
              {buttonText}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
};
