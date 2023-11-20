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
import { DishListContext } from "../../../context/DishListContext";
import { DishItemContext } from "../../../context/DishItemContext";
import { DishType } from "./types";

type DishWindowConfirmProps = {
  isOpen: boolean;
  onClose: () => void;
  type: "delete dish" | "delete item" | "fridge";
  dish?: DishType;
};

export const DishWindowConfirm: FC<DishWindowConfirmProps> = ({
  isOpen,
  onClose,
  type,
  dish,
}) => {
  const cancelRef = React.useRef<HTMLButtonElement>(null);
  const [buttonLoading, setButtonLoading] = useState<boolean>(false);
  const { handleDeleteDish, handleDeleteItem, handleAddToFridge } =
    useContext(DishListContext);
  const { ingredient, dish: itemDish } = useContext(DishItemContext);

  const confirmHandler = async () => {
    setButtonLoading(true);
    // Dish 削除
    if (type === "delete dish" && dish) {
      await handleDeleteDish(dish);
    }
    // アイテム削除
    if (type === "delete item") {
      await handleDeleteItem(itemDish, ingredient.ingredient);
    }
    // Add to Fridge
    if (type === "fridge") {
      await handleAddToFridge(itemDish, ingredient.ingredient);
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
            {type === "delete dish"
              ? `Delete ${dish?.fields?.dish}`
              : type === "delete item"
              ? `Delete ${ingredient}`
              : `Add ${ingredient} to Fridge`}
          </AlertDialogHeader>

          <AlertDialogBody>Are you sure?</AlertDialogBody>

          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose}>
              Cancel
            </Button>
            <Button
              isLoading={buttonLoading}
              colorScheme={type === "fridge" ? "teal" : "red"}
              onClick={confirmHandler}
              ml={3}
            >
              {type === "fridge" ? "Add" : "Delete"}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
};
