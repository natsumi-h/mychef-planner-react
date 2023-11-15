import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Button,
} from "@chakra-ui/react";
import React, { FC, useContext, useState } from "react";
import { FridgeContext } from "../../../context/FridgeContext";
import { MyItemType } from "../Miscellaneous/types";

type WindowConfirmProps = {
  isOpen: boolean;
  onClose: () => void;
  item: MyItemType;
  type: "fridge" | "delete";
};

export const FridgeItemWindowConfirm: FC<WindowConfirmProps> = ({
  isOpen,
  onClose,
  item,
  type,
}) => {
  const [buttonLoading, setButtonLoading] = useState<boolean>(false);
  const cancelRef = React.useRef<HTMLButtonElement>(null);

  const { clickTrashHandler } = useContext(FridgeContext);

  const onClickHandler = async () => {
    setButtonLoading(true);
    if (type === "delete") {
      await clickTrashHandler(item);
    }
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
            {type === "fridge"
              ? `Add ${item.fields.ingredient} to Fridge`
              : `Delete ${item.fields.ingredient}`}
          </AlertDialogHeader>

          <AlertDialogBody>Are you sure?</AlertDialogBody>

          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose}>
              Cancel
            </Button>
            <Button
              colorScheme={type === "fridge" ? "teal" : "red"}
              onClick={onClickHandler}
              ml={3}
              isLoading={buttonLoading}
            >
              {type === "fridge" ? "Add" : "Delete"}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
};
