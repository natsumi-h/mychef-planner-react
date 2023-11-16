import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Button,
} from "@chakra-ui/react";
import React, { useContext, useState } from "react";
import { SingleRecipeContext } from "../../context/SingleRecipeContext";

type WindowConfirmProps = {
  isOpen: boolean;
  onClose: () => void;
};

export const AddToListWindowConfirm = ({
  isOpen,
  onClose,
}: WindowConfirmProps) => {
  const cancelRef = React.useRef<HTMLButtonElement>(null);
  const { handleSaveIngredients } = useContext(SingleRecipeContext);
  const [buttonLoading, setButtonLoading] = useState<boolean>(false);

  const confirmHandler = async () => {
    setButtonLoading(true);
    await handleSaveIngredients();
    setButtonLoading(false);
    onClose();
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
            Add ingredients to my shopping list
          </AlertDialogHeader>

          <AlertDialogBody>Are you sure?</AlertDialogBody>

          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose}>
              Cancel
            </Button>
            <Button
              colorScheme={"teal"}
              onClick={confirmHandler}
              ml={3}
              isLoading={buttonLoading}
            >
              Add
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
};
