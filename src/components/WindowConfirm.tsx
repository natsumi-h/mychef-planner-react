import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Button,
} from "@chakra-ui/react";
import React from "react";

type WindowConfirmProps = {
  isOpen: boolean;
  onClose: () => void;
  header: string;
  confirmHandler: () => void;
  action: "add to favorite" | "remove from favorite" | "delete";
};

export const WindowConfirm = ({
  action,
  isOpen,
  onClose,
  header,
  confirmHandler,
}: WindowConfirmProps) => {
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
            {action === "delete"
              ? `Delete ${header}`
              : action === "remove from favorite"
              ? `Remove ${header} from favorite`
              : `Add ${header} to favorite`}
          </AlertDialogHeader>

          <AlertDialogBody>Are you sure?</AlertDialogBody>

          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose}>
              Cancel
            </Button>
            <Button
              colorScheme={action === "delete" ? `red` : `teal`}
              onClick={confirmHandler}
              ml={3}
            >
              {action === "delete"
                ? "Delete"
                : action === "remove from favorite"
                ? "Remove"
                : "Add"}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
};
