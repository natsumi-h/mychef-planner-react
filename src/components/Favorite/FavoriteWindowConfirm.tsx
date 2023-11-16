import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Button,
} from "@chakra-ui/react";
import React, { useState } from "react";

type WindowConfirmProps = {
  isOpen: boolean;
  onClose: () => void;
  header: string;
  confirmHandler: () => void;
  type: "add" | "remove";
};

export const FavoriteWindowConfirm = ({
  type,
  isOpen,
  onClose,
  header,
  confirmHandler,
}: WindowConfirmProps) => {
  const cancelRef = React.useRef<HTMLButtonElement>(null);
  const [buttonLoading, setButtonLoading] = useState<boolean>(false);

  const handleOnClick = async () => {
    setButtonLoading(true);
    await confirmHandler();
    setButtonLoading(false);
  };

  return (
    <AlertDialog
      isOpen={isOpen}
      leastDestructiveRef={cancelRef}
      onClose={onClose}
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            {type === "remove"
              ? `Remove ${header} from favorite`
              : `Add ${header} to favorite`}
          </AlertDialogHeader>

          <AlertDialogBody>Are you sure?</AlertDialogBody>

          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose}>
              Cancel
            </Button>
            <Button
              colorScheme={type === "remove" ? `red` : `teal`}
              onClick={handleOnClick}
              ml={3}
              isLoading={buttonLoading}
            >
              {type === "remove" ? "Remove" : "Add"}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
};
